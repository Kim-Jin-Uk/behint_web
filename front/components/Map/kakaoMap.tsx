import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './style.module.scss';
import useInput from '../../hooks/useInput';
import { inputType } from '../../reducers';

interface MapProps {
  latitude: number;
  longitude: number;
  mapSelect: boolean;
  setMapSelect: Dispatch<SetStateAction<boolean>>;
  setLocationData: Dispatch<SetStateAction<mapData | null>>;
  locationClickCount: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({
  latitude,
  longitude,
  mapSelect,
  setMapSelect,
  setLocationData,
  locationClickCount,
}: MapProps) => {
  const [keyword, onChangeKeyword, setKeyword] = useInput('') as inputType;
  const [map, setMap] = useState(null as naver.maps.Map | null);
  const [data, setData] = useState(null as mapData | null);
  const [markers, setMarkers] = useState([] as any[]);

  const searchBoxEvent = useCallback(() => {
    setData(null);
    setMapSelect(false);
    setLocationData(null);
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: mapData[], status: string, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map?.setBounds(bounds);
      }
    }

    // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
    function createMarkerImage(src: string, size: any, options: any) {
      const markerImage = new window.kakao.maps.MarkerImage(src, size, options);
      return markerImage;
    }

    // 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
    function createMarker(position: any, image: any) {
      const marker = new window.kakao.maps.Marker({
        position: position,
        image: image,
      });

      return marker;
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: mapData) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      markers.push(marker);
      setMarkers([...markers]);
      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>',
        );
        infowindow.open(map, marker);
      });
      window.kakao.maps.event.addListener(marker, 'click', function () {
        setData(place);
        setMapSelect(true);
        setLocationData(place);
        for (const item of markers) {
          item.setMap(null);
        }
        setMarkers([]);
        const imageSize = new window.kakao.maps.Size(29, 42),
          imageOptions = {
            spriteOrigin: new window.kakao.maps.Point(0, 0),
            spriteSize: new window.kakao.maps.Size(29, 42),
          };
        const markerImage = createMarkerImage(
            'data:image/png;base64,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',
            imageSize,
            imageOptions,
          ),
          setMarker = createMarker(
            new window.kakao.maps.LatLng(+place.y, +place.x),
            markerImage,
          );
        setMarker.setMap(map);
        console.log('click', setMarker);
      });
    }
  }, [keyword, map]);
  const onClickSearchButton = useCallback(() => {
    if (keyword.length >= 2) {
      searchBoxEvent();
    }
  }, [keyword, map]);
  const onKeyEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        searchBoxEvent();
      }
    },
    [keyword, map],
  );
  useEffect(() => {
    const mapScript = document.createElement('script');
    setKeyword('');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=93121493af238649367c528ff82a3797&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 6,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude, locationClickCount]);
  return (
    <>
      <div className={styles.title}>장소 검색</div>
      <input
        className={styles.input}
        type="text"
        placeholder={'Kakao 지도 검색'}
        value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={onKeyEnter}
      />
      <div onClick={onClickSearchButton} className={styles.searchButton}></div>
      <div
        className={styles.mapWrapper}
        id="map"
        style={{ width: 500, height: 400 }}
      ></div>
    </>
  );
};

export default KakaoMap;

export type mapData = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

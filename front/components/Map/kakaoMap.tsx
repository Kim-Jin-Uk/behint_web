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
  setLocationData: Dispatch<SetStateAction<any>>;
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
}: MapProps) => {
  const [keyword, onChangeKeyword, setKeyword] = useInput('') as inputType;
  const [map, setMap] = useState(null as naver.maps.Map | null);
  const [data, setData] = useState(null as any | null);

  const searchBoxEvent = useCallback(() => {
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
    function placesSearchCB(data: any, status: any, pagination: any) {
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

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

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
        setKeyword(place.place_name);
        setMapSelect(true);
        setLocationData(place);
        console.log('click', place);
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
  }, [latitude, longitude]);
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

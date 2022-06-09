import Header from '../../../components/Header';
import { createGlobalStyle } from 'styled-components';
import { Checkbox, Dropdown, message, Modal } from 'antd';
import styles from './style.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import useTextArea from '../../../hooks/useTextArea';
import { inputType, RootState, textareaType } from '../../../reducers';
import autosize from 'autosize';
import KakaoMap, { mapData } from '../../../components/Map/kakaoMap';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPLOAD_VIDEO_FILE_REQUEST,
  UPLOAD_VIDEO_REQUEST,
} from '../../../reducers/project';
import ReactPlayer from 'react-player/lazy';
import Image from 'next/image';

const Global = createGlobalStyle`
  .ant-modal-mask{
    z-index: 5000;
  }
  .ant-modal-wrap{
    z-index: 5000;
  }
  .ant-modal{
    position: static;
    padding: 0;
  }
  .ant-modal-content {
    border-radius: 4px;
    overflow: hidden;
    padding: 0;
    margin-top: calc(50vh - 330px);

    .ant-modal-close {
      display: none;
    }

    .ant-modal-header {
      height: 43px;
      padding: 24px 0 42px 36px;

      .ant-modal-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        color: #1A1E27;
      }
    }

    .ant-modal-body {
      padding: 0;
      width: auto;
      max-height: 530px;
    }

    .ant-modal-footer {
      padding: 0;
      button {
        width: 65px;
        height: 36px;
        background: #D2D6DA;
        border-radius: 18px;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        color: #FFFFFF;
        border: none;
        margin: 12px 20px 12px 0;
      }
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1E68FA;
  }

  .ant-checkbox-input {
    &:hover {
      border: 1px solid #1E68FA;
    }
  }

  .ant-dropdown {
    width: 426px;
    height: 304px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px 0;
    z-index: 6000;
    > div {
      width: 426px;
      height: 36px;
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #353C49;
      transition: 0.25s;
      cursor: pointer;
      padding: 9px 20px;
      &:hover {
        background: #F2F4F6;
        transition: 0.25s;
      }
    }
  }
  
  .ant-message{
    z-index: 10000;
  }
`;
interface checkboxObject {
  [key: string]: [string, boolean];
}
interface copyrightObject {
  [key: string]: boolean;
}
const Info = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    videoUrl,
    uploadVideoFileSuccess,
    uploadVideoFileError,
    thumbnailUrl,
    uploadVideoSuccess,
    uploadVideoError,
  } = useSelector((state: RootState) => state.project);
  const [buttonActive, setButtonActive] = useState(false);
  const [videoUrlLink, setVideoUrlLink] = useState('');
  const [thumbnailUrlLink, setThumbnailUrlLink] = useState('');

  const [infoVisible, setInfoVisible] = useState(false);
  const [commentaryVisible, setCommentaryVisible] = useState(false);
  const [checkboxList, setCheckboxList] = useState({
    entertainment: ['예능', false],
    documentary: ['다큐멘터리', false],
    movie: ['영화', false],
    drama: ['드라마', false],
    animation: ['애니메이션', false],
    advertising: ['광고', false],
    music: ['음악', false],
    sport: ['스포츠', false],
    game: ['게임', false],
  } as checkboxObject);
  const [checkboxItem, setCheckboxItem] = useState(
    [] as [string, string, boolean][],
  );
  const [locationVisible, setLocationVisible] = useState(false);
  const [perssonWith, setPersonWith] = useState([]);
  const [copyright, setCopyright] = useState({
    판권소유: true,
    '저작자표시 (CC BY)': false,
    '저작자표시 동일조건변경허락 (CC BY-SA)': false,
    '저작자표시 변경금지 (CC BY-ND)': false,
    '저작자표시-비영리 (CC BY-NC)': false,
    '저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)': false,
    '저작자표시-비영리-변경금지 (CC BY-NC-ND)': false,
    삭제: false,
  } as copyrightObject);
  const [copyrightText, setCopyrightText] = useState('판권소유');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, onChangeTitle] = useInput('') as inputType;
  const [introduce, onChangeIntroduce] = useTextArea('') as textareaType;
  const [tagList, setTagList] = useState([] as string[]);

  const [mapSelect, setMapSelect] = useState(false);
  const [locationData, setLocationData] = useState(null as mapData | null);
  const [locationList, setLocationList] = useState([] as mapData[]);
  const [locationClickCount, setLocationClickCount] = useState(0);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onClickCheckbox = useCallback(
    (key: string) => {
      const updateCheckboxList = { ...checkboxList };
      updateCheckboxList[key][1] = !updateCheckboxList[key][1];
      setCheckboxList({ ...updateCheckboxList });
    },
    [checkboxList],
  );

  const onClickMenu = useCallback(
    (key: string) => {
      copyright[key] = !copyright[key];
      setCopyright({ ...copyright });
      setCopyrightText(key);
    },
    [copyright],
  );

  const onClickDelete = useCallback(
    (i: number) => {
      tagList.splice(i, 1);
      setTagList([...tagList]);
    },
    [tagList],
  );

  const onClickLocationDelete = useCallback(
    (i: number) => {
      locationList.splice(i, 1);
      setLocationList([...locationList]);
    },
    [locationList],
  );

  const onKeyDownSpan = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (tagList.length >= 30) {
          message.warning('태그는 30개까지 입력가능합니다.');
        } else {
          const item = e.target.innerText.replace(/\n/gi, '').toLowerCase();
          if (!tagList.includes(item)) {
            if (item.replace(/(\s*)/g, '') !== '') {
              if (item.length >= 30) {
                message.warning('태그는 30자까지 입력가능합니다.');
              } else {
                setTagList([...tagList, item]);
              }
            } else {
            }
          } else {
            message.warning('동일한 태그를 입력하셨습니다.');
          }
        }

        e.target.innerText = '';
      }
    },
    [tagList],
  );
  const onKeyUpSpan = useCallback((e: any) => {
    if (e.key === 'Enter') {
      e.target.innerText = '';
    }
  }, []);

  const onClickAddLocation = useCallback(() => {
    setLocationVisible(true);
  }, []);

  const onClickAddLocationButton = useCallback(() => {
    if (locationData && mapSelect) {
      setLocationVisible(false);
      locationList.push(locationData);
      setLocationList([...locationList]);
      setLocationData(null);
      setLocationClickCount(locationClickCount + 1);
    }
  }, [locationData, mapSelect]);

  const onClickDeleteVideo = useCallback(() => {
    setVideoUrlLink('');
  }, [videoUrlLink]);

  const onClickDeleteImage = useCallback(() => {
    setThumbnailUrlLink('');
  }, [thumbnailUrl]);

  const onClickEditVideo = useCallback(() => {
    if (videoInputRef && videoInputRef.current) {
      videoInputRef.current.click();
    }
  }, [videoInputRef.current]);

  const onClickEditImage = useCallback(() => {
    if (imageInputRef && imageInputRef.current) {
      imageInputRef.current.click();
    }
  }, [imageInputRef.current]);

  const onChangeVideos = useCallback((e: any) => {
    const videoFormData = new FormData();
    videoFormData.append('file', e.target.files[0]);
    dispatch({
      type: UPLOAD_VIDEO_FILE_REQUEST,
      data: videoFormData,
    });
  }, []);

  const onChangeImages = useCallback((e: any) => {
    const imageFormData = new FormData();
    imageFormData.append('file', e.target.files[0]);
    dispatch({
      type: UPLOAD_VIDEO_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickInfoNext = useCallback(() => {
    setInfoVisible(false);
    setCommentaryVisible(true);
  }, []);

  const menu = (
    <>
      <div
        className={
          copyrightText === '판권소유' ? styles.selected : styles.nonSelected
        }
        onClick={() => onClickMenu('판권소유')}
      >
        판권소유
      </div>
      <div
        className={
          copyrightText === '저작자표시 (CC BY)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() => onClickMenu('저작자표시 (CC BY)')}
      >
        저작자표시 (CC BY)
      </div>
      <div
        className={
          copyrightText === '저작자표시 동일조건변경허락 (CC BY-SA)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() => onClickMenu('저작자표시 동일조건변경허락 (CC BY-SA)')}
      >
        저작자표시 동일조건변경허락 (CC BY-SA)
      </div>
      <div
        className={
          copyrightText === '저작자표시 변경금지 (CC BY-ND)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() => onClickMenu('저작자표시 변경금지 (CC BY-ND)')}
      >
        저작자표시 변경금지 (CC BY-ND)
      </div>
      <div
        className={
          copyrightText === '저작자표시-비영리 (CC BY-NC)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() => onClickMenu('저작자표시-비영리 (CC BY-NC)')}
      >
        저작자표시-비영리 (CC BY-NC)
      </div>
      <div
        className={
          copyrightText === '저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() =>
          onClickMenu('저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)')
        }
      >
        저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)
      </div>
      <div
        className={
          copyrightText === '저작자표시-비영리-변경금지 (CC BY-NC-ND)'
            ? styles.selected
            : styles.nonSelected
        }
        onClick={() => onClickMenu('저작자표시-비영리-변경금지 (CC BY-NC-ND)')}
      >
        저작자표시-비영리-변경금지 (CC BY-NC-ND)
      </div>
      <div
        className={
          copyrightText === '삭제' ? styles.selected : styles.nonSelected
        }
        onClick={() => onClickMenu('삭제')}
      >
        삭제
      </div>
    </>
  );

  useEffect(() => {
    setInfoVisible(true);
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, [introduce]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  useEffect(() => {
    checkboxItem.length = 0;
    for (const item in checkboxList) {
      const checkItem = [...checkboxList[item]];
      checkItem.unshift(item);
      checkboxItem.push(checkItem as [string, string, boolean]);
    }
    setCheckboxItem([...checkboxItem]);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const data = router.query.videoData;
      setVideoUrlLink(data as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (uploadVideoFileSuccess) {
      setVideoUrlLink(videoUrl);
    } else if (uploadVideoFileError) {
      message.error('업로드에 실패하셨습니다');
    }
  }, [uploadVideoFileSuccess, uploadVideoFileError, videoUrl]);

  useEffect(() => {
    if (uploadVideoSuccess) {
      setThumbnailUrlLink(thumbnailUrl);
    } else if (uploadVideoError) {
      message.error('업로드에 실패하셨습니다');
    }
  }, [uploadVideoSuccess, uploadVideoError, thumbnailUrl]);

  useEffect(() => {
    if (thumbnailUrlLink && videoUrlLink && title.length > 2) {
      for (const item in checkboxList) {
        if (checkboxList[item][1]) {
          return setButtonActive(true);
        }
      }
    }
    return setButtonActive(false);
  }, [thumbnailUrlLink, videoUrlLink, title, checkboxList]);

  return (
    <>
      <Global />
      <Header />
      <Modal
        width={970}
        title={'기본 정보'}
        visible={infoVisible}
        footer={
          <div className={styles.bottomWrapper}>
            <button
              className={
                buttonActive ? styles.selectButton : styles.nonSelectButton
              }
              onClick={
                buttonActive
                  ? onClickInfoNext
                  : () => {
                      console.log('click');
                    }
              }
            >
              다음
            </button>
          </div>
        }
      >
        <div className={styles.closeButton} />
        <div className={styles.editorWrapper}>
          <aside className={styles.leftWrapper}>
            <div style={{ marginBottom: 12 }}>영상 업로드</div>
            <div
              className={styles.thumbnailWrapper}
              style={{
                marginBottom: 32,
              }}
            >
              <div className={styles.videoWrapper}>
                {videoUrlLink !== '' && (
                  <ReactPlayer
                    width={320}
                    height={180}
                    url={videoUrlLink}
                    playing={true} // 자동 재생 on
                    muted={true} // 자동 재생 on
                    controls={true} // 플레이어 컨트롤 노출 여부
                    light={false} // 플레이어 모드
                    pip={true} // pip 모드 설정 여부
                  />
                )}
              </div>
              <div className={styles.blackCover}>
                <div className={styles.buttonGroup}>
                  <div
                    className={styles.buttonWrapper}
                    onClick={onClickEditVideo}
                  >
                    <button>
                      <div className={styles.editButton} />
                    </button>
                    <div>파일 변경</div>
                  </div>
                  <div
                    className={styles.buttonWrapper}
                    onClick={onClickDeleteVideo}
                  >
                    <button>
                      <div className={styles.deleteButton} />
                    </button>
                    <div>삭제</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>표지 이미지 설정</div>
            {thumbnailUrlLink !== '' ? (
              <div className={styles.thumbnailWrapper}>
                <div className={styles.videoWrapper}>
                  <Image width={320} height={190} src={thumbnailUrlLink} />
                </div>
                <div className={styles.blackCover}>
                  <div className={styles.buttonGroup}>
                    <div
                      className={styles.buttonWrapper}
                      onClick={onClickEditImage}
                    >
                      <button>
                        <div className={styles.editButton}></div>
                      </button>
                      <div>파일 변경</div>
                    </div>
                    <div
                      className={styles.buttonWrapper}
                      onClick={onClickDeleteImage}
                    >
                      <button>
                        <div className={styles.deleteButton} />
                      </button>
                      <div>삭제</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.imageWrapper} onClick={onClickEditImage}>
                <div></div>
                <span>
                  최소크기는 <br />
                  “560x560px”입니다.
                </span>
                <button>이미지 업로드</button>
              </div>
            )}
          </aside>
          <div className={styles.rightWrapper}>
            <div style={{ marginBottom: 8 }}>프로젝트 제목*</div>
            <input
              style={{ marginBottom: 32 }}
              type="text"
              placeholder={'프로젝트의 제목을 적어주세요.'}
              value={title}
              onChange={onChangeTitle}
            />
            <div style={{ marginBottom: 8 }}>분야*</div>
            <div className={styles.checkboxWrapper}>
              {checkboxItem.map((v: [string, string, boolean], i) => {
                return (
                  <Checkbox
                    key={v[0]}
                    value={v[2]}
                    onClick={() => onClickCheckbox(v[0])}
                  >
                    {v[1]}
                  </Checkbox>
                );
              })}
            </div>
            <div style={{ marginBottom: 8 }}>촬영 장소</div>
            {locationList.length > 0 && (
              <div className={styles.tagWrapper} style={{ marginBottom: 8 }}>
                {locationList.map((v: mapData, i) => {
                  return (
                    <div className={styles.tag} key={i}>
                      <div>{v.place_name}</div>
                      <div
                        onClick={() => onClickLocationDelete(i)}
                        className={styles.delete}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className={styles.addLocation} onClick={onClickAddLocation}>
              + 촬영한 장소 추가하기 <div />
            </div>
            <div style={{ marginBottom: 8 }}>소개</div>
            <textarea
              style={{ marginBottom: 32 }}
              ref={textAreaRef}
              placeholder={'프로젝트에 대한 간단한 설명을 적어주세요.'}
              onChange={onChangeIntroduce}
              value={introduce}
            />
            <div style={{ marginBottom: 8 }}>사용한 기술 · 장비</div>
            <div className={styles.tagWrapper}>
              {tagList.map((v, i) => {
                return (
                  <div className={styles.tag} key={i}>
                    <div>{v}</div>
                    <div
                      onClick={() => onClickDelete(i)}
                      className={styles.delete}
                    />
                  </div>
                );
              })}
              <span
                contentEditable
                className={styles.tag_input}
                placeholder={
                  '프로젝트를 만들면서 자신이 사용한 기술, 장비, 프로그램 등을 적어주세요.'
                }
                onKeyDown={onKeyDownSpan}
                onKeyUp={onKeyUpSpan}
              />
            </div>

            <div style={{ marginBottom: 8 }}>함께한 사람</div>
            <div className={styles.addLocation}>
              + 함께한 사람 추가하기 <div />
            </div>
            {perssonWith.map((v, i) => {
              return <div />;
            })}
            <div style={{ marginBottom: 8 }}>저작권 및 라이선스</div>
            <Dropdown overlay={menu} placement="bottom">
              <button
                className={styles.hoverButton}
                style={{ marginBottom: 14 }}
              >
                {copyrightText} <div />
              </button>
            </Dropdown>
          </div>
        </div>
      </Modal>
      <Modal
        style={{ marginTop: 70 }}
        width={500}
        title={'촬영 장소'}
        visible={locationVisible}
        footer={
          <div className={styles.bottomWrapper}>
            <button
              onClick={() => {
                setMapSelect(false);
                setLocationVisible(false);
                setLocationClickCount(locationClickCount + 1);
              }}
              className={styles.cancelButton}
            >
              취소
            </button>
            <button
              className={
                mapSelect ? styles.selectButton : styles.nonSelectButton
              }
              onClick={onClickAddLocationButton}
            >
              추가
            </button>
          </div>
        }
      >
        <KakaoMap
          setMapSelect={setMapSelect}
          mapSelect={mapSelect}
          setLocationData={setLocationData}
          locationClickCount={locationClickCount}
          latitude={37.5518927}
          longitude={126.9917822}
        />
      </Modal>

      <Modal
        width={970}
        title={'코멘터리'}
        visible={commentaryVisible}
        footer={
          <div className={styles.bottomWrapper}>
            <button></button>
          </div>
        }
      ></Modal>

      <input
        type="file"
        name="file"
        accept="video/mp4"
        hidden
        ref={videoInputRef}
        onChange={onChangeVideos}
      />
      <input
        type="file"
        name="file"
        accept="image/png, image/jpeg"
        hidden
        ref={imageInputRef}
        onChange={onChangeImages}
      />
    </>
  );
};

export default Info;

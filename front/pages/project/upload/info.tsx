import Header from '../../../components/Header';
import { createGlobalStyle } from 'styled-components';
import { Checkbox, Dropdown, message, Modal, Slider, Tooltip } from 'antd';
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
  CommentaryItem,
  GET_THUMBNAIL_LIST_REQUEST,
  UPLOAD_VIDEO_FILE_REQUEST,
  UPLOAD_VIDEO_REQUEST,
} from '../../../reducers/project';
import ReactPlayer from 'react-player/lazy';
import Image from 'next/image';
import useInputNumber from '../../../hooks/useInputNumber';
import { IS_LOGIN_REQUEST } from '../../../reducers/user';
import CommentaryAddItem from '../../../components/CommentaryAddItem';

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
  .ant-tooltip{
    z-index: 10000;
  }
  .ant-tooltip-inner{
    border-radius: 8px;
    padding: 24px 20px;
  }
  .ant-tooltip-arrow{
    left: -7.1px!important;
  }
  .ant-slider{
    top:-39.5px;
    width: 512px;
    margin-left: 0;
    .ant-slider-rail{
      display: none; 
    }
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
    thumbnailList,
    getThumbnailListSuccess,
    getThumbnailListError,
  } = useSelector((state: RootState) => state.project);
  const { me, isLoginSuccess, isLoginError } = useSelector(
    (state: RootState) => state.user,
  );

  const videoEditorRef = useRef<ReactPlayer | null>(null);
  const [startVideoEditTime, setStartVideoEditTime] = useState(0);
  const [endVideoEditTime, setEndVideoEditTime] = useState(0);
  const [startVideoSliderTime, setStartVideoSliderTime] = useState(0);
  const [endVideoSliderTime, setEndVideoSliderTime] = useState(0);
  const [startVideoMinute, onChangeStartMinute, setStartVideoMinute] =
    useInputNumber('') as inputType;
  const [endVideoMinute, onChangeEndMinute, setEndVideoMinute] = useInputNumber(
    '',
  ) as inputType;
  const [startVideoSecond, onChangeStartSecond, setStartVideoSecond] =
    useInputNumber('') as inputType;
  const [endVideoSecond, onChangeEndSecond, setEndVideoSecond] = useInputNumber(
    '',
  ) as inputType;
  const [commentaryItemList, setCommentaryItemList] = useState(
    [] as CommentaryItem[],
  );
  const [commentaryItemOpenedList, setCommentaryItemOpenedList] = useState(
    [] as boolean[],
  );
  const [timeDivisionList, setTimeDivisionList] = useState([] as number[]);

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
  const commentaryAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, onChangeTitle] = useInput('') as inputType;
  const [introduce, onChangeIntroduce] = useTextArea('') as textareaType;
  const [tagList, setTagList] = useState([] as string[]);

  const [mapSelect, setMapSelect] = useState(false);
  const [locationData, setLocationData] = useState(null as mapData | null);
  const [locationList, setLocationList] = useState([] as mapData[]);
  const [locationClickCount, setLocationClickCount] = useState(0);

  const [commentaryTitle, onChangeCommentaryTitle, setCommentaryTitle] =
    useInput('') as inputType;
  const [
    commentaryContents,
    onChangeCommentaryContents,
    setCommentaryContents,
  ] = useInput('') as textareaType;
  const [commentaryActive, setCommentaryActive] = useState(false);

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

  const onChangeSlider = useCallback((value: [number, number]) => {
    setStartVideoSliderTime(value[0]);
    setEndVideoSliderTime(value[1]);
  }, []);

  const onAfterChangeSlider = useCallback((value: [number, number]) => {
    setStartVideoSliderTime(value[0]);
    setEndVideoSliderTime(value[1]);
    setStartVideoEditTime(value[0]);
    setEndVideoEditTime(value[1]);
  }, []);

  const onSeekPlayer = useCallback(
    (seconds: number) => {
      setStartVideoEditTime(seconds);
    },
    [videoEditorRef],
  );

  const onClickCommentaryCancelButton = useCallback(() => {
    setCommentaryContents('');
    setCommentaryTitle('');
  }, []);

  const onClickCommentaryAddButton = useCallback(() => {
    const thumbnailIndex =
      thumbnailList &&
      parseInt(
        (startVideoEditTime / (thumbnailList.fileDuration / 8)).toString(),
      );
    const imageUrl = thumbnailList.url[thumbnailIndex];
    const commentaryItem: CommentaryItem = {
      title: commentaryTitle,
      contents: commentaryContents,
      startTime: startVideoEditTime,
      endTime: endVideoEditTime,
      thumbnailImgUrl: imageUrl,
      userId: me.id,
    };
    commentaryItemList.push(commentaryItem);
    commentaryItemOpenedList.push(false);
    setCommentaryItemList([...commentaryItemList]);
    setCommentaryItemOpenedList([...commentaryItemOpenedList]);
    setCommentaryTitle('');
    setCommentaryContents('');
  }, [
    commentaryTitle,
    commentaryContents,
    startVideoEditTime,
    endVideoEditTime,
    thumbnailList,
    me,
  ]);

  const onClickMoreButton = useCallback(
    (index: number) => {
      commentaryItemOpenedList[index - 1] =
        !commentaryItemOpenedList[index - 1];
      setCommentaryItemOpenedList([...commentaryItemOpenedList]);
    },
    [commentaryItemOpenedList],
  );

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
    dispatch({
      type: IS_LOGIN_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!isLoginSuccess && isLoginError) {
      router.back();
    }
  }, [isLoginError, isLoginSuccess]);

  useEffect(() => {
    setInfoVisible(true);
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, [introduce]);

  useEffect(() => {
    if (commentaryAreaRef.current) {
      autosize(commentaryAreaRef.current);
    }
  }, [commentaryContents]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  useEffect(() => {
    if (commentaryAreaRef.current) {
      autosize(commentaryAreaRef.current);
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
    if (videoUrlLink !== '' && !commentaryVisible) {
      dispatch({
        type: GET_THUMBNAIL_LIST_REQUEST,
        data: { url: videoUrlLink },
      });
    }
  }, [videoUrlLink, commentaryVisible]);

  useEffect(() => {
    if (uploadVideoSuccess) {
      setThumbnailUrlLink(thumbnailUrl);
    } else if (uploadVideoError) {
      message.error('업로드에 실패하셨습니다');
    }
  }, [uploadVideoSuccess, uploadVideoError, thumbnailUrl]);

  useEffect(() => {
    if (getThumbnailListSuccess) {
      console.log(thumbnailList);
    }
  }, [getThumbnailListSuccess, thumbnailList]);

  useEffect(() => {
    if (startVideoEditTime !== 0 || endVideoEditTime !== 0) {
      setStartVideoMinute(
        `${
          Math.floor(startVideoEditTime / 60) < 10
            ? `0${Math.floor(startVideoEditTime / 60)}`
            : Math.floor(startVideoEditTime / 60)
        }`,
      );
      setStartVideoSecond(
        `${
          Math.floor(startVideoEditTime % 60) < 10
            ? `0${Math.floor(startVideoEditTime % 60)}`
            : Math.floor(startVideoEditTime % 60)
        }`,
      );
      setEndVideoMinute(
        `${
          Math.floor(endVideoEditTime / 60) < 10
            ? `0${Math.floor(endVideoEditTime / 60)}`
            : Math.floor(endVideoEditTime / 60)
        }`,
      );
      setEndVideoSecond(
        `${
          Math.floor(endVideoEditTime % 60) < 10
            ? `0${Math.floor(endVideoEditTime % 60)}`
            : Math.floor(endVideoEditTime % 60)
        }`,
      );
    }
    if (videoEditorRef && videoEditorRef.current) {
      videoEditorRef.current.seekTo(startVideoEditTime);
    }
  }, [startVideoEditTime, endVideoEditTime]);

  useEffect(() => {
    if (thumbnailList) {
      if (startVideoEditTime > thumbnailList.fileDuration) {
        setStartVideoEditTime(thumbnailList.fileDuration);
      }
      if (endVideoEditTime > thumbnailList.fileDuration) {
        setEndVideoEditTime(thumbnailList.fileDuration);
      }
    }
  }, [startVideoEditTime, endVideoEditTime, thumbnailList]);

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

  useEffect(() => {
    setStartVideoEditTime(+startVideoMinute * 60 + +startVideoSecond);
    setEndVideoEditTime(+endVideoMinute * 60 + +endVideoSecond);
    setStartVideoSliderTime(+startVideoMinute * 60 + +startVideoSecond);
    setEndVideoSliderTime(+endVideoMinute * 60 + +endVideoSecond);
  }, [startVideoMinute, startVideoSecond, endVideoMinute, endVideoSecond]);

  useEffect(() => {
    if (thumbnailList && thumbnailList.fileDuration) {
      const length = thumbnailList.fileDuration / 600;
      const setList = new Array(parseInt(length.toString()) + 1).fill(0);
      setTimeDivisionList(setList as number[]);
    }
  }, [thumbnailList]);

  useEffect(() => {
    if (commentaryTitle.length > 0) {
      setCommentaryActive(true);
    } else {
      setCommentaryActive(false);
    }
  }, [commentaryTitle]);

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
                      console.log('');
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
                    loop={true}
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
        title={
          <div className={styles.commentaryTitle}>
            <span>코멘터리</span>
            <Tooltip
              placement="rightBottom"
              title={
                <div className={styles.commentaryTooltip}>
                  <h4>코멘터리란?</h4>
                  <div>
                    콘텐츠를 제작하면서 경험한 고충과 문제, 해결 방법 등 영상에
                    담지 못한 제작 비하인드를 담는 공간입니다.
                  </div>
                </div>
              }
            >
              <div />
            </Tooltip>
          </div>
        }
        visible={commentaryVisible}
        footer={
          <div className={styles.bottomWrapper}>
            <button
              onClick={() => {
                console.log('click');
              }}
              className={styles.cancelButton}
            >
              뒤로
            </button>
            <button
              className={
                commentaryItemList.length > 0
                  ? styles.selectButton
                  : styles.nonSelectButton
              }
              onClick={() => {
                console.log('click');
              }}
            >
              업로드
            </button>
          </div>
        }
      >
        <div className={styles.closeButton} />
        <div className={styles.editorWrapper} style={{ overflowY: 'scroll' }}>
          <aside className={styles.leftWrapper} style={{ width: 558 }}>
            <div style={{ marginBottom: 12 }}>코멘터리 구간 추가</div>
            {videoUrlLink !== '' && (
              <ReactPlayer
                width={528}
                height={297}
                url={videoUrlLink}
                playing={false} // 자동 재생 on
                muted={true} // 자동 재생 on
                controls={true} // 플레이어 컨트롤 노출 여부
                light={false} // 플레이어 모드
                pip={true} // pip 모드 설정 여부
                ref={videoEditorRef}
                onSeek={onSeekPlayer}
              />
            )}
            <div className={styles.timeWrapper}>
              <div className={styles.timer}>
                <input
                  value={startVideoMinute}
                  onChange={onChangeStartMinute}
                  placeholder={'00'}
                  type="number"
                  maxLength={2}
                  max={60}
                  min={0}
                />
                <div>:</div>
                <input
                  value={startVideoSecond}
                  onChange={onChangeStartSecond}
                  placeholder={'00'}
                  type="number"
                  maxLength={2}
                  max={60}
                  min={0}
                />
              </div>
              <div className={styles.timerDivision}></div>
              <div className={styles.timer}>
                <input
                  value={endVideoMinute}
                  onChange={onChangeEndMinute}
                  placeholder={'00'}
                  type="number"
                  max={60}
                  maxLength={2}
                  min={0}
                />
                <div>:</div>
                <input
                  value={endVideoSecond}
                  onChange={onChangeEndSecond}
                  placeholder={'00'}
                  type="number"
                  max={60}
                  maxLength={2}
                  min={0}
                />
              </div>
              <Tooltip
                placement="rightBottom"
                title={
                  <div className={styles.commentaryTooltip}>
                    <div>
                      영상 재생바의 핸들을 움직이거나 시간을 직접 입력해서
                      구간을 설정할 수 있어요.
                    </div>
                  </div>
                }
              >
                <div className={styles.info} />
              </Tooltip>
            </div>
            <div style={{ position: 'relative', padding: '0 9px' }}>
              {timeDivisionList.map((v, i) => {
                return (
                  <div
                    style={{
                      transform: `translateX(calc(${
                        thumbnailList &&
                        (i * 60000) / thumbnailList.fileDuration
                      }%))`,
                    }}
                    className={styles.timeDivision}
                  >
                    <div></div>
                    <span>{`${i}0:00`}</span>
                  </div>
                );
              })}
              {thumbnailList &&
                thumbnailList.success &&
                thumbnailList.url.map((v: string) => {
                  return (
                    <div
                      style={{
                        backgroundImage: "url('" + v + "')",
                        backgroundSize: 'cover',
                        width: 64,
                        height: 36,
                        display: 'inline-block',
                      }}
                    ></div>
                  );
                })}
              {thumbnailList && thumbnailList.success && (
                <Slider
                  range
                  defaultValue={[startVideoEditTime, endVideoEditTime]}
                  value={[startVideoSliderTime, endVideoSliderTime]}
                  tooltipVisible={false}
                  min={0}
                  max={thumbnailList ? thumbnailList.fileDuration : 100}
                  onAfterChange={onAfterChangeSlider}
                  onChange={onChangeSlider}
                  handleStyle={[
                    {
                      height: '42px',
                      width: '10px',
                      borderRadius: '5px',
                      background:
                        'url("https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/behint-icon/sliderCenter.svg") no-repeat',
                      backgroundColor: '#1E68FA',
                      backgroundPosition: 'center',
                      backgroundSize: '2px 20px',
                      outline: 'none',
                      boxShadow: 'none',
                      border: '4px solid #1E68FA',
                      top: '-9px',
                    },
                  ]}
                  trackStyle={[
                    {
                      height: '42px',
                      background:
                        'url("https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/behint-icon/sliderCenter.svg") no-repeat',
                      backgroundColor: 'rgba(30,104,250,0.3)',
                      backgroundPosition: 'center',
                      backgroundSize: '3.5px 35px',
                      outline: 'none',
                      boxShadow: 'none',
                      borderTop: '4px solid #1E68FA',
                      borderBottom: '4px solid #1E68FA',
                      top: '-14px',
                    },
                  ]}
                />
              )}
            </div>
            <div style={{ marginBottom: 8, marginTop: -9 }}>제목*</div>
            <input
              style={{ marginBottom: 16 }}
              type="text"
              placeholder={'코멘터리의 제목을 적어주세요.'}
              value={commentaryTitle}
              onChange={onChangeCommentaryTitle}
            />
            <div style={{ marginBottom: 8 }}>내용</div>
            <textarea
              style={{
                marginBottom: 12,
                maxHeight: 72,
              }}
              placeholder={'코멘터리의 내용을 적어주세요.'}
              value={commentaryContents}
              onChange={onChangeCommentaryContents}
              ref={commentaryAreaRef}
            />
            <div className={styles.commentaryButtonWrapper}>
              <button
                className={
                  commentaryActive
                    ? styles.commentaryActiveButton
                    : styles.commentaryNonActiveButton
                }
                onClick={
                  commentaryActive
                    ? onClickCommentaryAddButton
                    : () => {
                        console.log('');
                      }
                }
              >
                추가
              </button>
              <button
                onClick={onClickCommentaryCancelButton}
                className={styles.commentaryCancelButton}
              >
                취소
              </button>
            </div>
          </aside>
          <div
            className={styles.rightWrapper}
            style={{ width: 341, overflow: 'hidden', paddingRight: 0 }}
          >
            <div style={{ marginBottom: 12 }}>코멘터리 리스트</div>
            {commentaryItemList.length === 0 && (
              <div className={styles.nonCommentaryWrapper}>
                <span>
                  함께한 사람들과 코멘터리를
                  <br />
                  나누어 힌트가 되어주세요.
                  <br />
                  <br />
                  좌측의 타임라인에서 코멘터리를 추가할 수 있어요.
                </span>
              </div>
            )}
            {commentaryItemList.map((v: CommentaryItem, i: number) => {
              return (
                <CommentaryAddItem
                  itemList={[v]}
                  key={i}
                  index={i + 1}
                  opened={commentaryItemOpenedList[i]}
                  onClickMoreButton={onClickMoreButton}
                ></CommentaryAddItem>
              );
            })}
            <div style={{ height: 1000 }}></div>
          </div>
        </div>
      </Modal>

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

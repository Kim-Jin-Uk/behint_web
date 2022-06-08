import Header from '../../../../components/Header';
import styles from './style.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import {
  inputType,
  openListOptions,
  profileContent,
  RootState,
  textareaType,
} from '../../../../reducers';
import ProfileEditItem from '../../../../components/ProfileEditItem';
import Editor from '../../../../components/ProfileEditItem/editor';
import { useDispatch, useSelector } from 'react-redux';
import {
  IS_LOGIN_REQUEST,
  UPDATE_PROFILE_REQUEST,
  User,
} from '../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import useTextArea from '../../../../hooks/useTextArea';
import SNS from '../../../../components/ProfileEditItem/sns';
import useIntersectionObservationEdit from '../../../../hooks/useIntersectionObservationEdit';
import { Button, Dropdown } from 'antd';
import projectStyles from '../project/style.module.scss';

const Edit = () => {
  const profileRightMenu = [
    '기본 정보',
    '자기 소개',
    '근무 경험',
    '콘텐츠 제작',
    '보유 능력',
    '학력',
    '수상',
    '채널',
  ];
  const [selectedMenu, setSelectedMenu] = useState(0);
  const basicInfoRef = useRef<HTMLDivElement>(null);
  const introduceRef = useRef<HTMLDivElement>(null);
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const contentCreationRef = useRef<HTMLDivElement>(null);
  const holdingCapacityRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<HTMLDivElement>(null);

  const refList = [
    basicInfoRef,
    introduceRef,
    workExperienceRef,
    contentCreationRef,
    holdingCapacityRef,
    educationRef,
    awardsRef,
    channelRef,
  ];

  const [activeId, setActiveId] = useState(0);
  useIntersectionObservationEdit(setActiveId);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [openAbleList, setOpenAbleList] = useState({} as openListOptions);

  const [editModeList, setEditModeList] = useState({} as openListOptions);

  const { me, updateProfileSuccess } = useSelector(
    (state: RootState) => state.user,
  );

  const [name, onChangeName, setName] = useInput('') as inputType;

  const [userData, setUserData] = useState(null as unknown as User);

  const [job, onChangeJob, setJob] = useInput('') as inputType;

  const [location, onChangeLocation, setLocation] = useInput('') as inputType;

  const [introduce, onChangeIntroduce, setIntroduce] = useTextArea(
    '',
  ) as textareaType;

  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [tweeterUrl, setTweeterUrl] = useState('');
  const [etcUrl, setEtcUrl] = useState('');
  const dispatch = useDispatch();

  function rightMenuBar() {
    return (
      <div className={projectStyles.dropdownMenu} style={{ width: 144 }}>
        <div style={{ fontSize: 14, paddingLeft: 20, paddingRight: 20 }}>
          변경
        </div>
        <div style={{ fontSize: 14, paddingLeft: 20, paddingRight: 20 }}>
          기본 이미지로 교체
        </div>
      </div>
    );
  }

  //user 로그인 확인
  useEffect(() => {
    dispatch({
      type: IS_LOGIN_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (me) {
      setName(me.profiles[0] ? me.profiles[0].nickname : me.email);
      setJob(me.profiles[0] ? me.profiles[0].job : '');
      setLocation(me.profiles[0] ? me.profiles[0].location : '');
    }
  }, [me]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const openList: openListOptions = {
        '자기 소개': [],
        '근무 경험': [],
        '콘텐츠 제작': [],
        '보유 능력': [],
        학력: [],
        수상: [],
      };
      userData.informations.map((v: profileContent) => {
        openList[v.type] = openList[v.type].concat([true]);
      });
      const editList: openListOptions = {};
      for (const i in openList) {
        editList[i] = [false];
      }
      setOpenAbleList(openList);
      setEditModeList(editList);
    }
  }, [userData]);

  useEffect(() => {
    if (me) {
      setUserData(me);
      setIntroduce(me.profiles && me.profiles[0].introduce);
      setYoutubeUrl(me.profiles && me.profiles[0].youtubeUrl!);
      setInstagramUrl(me.profiles && me.profiles[0].instagramUrl!);
      setFacebookUrl(me.profiles && me.profiles[0].facebookUrl!);
      setTweeterUrl(me.profiles && me.profiles[0].tweeterUrl!);
      setEtcUrl(me.profiles && me.profiles[0].etcUrl!);
    }
  }, [me]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, [introduce]);

  useEffect(() => {
    setSelectedMenu(activeId);
  }, [activeId]);

  useEffect(() => {
    if (updateProfileSuccess) {
      console.log('updateComplete');
    }
  }, [updateProfileSuccess]);

  const onClickEditIcon = useCallback(
    (type: string, idx: number) => {
      if (!openAbleList[type]) return;
      if (!openAbleList[type][idx]) return;
      editModeList[type][0] = false;
      setEditModeList(editModeList);
      const changeList: boolean[] = [];
      openAbleList[type].map((v, i) => {
        if (i === idx) {
          changeList.push(false);
        } else {
          changeList.push(true);
        }
      });
      openAbleList[type] = changeList;
      setOpenAbleList({ ...openAbleList });
    },
    [openAbleList, editModeList],
  );

  const onClickDeleteIcon = useCallback(
    (type: string, idx: number) => {
      let index = 0;
      for (let i = 0; i < userData.informations.length; i++) {
        if (userData.informations[i].type === type) {
          if (index === idx) {
            const informationList = [...userData.informations];
            informationList.splice(i, 1);
            setUserData({ ...userData, informations: informationList });
            break;
          } else {
            index++;
          }
        }
      }
      openAbleList[type].splice(idx, 1);
      setOpenAbleList({ ...openAbleList });
    },
    [openAbleList, userData],
  );

  const onClickEditText = useCallback(
    (type: string) => {
      editModeList[type][0] = true;
      setEditModeList({ ...editModeList });
    },
    [editModeList],
  );

  const onClickLinkSave = useCallback(
    (url: string, type: string) => {
      const data = { ...userData.profiles[0] };
      switch (type) {
        case 'instagramUrl':
          setInstagramUrl(url);
          break;
        case 'youtubeUrl':
          setYoutubeUrl(url);
          break;
        case 'facebookUrl':
          setFacebookUrl(url);
          break;
        case 'tweeterUrl':
          setTweeterUrl(url);
          break;
        case 'etcUrl':
          setEtcUrl(url);
          break;
        default:
          break;
      }
      setUserData({ ...userData, profiles: [data] });
    },
    [userData],
  );

  const onClickProfileSave = useCallback(() => {
    const userUpdate: User = {
      id: me.id,
      profiles: [
        {
          nickname: name,
          job: job,
          location: location,
          profileImgUrl: '',
          introduce: introduce,
          instagramUrl: instagramUrl,
          youtubeUrl: youtubeUrl,
          facebookUrl: facebookUrl,
          tweeterUrl: tweeterUrl,
          etcUrl: etcUrl,
        },
      ],
      informations: userData.informations,
    };
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
      data: userUpdate,
    });
  }, [
    me,
    name,
    job,
    location,
    introduce,
    instagramUrl,
    youtubeUrl,
    facebookUrl,
    tweeterUrl,
    etcUrl,
    userData,
  ]);

  return (
    <>
      <Header></Header>
      <div className={styles.editTop}>
        <button className={styles.backButton}></button>
        <button className={styles.saveButton} onClick={onClickProfileSave}>
          저장
        </button>
      </div>
      <div className={styles.bodyWrapper}>
        <h1>프로필 수정</h1>
        <div className={styles.profileImage}>
          <div>
            <Dropdown overlay={rightMenuBar} placement="bottomLeft">
              <Button>
                <div></div>
                <div className={projectStyles.dropdownIcon} />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className={styles.editLeftWrapper}>
          <div id={'기본정보'}>
            <h2>기본 정보</h2>
            <div ref={basicInfoRef} className={styles.ref}></div>
            <div style={{ marginBottom: 70, marginTop: 28 }}>
              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>이름*</h3>
                <span>(0/20)</span>
              </div>
              <input
                type="text"
                placeholder={'이름'}
                maxLength={20}
                value={name}
                onChange={onChangeName}
              />

              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>직업</h3>
                <span>(0/20)</span>
              </div>
              <input
                type="text"
                placeholder={'직업'}
                maxLength={20}
                value={job}
                onChange={onChangeJob}
              />

              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>위치</h3>
              </div>
              <input
                type="text"
                placeholder={'위치'}
                maxLength={60}
                value={location}
                onChange={onChangeLocation}
              />
            </div>
          </div>
          <div id={'자기소개'}>
            <h2>자기 소개</h2>
            <div ref={introduceRef} className={styles.ref}></div>
            <div style={{ marginBottom: 70, marginTop: 28 }}>
              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>소개</h3>
                <span>(0/500)</span>
              </div>
              <textarea
                placeholder={'소개'}
                ref={textAreaRef}
                maxLength={500}
                value={introduce}
                onChange={onChangeIntroduce}
              />
            </div>
          </div>
          <div id={'근무경험'}>
            <h2>근무 경험</h2>
            <div ref={workExperienceRef} className={styles.ref}></div>
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '근무 경험')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '근무 경험' &&
                    openAbleList[v.type] &&
                    openAbleList[v.type][i]
                  ) {
                    return (
                      <ProfileEditItem
                        key={i}
                        data={v}
                        idx={i}
                        onClickEditIcon={onClickEditIcon}
                        onClickDeleteIcon={onClickDeleteIcon}
                      ></ProfileEditItem>
                    );
                  }
                })}
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '근무 경험')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '근무 경험' &&
                    openAbleList[v.type] &&
                    !openAbleList[v.type][i] &&
                    !editModeList[v.type][0]
                  ) {
                    return (
                      <Editor
                        data={v}
                        idx={i}
                        type={v.type}
                        openAbleList={openAbleList}
                        setOpenAbleList={setOpenAbleList}
                        userData={userData}
                        setUserData={setUserData}
                        editModeList={null}
                        setEditModeList={null}
                        key={i}
                      />
                    );
                  }
                })}
            {editModeList['근무 경험'] && editModeList['근무 경험'][0] ? (
              <Editor
                data={null}
                type={'근무 경험'}
                idx={
                  userData.informations.filter(
                    (v: profileContent) => v.type === '근무 경험',
                  ).length
                }
                openAbleList={openAbleList}
                setOpenAbleList={setOpenAbleList}
                userData={userData}
                setUserData={setUserData}
                editModeList={editModeList}
                setEditModeList={setEditModeList}
              />
            ) : null}
            <div
              className={styles.addItem}
              onClick={() => onClickEditText('근무 경험')}
            >
              + 경력 추가 <div></div>
            </div>
          </div>
          <div id={'콘텐츠제작'}>
            <h2>콘텐츠 제작</h2>
            <div ref={contentCreationRef} className={styles.ref}></div>
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '콘텐츠 제작')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '콘텐츠 제작' &&
                    openAbleList[v.type] &&
                    openAbleList[v.type][i]
                  ) {
                    return (
                      <ProfileEditItem
                        key={i}
                        data={v}
                        idx={i}
                        onClickEditIcon={onClickEditIcon}
                        onClickDeleteIcon={onClickDeleteIcon}
                      ></ProfileEditItem>
                    );
                  }
                })}
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '콘텐츠 제작')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '콘텐츠 제작' &&
                    openAbleList[v.type] &&
                    !openAbleList[v.type][i] &&
                    !editModeList[v.type][0]
                  ) {
                    return (
                      <Editor
                        data={v}
                        idx={i}
                        type={v.type}
                        openAbleList={openAbleList}
                        setOpenAbleList={setOpenAbleList}
                        userData={userData}
                        setUserData={setUserData}
                        editModeList={null}
                        setEditModeList={null}
                        key={i}
                      />
                    );
                  }
                })}
            {editModeList['콘텐츠 제작'] && editModeList['콘텐츠 제작'][0] ? (
              <Editor
                data={null}
                type={'콘텐츠 제작'}
                idx={
                  userData.informations.filter(
                    (v: profileContent) => v.type === '콘텐츠 제작',
                  ).length
                }
                openAbleList={openAbleList}
                setOpenAbleList={setOpenAbleList}
                userData={userData}
                setUserData={setUserData}
                editModeList={editModeList}
                setEditModeList={setEditModeList}
              />
            ) : null}
            <div
              className={styles.addItem}
              onClick={() => onClickEditText('콘텐츠 제작')}
            >
              + 콘텐츠 추가 <div></div>
            </div>
          </div>
          <div id={'보유능력'}>
            <h2>보유 능력</h2>
            <div ref={holdingCapacityRef} className={styles.ref}></div>
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '보유 능력')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '보유 능력' &&
                    openAbleList[v.type] &&
                    openAbleList[v.type][i]
                  ) {
                    return (
                      <ProfileEditItem
                        key={i}
                        data={v}
                        idx={i}
                        onClickEditIcon={onClickEditIcon}
                        onClickDeleteIcon={onClickDeleteIcon}
                      ></ProfileEditItem>
                    );
                  }
                })}
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '보유 능력')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '보유 능력' &&
                    openAbleList[v.type] &&
                    !openAbleList[v.type][i] &&
                    !editModeList[v.type][0]
                  ) {
                    return (
                      <Editor
                        data={v}
                        idx={i}
                        type={v.type}
                        openAbleList={openAbleList}
                        setOpenAbleList={setOpenAbleList}
                        userData={userData}
                        setUserData={setUserData}
                        editModeList={null}
                        setEditModeList={null}
                        key={i}
                      />
                    );
                  }
                })}
            {editModeList['보유 능력'] && editModeList['보유 능력'][0] ? (
              <Editor
                data={null}
                type={'보유 능력'}
                idx={
                  userData.informations.filter(
                    (v: profileContent) => v.type === '보유 능력',
                  ).length
                }
                openAbleList={openAbleList}
                setOpenAbleList={setOpenAbleList}
                userData={userData}
                setUserData={setUserData}
                editModeList={editModeList}
                setEditModeList={setEditModeList}
              />
            ) : null}
            <div
              className={styles.addItem}
              onClick={() => onClickEditText('보유 능력')}
            >
              + 보유 능력 추가 <div></div>
            </div>
          </div>
          <div id={'학력'}>
            <h2>학력</h2>
            <div ref={educationRef} className={styles.ref}></div>
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '학력')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '학력' &&
                    openAbleList[v.type] &&
                    openAbleList[v.type][i]
                  ) {
                    return (
                      <ProfileEditItem
                        key={i}
                        data={v}
                        idx={i}
                        onClickEditIcon={onClickEditIcon}
                        onClickDeleteIcon={onClickDeleteIcon}
                      ></ProfileEditItem>
                    );
                  }
                })}
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '학력')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '학력' &&
                    openAbleList[v.type] &&
                    !openAbleList[v.type][i] &&
                    !editModeList[v.type][0]
                  ) {
                    return (
                      <Editor
                        data={v}
                        idx={i}
                        type={v.type}
                        openAbleList={openAbleList}
                        setOpenAbleList={setOpenAbleList}
                        userData={userData}
                        setUserData={setUserData}
                        editModeList={null}
                        setEditModeList={null}
                        key={i}
                      />
                    );
                  }
                })}
            {editModeList['학력'] && editModeList['학력'][0] ? (
              <Editor
                data={null}
                type={'학력'}
                idx={
                  userData.informations.filter(
                    (v: profileContent) => v.type === '학력',
                  ).length
                }
                openAbleList={openAbleList}
                setOpenAbleList={setOpenAbleList}
                userData={userData}
                setUserData={setUserData}
                editModeList={editModeList}
                setEditModeList={setEditModeList}
              />
            ) : null}
            <div
              className={styles.addItem}
              onClick={() => onClickEditText('학력')}
            >
              + 학력 추가 <div></div>
            </div>
          </div>
          <div id={'수상'}>
            <h2>수상</h2>
            <div ref={awardsRef} className={styles.ref}></div>
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '수상')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '수상' &&
                    openAbleList[v.type] &&
                    openAbleList[v.type][i]
                  ) {
                    return (
                      <ProfileEditItem
                        key={i}
                        data={v}
                        idx={i}
                        onClickEditIcon={onClickEditIcon}
                        onClickDeleteIcon={onClickDeleteIcon}
                      ></ProfileEditItem>
                    );
                  }
                })}
            {userData &&
              userData.informations
                .filter((v: profileContent) => v.type === '수상')
                .map((v: profileContent, i) => {
                  if (
                    v.type === '수상' &&
                    openAbleList[v.type] &&
                    !openAbleList[v.type][i] &&
                    !editModeList[v.type][0]
                  ) {
                    return (
                      <Editor
                        data={v}
                        idx={i}
                        type={v.type}
                        openAbleList={openAbleList}
                        setOpenAbleList={setOpenAbleList}
                        userData={userData}
                        setUserData={setUserData}
                        editModeList={null}
                        setEditModeList={null}
                        key={i}
                      />
                    );
                  }
                })}
            {editModeList['수상'] && editModeList['수상'][0] ? (
              <Editor
                data={null}
                type={'수상'}
                idx={
                  userData.informations.filter(
                    (v: profileContent) => v.type === '수상',
                  ).length
                }
                openAbleList={openAbleList}
                setOpenAbleList={setOpenAbleList}
                userData={userData}
                setUserData={setUserData}
                editModeList={editModeList}
                setEditModeList={setEditModeList}
              />
            ) : null}
            <div
              className={styles.addItem}
              onClick={() => onClickEditText('수상')}
            >
              + 수상 추가 <div></div>
            </div>
          </div>
          <div id={'채널'}>
            <h2 style={{ marginBottom: 28 }}>채널</h2>
            <div ref={channelRef} className={styles.ref}></div>
            {userData && (
              <>
                <SNS
                  data={userData.profiles[0].instagramUrl}
                  onClickLinkSave={onClickLinkSave}
                  type={'instagramUrl'}
                />
                <SNS
                  data={userData.profiles[0].youtubeUrl}
                  onClickLinkSave={onClickLinkSave}
                  type={'youtubeUrl'}
                ></SNS>
                <SNS
                  data={userData.profiles[0].facebookUrl}
                  onClickLinkSave={onClickLinkSave}
                  type={'facebookUrl'}
                ></SNS>
                <SNS
                  data={userData.profiles[0].tweeterUrl}
                  onClickLinkSave={onClickLinkSave}
                  type={'tweeterUrl'}
                ></SNS>
                <SNS
                  data={userData.profiles[0].etcUrl}
                  onClickLinkSave={onClickLinkSave}
                  type={'etcUrl'}
                ></SNS>
              </>
            )}
          </div>
        </div>
        <div className={styles.editRightWrapper}>
          <ul style={{ padding: 0 }}>
            {profileRightMenu.map((v, i) => {
              return (
                <li
                  key={i}
                  className={i === selectedMenu ? styles.selectedMenu : ''}
                  onClick={() => {
                    refList[i].current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  <span>{v}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Edit;

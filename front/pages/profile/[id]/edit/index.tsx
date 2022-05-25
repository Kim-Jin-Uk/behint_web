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
  userData,
} from '../../../../reducers';
import ProfileEditItem from '../../../../components/ProfileEditItem';
import Editor from '../../../../components/ProfileEditItem/editor';
import { useDispatch, useSelector } from 'react-redux';
import { IS_LOGIN_REQUEST } from '../../../../reducers/user';
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

  const [userData, setUserData] = useState({
    introduce:
      '근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 모든 국민은 ',
    information: [
      {
        title: '쿠팡',
        startDate: new Date('2021-08'),
        endDate: null,
        position: 'Senior UX Researcher',
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title: '42dot',
        startDate: new Date('2019-11'),
        endDate: new Date('2021-07'),
        position: 'Experience Designer',
        detailContents: '세부 내용',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title:
          'SK telecomSK telecomSK telecomSK telecomSK telecomSK telecomSK telecomSK telecom',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position:
          '서비스 디자이너서비스 디자이너서비스 디자이너서비스 디자이너서비스 디자이너서비스 디자이너서비스 디자이너',
        detailContents:
          '세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용세부 내용',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title: '쿠팡',
        startDate: new Date('2021-08'),
        endDate: null,
        position: 'Senior UX Researcher',
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title: '42dot',
        startDate: new Date('2019-11'),
        endDate: new Date('2021-07'),
        position: 'Experience Designer',
        detailContents: '세부 내용',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title: 'SK telecom',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: '서비스 디자이너',
        detailContents: '세부 내용',
        informationUrl: null,
        type: '근무 경험',
      },
      {
        title: '4월 2일(토) Tiktok bussiness summint 2022 open!',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: 'title',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: 'title',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'contents',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: '4월 2일(토) Tiktok bussiness summint 2022 open!',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: 'title',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!오후 2시에 틱톡 비즈니스 서밋이 진행됩니다.  참고로 JAY PARK 도 참여합니다!',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: 'title',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'contents',
        informationUrl: 'https://www.notion.so',
        type: '콘텐츠 제작',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: '애프터이펙트',
        startDate: null,
        endDate: null,
        position: null,
        detailContents:
          '베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작베타서비스 런칭을 위한 BI 제작, 모바일 웹 디자인 설계(I.A/User Flow), 스타일 가이드 및 프로토타입 제작',
        informationUrl: null,
        type: '보유 능력',
      },
      {
        title: 'OO 대학교',
        startDate: new Date('2017-03'),
        endDate: null,
        position: null,
        detailContents:
          'OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과OO 학과',
        informationUrl: null,
        type: '학력',
      },
      {
        title:
          'OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교OO 고등학교',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: null,
        informationUrl: null,
        type: '학력',
      },
      {
        title: 'OO 중학교',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: null,
        informationUrl: null,
        type: '학력',
      },
      {
        title: 'OO 초등학교',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: null,
        informationUrl: null,
        type: '학력',
      },
      {
        title: 'OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: '장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title:
          'OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents:
          '장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title: 'OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: '장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title:
          'OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents:
          '장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title: 'OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents: '장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title:
          'OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회OO 대회',
        startDate: new Date('2016-12'),
        endDate: new Date('2019-03'),
        position: null,
        detailContents:
          '장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상장려상',
        informationUrl: null,
        type: '수상',
      },
      {
        title: 'brmn station',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'youtube',
        informationUrl: 'https://brmnmusic.com/',
        type: '채널',
      },
      {
        title: 'brmn station',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'insta',
        informationUrl: 'https://brmnmusic.com/',
        type: '채널',
      },
      {
        title: 'brmn station',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'facebook',
        informationUrl: 'https://brmnmusic.com/',
        type: '채널',
      },
      {
        title: 'brmn station',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'twitter',
        informationUrl: 'https://brmnmusic.com/',
        type: '채널',
      },
      {
        title: 'brmn station',
        startDate: null,
        endDate: null,
        position: null,
        detailContents: 'link',
        informationUrl: 'https://brmnmusic.com/',
        type: '채널',
      },
    ],
  } as userData);

  const [openAbleList, setOpenAbleList] = useState({} as openListOptions);

  const [editModeList, setEditModeList] = useState({} as openListOptions);

  const { me } = useSelector((state: RootState) => state.user);

  const [name, onChangeName, setName] = useInput('') as inputType;

  const [position, onChangePosition, setPosition] = useInput('') as inputType;

  const [location, onChangeLocation, setLocation] = useInput('') as inputType;

  const [introduce, onChangeIntroduce, setIntroduce] = useTextArea(
    '',
  ) as textareaType;

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
      setName(me.userProfile ? me.userProfile.nickname : me.email);
      setPosition(me.userProfile ? me.userProfile.position : '');
      setLocation(me.userProfile ? me.userProfile.location : '');
    }
  }, [me]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  useEffect(() => {
    const openList: openListOptions = {};
    userData.information.map((v: profileContent) => {
      openList[v.type] = (openList[v.type] || []).concat([true]);
    });
    const editList: openListOptions = {};
    for (const i in openList) {
      editList[i] = [false];
    }
    setOpenAbleList(openList);
    setEditModeList(editList);
  }, []);

  useEffect(() => {
    setIntroduce(userData.introduce);
  }, [userData]);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, [introduce]);

  useEffect(() => {
    setSelectedMenu(activeId);
  }, [activeId]);

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
      for (let i = 0; i < userData.information.length; i++) {
        if (userData.information[i].type === type) {
          if (index === idx) {
            userData.information.splice(i, 1);
            setUserData({ ...userData });
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
    (url: string, idx: number) => {
      let index = 0;
      for (let i = 0; i < userData.information.length; i++) {
        if (userData.information[i].type === '채널') {
          if (index === idx) {
            userData.information[i].informationUrl = url;
            setUserData({ ...userData });
            break;
          } else {
            index++;
          }
        }
      }
    },
    [userData],
  );

  return (
    <>
      <Header></Header>
      <div className={styles.editTop}>
        <button className={styles.backButton}></button>
        <button className={styles.saveButton}>저장</button>
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
                value={position}
                onChange={onChangePosition}
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
            {userData.information
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
            {userData.information
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
                  userData.information.filter(
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
            {userData.information
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
            {userData.information
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
                  userData.information.filter(
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
            {userData.information
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
            {userData.information
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
                  userData.information.filter(
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
            {userData.information
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
            {userData.information
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
                  userData.information.filter(
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
            {userData.information
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
            {userData.information
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
                  userData.information.filter(
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
            {userData.information
              .filter((v: profileContent) => v.type === '채널')
              .map((v: profileContent, i) => {
                if (
                  v.type === '채널' &&
                  openAbleList[v.type] &&
                  openAbleList[v.type][i]
                ) {
                  return (
                    <SNS
                      data={v}
                      key={i}
                      onClickLinkSave={onClickLinkSave}
                      idx={i}
                    ></SNS>
                  );
                }
              })}
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

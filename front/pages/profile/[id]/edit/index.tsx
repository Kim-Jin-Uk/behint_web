import Header from '../../../../components/Header';
import styles from './style.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import autosize from 'autosize';
import { profileContent } from '../../../../reducers';
import ProfileEditItem from '../../../../components/ProfileEditItem';
import Editor from '../../../../components/ProfileEditItem/editor';

type openListOptions = {
  [key: string]: boolean[];
};

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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const userData = {
    introduce:
      '근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 신체장애자 및 질병·노령 기타의  근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가유공자·상이군경 및 전몰군경의 유가족은 법률이 정하는 바에 의하여 우선적으로 근로의 기회를 부여받는다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다. 신체장애자 및 질병·노령 기타의 사유…',
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
  };

  const [openAbleList, setOpenAbleList] = useState({} as openListOptions);

  useEffect(() => {
    if (textAreaRef.current) {
      autosize(textAreaRef.current);
    }
  }, []);

  useEffect(() => {
    const openList: openListOptions = {};
    userData.information.map((v: profileContent, i) => {
      openList[v.type] = (openList[v.type] || []).concat([true]);
    });
    setOpenAbleList(openList);
  }, []);

  const onClickEditIcon = useCallback(
    (type: string, idx: number) => {
      if (!openAbleList[type]) return;
      if (!openAbleList[type][idx]) return;
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
    [openAbleList],
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
          <div></div>
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
              <input type="text" placeholder={'이름'} maxLength={20} />

              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>직업</h3>
                <span>(0/20)</span>
              </div>
              <input type="text" placeholder={'직업'} maxLength={20} />

              <div style={{ height: 18, marginBottom: 8 }}>
                <h3>위치</h3>
              </div>
              <input type="text" placeholder={'위치'} maxLength={60} />
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
                value={userData.introduce}
              />
            </div>
          </div>
          <div id={'근무경험'}>
            <h2>근무 경험</h2>
            <div ref={workExperienceRef} className={styles.ref}></div>
            {userData.information.map((v: profileContent, i) => {
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
                  ></ProfileEditItem>
                );
              }
            })}
            {userData.information.map((v: profileContent, i) => {
              if (
                v.type === '근무 경험' &&
                openAbleList[v.type] &&
                !openAbleList[v.type][i]
              ) {
                return <Editor data={v}></Editor>;
              }
            })}
          </div>
          <div id={'콘텐츠제작'}>
            <h2>콘텐츠 제작</h2>
            <div ref={contentCreationRef} className={styles.ref}></div>
          </div>
          <div id={'보유능력'}>
            <h2>보유 능력</h2>
            <div ref={holdingCapacityRef} className={styles.ref}></div>
          </div>
          <div id={'학력'}>
            <h2>학력</h2>
            <div ref={educationRef} className={styles.ref}></div>
          </div>
          <div id={'수상'}>
            <h2>수상</h2>
            <div ref={awardsRef} className={styles.ref}></div>
          </div>
          <div id={'채널'}>
            <h2>채널</h2>
            <div ref={channelRef} className={styles.ref}></div>
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

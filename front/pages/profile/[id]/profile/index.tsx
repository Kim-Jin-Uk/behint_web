import ProfileWrapper from '../../../../components/ProfileWrapper';
import Header from '../../../../components/Header';
import styles from './style.module.scss';
import { useCallback, useState } from 'react';
import { profileContent } from '../../../../reducers';
import ProfileContents from '../../../../components/ProfileContents';
import ProfileSns from '../../../../components/ProfileSns';

interface openAbleObject {
  [key: string]: boolean;
}

const Profile = () => {
  const profileRightMenu = [
    '자기 소개',
    '근무 경험',
    '콘텐츠 제작',
    '보유 능력',
    '학력',
    '수상',
    '채널',
  ];
  const [selectedMenu, setSelectedMenu] = useState(0);
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
  const [openableObject, setOpenableObject] = useState({
    '자기 소개': true,
    '근무 경험': true,
    '콘텐츠 제작': true,
    '보유 능력': true,
    학력: true,
    수상: true,
  } as openAbleObject);

  const onClickMoreButton = useCallback(
    (key: string) => {
      const openableObjectCopy = { ...openableObject };
      openableObjectCopy[key] = !openableObjectCopy[key];
      setOpenableObject(openableObjectCopy);
    },
    [openableObject],
  );

  return (
    <>
      <Header></Header>
      <ProfileWrapper type={'profile'}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileLeftWrapper}>
            <div id={'자기 소개'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>자기 소개</div>
              <div className={styles.profileDetailWrapper}>
                {openableObject['자기 소개'] ? (
                  <div className={styles.profileContents}>
                    {userData.introduce}
                  </div>
                ) : (
                  <div className={styles.profileContentsOpened}>
                    {userData.introduce}
                  </div>
                )}
                {openableObject['자기 소개'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('자기 소개');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('자기 소개');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div id={'근무 경험'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>근무 경험</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '근무 경험') {
                    return <ProfileContents key={i} data={v}></ProfileContents>;
                  }
                })}
                {openableObject['근무 경험'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('근무 경험');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('근무 경험');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div id={'콘텐츠 제작'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>콘텐츠 제작</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '콘텐츠 제작') {
                    return <ProfileContents key={i} data={v}></ProfileContents>;
                  }
                })}
                {openableObject['콘텐츠 제작'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('콘텐츠 제작');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('콘텐츠 제작');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div id={'보유 능력'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>보유 능력</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '보유 능력') {
                    return <ProfileContents key={i} data={v}></ProfileContents>;
                  }
                })}
                {openableObject['보유 능력'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('보유 능력');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('보유 능력');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div id={'학력'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>학력</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '학력') {
                    return <ProfileContents key={i} data={v}></ProfileContents>;
                  }
                })}
                {openableObject['학력'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('학력');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('학력');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div id={'수상'} className={styles.profileContentsWrapper}>
              <div className={styles.profileTitle}>수상</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '수상') {
                    return <ProfileContents key={i} data={v}></ProfileContents>;
                  }
                })}
                {openableObject['수상'] ? (
                  <div
                    onClick={() => {
                      onClickMoreButton('수상');
                    }}
                    className={styles.moreButton}
                  >
                    더보기 <div className={styles.moreButtonIcon}></div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      onClickMoreButton('수상');
                    }}
                    className={styles.moreButton}
                  >
                    접기 <div className={styles.shortButtonIcon}></div>
                  </div>
                )}
              </div>
            </div>
            <div
              id={'채널'}
              className={styles.profileContentsWrapper}
              style={{ border: 'none', paddingBottom: 0 }}
            >
              <div className={styles.profileTitle}>채널</div>
              <div className={styles.profileDetailWrapper}>
                {userData.information.map((v: profileContent, i) => {
                  if (v.type === '채널') {
                    return <ProfileSns key={i} data={v}></ProfileSns>;
                  }
                })}
              </div>
            </div>
          </div>
          <ul className={styles.profileRightWrapper}>
            {profileRightMenu.map((v, i) => {
              return (
                <li
                  key={i}
                  className={i === selectedMenu ? styles.selectedMenu : ''}
                >
                  <span>{v}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default Profile;

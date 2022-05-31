import ProfileWrapper from '../../../../components/ProfileWrapper';
import Header from '../../../../components/Header';
import styles from './style.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profileContent, RootState } from '../../../../reducers';
import ProfileContents from '../../../../components/ProfileContents';
import ProfileSns from '../../../../components/ProfileSns';
import useIntersectionObservation from '../../../../hooks/useIntersectionObservation';
import { useDispatch, useSelector } from 'react-redux';
import {
  IS_LOGIN_REQUEST,
  OTHER_PROFILE_REQUEST,
} from '../../../../reducers/user';
import { useRouter } from 'next/router';

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
  const [openableObject, setOpenableObject] = useState({
    '자기 소개': true,
    '근무 경험': true,
    '콘텐츠 제작': true,
    '보유 능력': true,
    학력: true,
    수상: true,
  } as openAbleObject);
  const [activeId, setActiveId] = useState(0);
  useIntersectionObservation(setActiveId);

  const router = useRouter();
  const { id } = router.query;
  const { user, me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  let workExperienceLength = 0;
  let contentCreationLength = 0;
  let holdingCapacityLength = 0;
  let educationLength = 0;
  let awardsLength = 0;

  let workExperienceCount = 0;
  let contentCreationCount = 0;
  let holdingCapacityCount = 0;
  let educationCount = 0;
  let awardsCount = 0;
  const introduceRef = useRef<HTMLDivElement>(null);
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const contentCreationRef = useRef<HTMLDivElement>(null);
  const holdingCapacityRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [introduceOpen, setIntroduceOpen] = useState(false);

  const refList = [
    introduceRef,
    workExperienceRef,
    contentCreationRef,
    holdingCapacityRef,
    educationRef,
    awardsRef,
    channelRef,
  ];

  const onClickMoreButton = useCallback(
    (key: string) => {
      const openableObjectCopy = { ...openableObject };
      openableObjectCopy[key] = !openableObjectCopy[key];
      setOpenableObject(openableObjectCopy);
    },
    [openableObject],
  );

  useEffect(() => {
    setSelectedMenu(activeId);
  }, [activeId]);

  useEffect(() => {
    dispatch({
      type: OTHER_PROFILE_REQUEST,
      data: id,
    });
    dispatch({
      type: IS_LOGIN_REQUEST,
    });
  }, [id]);

  useEffect(() => {
    if (user) {
      const length = [0, 0, 0, 0, 0];
      user.informations.map((v: profileContent) => {
        switch (v.type) {
          case '근무 경험':
            length[0]++;
            break;
          case '콘텐츠 제작':
            length[1]++;
            break;
          case '보유 능력':
            length[2]++;
            break;
          case '학력':
            length[3]++;
            break;
          case '수상':
            length[4]++;
            break;
          default:
            break;
        }
        workExperienceLength = length[0];
        contentCreationLength = length[1];
        holdingCapacityLength = length[2];
        educationLength = length[3];
        awardsLength = length[4];
      });
    }
  }, [user]);

  //window 에 resize 함수 달아주기
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  //초기값 설정
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const height = document.getElementById('textChecker')!.clientHeight;
    if (width > 1152) {
      height > 120 ? setIntroduceOpen(true) : setIntroduceOpen(false);
    } else if (width > 1024) {
      height > 72 ? setIntroduceOpen(true) : setIntroduceOpen(false);
    } else if (width > 768) {
      height > 63 ? setIntroduceOpen(true) : setIntroduceOpen(false);
    } else {
      height > 126 ? setIntroduceOpen(true) : setIntroduceOpen(false);
    }
    console.log('height', height);
  }, [user, width]);

  return (
    <div id={'profile-body'}>
      <Header></Header>
      <ProfileWrapper type={'profile'}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileLeftWrapper}>
            <div id={'자기소개'} className={styles.profileContentsWrapper}>
              <div ref={introduceRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>자기 소개</div>
              <div className={styles.profileDetailWrapper}>
                <pre id={'textChecker'} className={styles.textChecker}>
                  {user && user.profiles ? user.profiles[0].introduce : ''}
                </pre>
                {openableObject['자기 소개'] ? (
                  <pre className={styles.profileContents}>
                    {user && user.profiles ? user.profiles[0].introduce : ''}
                  </pre>
                ) : (
                  <pre className={styles.profileContentsOpened}>
                    {user && user.profiles ? user.profiles[0].introduce : ''}
                  </pre>
                )}
                {introduceOpen ? (
                  openableObject['자기 소개'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div id={'근무경험'} className={styles.profileContentsWrapper}>
              <div ref={workExperienceRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>근무 경험</div>
              <div className={styles.profileDetailWrapper}>
                {user &&
                  user.informations.map((v: profileContent, i: number) => {
                    if (
                      v.type === '근무 경험' &&
                      workExperienceCount <
                        (openableObject['근무 경험'] ? 3 : Number.MAX_VALUE)
                    ) {
                      workExperienceCount++;
                      return (
                        <ProfileContents key={i} data={v}></ProfileContents>
                      );
                    }
                  })}
                {workExperienceLength > 3 ? (
                  openableObject['근무 경험'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div id={'콘텐츠제작'} className={styles.profileContentsWrapper}>
              <div ref={contentCreationRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>콘텐츠 제작</div>
              <div className={styles.profileDetailWrapper}>
                {user &&
                  user.informations.map((v: profileContent, i: number) => {
                    if (
                      v.type === '콘텐츠 제작' &&
                      contentCreationCount <
                        (openableObject['콘텐츠 제작'] ? 3 : Number.MAX_VALUE)
                    ) {
                      contentCreationCount++;
                      return (
                        <ProfileContents key={i} data={v}></ProfileContents>
                      );
                    }
                  })}
                {contentCreationLength > 3 ? (
                  openableObject['콘텐츠 제작'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div id={'보유능력'} className={styles.profileContentsWrapper}>
              <div ref={holdingCapacityRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>보유 능력</div>
              <div className={styles.profileDetailWrapper}>
                {user &&
                  user.informations.map((v: profileContent, i: number) => {
                    if (
                      v.type === '보유 능력' &&
                      holdingCapacityCount <
                        (openableObject['보유 능력'] ? 3 : Number.MAX_VALUE)
                    ) {
                      holdingCapacityCount++;
                      return (
                        <ProfileContents key={i} data={v}></ProfileContents>
                      );
                    }
                  })}
                {holdingCapacityLength > 3 ? (
                  openableObject['보유 능력'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div id={'학력'} className={styles.profileContentsWrapper}>
              <div ref={educationRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>학력</div>
              <div className={styles.profileDetailWrapper}>
                {user &&
                  user.informations.map((v: profileContent, i: number) => {
                    if (
                      v.type === '학력' &&
                      educationCount <
                        (openableObject['학력'] ? 3 : Number.MAX_VALUE)
                    ) {
                      educationCount++;
                      return (
                        <ProfileContents key={i} data={v}></ProfileContents>
                      );
                    }
                  })}
                {educationLength > 3 ? (
                  openableObject['학력'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div id={'수상'} className={styles.profileContentsWrapper}>
              <div ref={awardsRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>수상</div>
              <div className={styles.profileDetailWrapper}>
                {user &&
                  user.informations.map((v: profileContent, i: number) => {
                    if (
                      v.type === '수상' &&
                      awardsCount <
                        (openableObject['수상'] ? 3 : Number.MAX_VALUE)
                    ) {
                      awardsCount++;
                      return (
                        <ProfileContents key={i} data={v}></ProfileContents>
                      );
                    }
                  })}
                {awardsLength > 3 ? (
                  openableObject['수상'] ? (
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
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              id={'채널'}
              className={styles.profileContentsWrapper}
              style={{ border: 'none', paddingBottom: 0 }}
            >
              <div ref={channelRef} className={styles.ref}></div>
              <div className={styles.profileTitle}>채널</div>
              <div className={styles.profileDetailWrapper}>
                <ProfileSns
                  url={user && user.profiles ? user.profiles[0].youtubeUrl : ''}
                  type={'youtube'}
                ></ProfileSns>
                <ProfileSns
                  url={
                    user && user.profiles ? user.profiles[0].instagramUrl : ''
                  }
                  type={'insta'}
                ></ProfileSns>
                <ProfileSns
                  url={
                    user && user.profiles ? user.profiles[0].facebookUrl : ''
                  }
                  type={'facebook'}
                ></ProfileSns>
                <ProfileSns
                  url={user && user.profiles ? user.profiles[0].tweeterUrl : ''}
                  type={'twitter'}
                ></ProfileSns>
                <ProfileSns
                  url={user && user.profiles ? user.profiles[0].etcUrl : ''}
                  type={'link'}
                ></ProfileSns>
              </div>
            </div>
          </div>
          <div className={styles.profileRightWrapper}>
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
      </ProfileWrapper>
    </div>
  );
};

export default Profile;

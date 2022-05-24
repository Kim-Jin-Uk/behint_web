import { useRouter } from 'next/router';
import ProfileWrapper from '../../../components/ProfileWrapper';
import Header from '../../../components/Header';
import styles from '../../../styles/Profile.module.scss';
import {
  commentaryItem,
  representativeProject,
  RootState,
} from '../../../reducers';
import RepresentativeProject from '../../../components/RepresentativeProject';
import Slider, { CustomArrowProps } from 'react-slick';
import CommentaryItem from '../../../components/CommentaryItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OTHER_PROFILE_REQUEST } from '../../../reducers/user';

function SampleNextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <div className={styles.nextArrow} onClick={onClick} />;
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <div className={styles.prevArrow} onClick={onClick} />;
}

const ProfileByEmail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, me } = useSelector((state: RootState) => state.user);
  const [width, setWidth] = useState(0);
  const [slideToShowNum, setSlideToShowNum] = useState(3);
  const projectList = [
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      position: '참여한역할',
      title:
        '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName:
        'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      position: '참여한역할',
      title: '[unBOXing] mong_gle(몽글)',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
    {
      thumbnailImgUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      position: '참여한역할',
      title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
      locationName: '식탁',
      userName: 'brmn',
      likeCount: 31,
      viewCount: 276,
    },
  ];
  const commentaryList = [
    {
      id: 1,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-05-06T03:24:00'),
      contents:
        '뮤직비디오에서 많이 쓰는 기법 중 하나이며 원테이크로 찍어야 해서 촬영자뮤직비디오에서 많이 쓰는 기법 중 하나이며 원테이크로 찍어야 해서 촬많이 쓰는 뮤직비디오에서 많이 쓰는 기법 중 하나이며 원테이크로 찍어야 해서 촬영자뮤직비디오에서 많이 쓰는 기법 중 하나이며 원테이크로 찍어야 해서 촬많이 쓰는 기법…',
    },
    {
      id: 2,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-04-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 3,
      title:
        '코멘터리 타이틀 코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀코멘터리 타이틀',
      createdAt: new Date('2022-05-04T03:24:00'),
      contents:
        '뮤직비디오에서 많이 쓰는 기법 중 하나이며 원테이크로 찍어야 해서 촬영자뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 4,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-04-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 5,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-03-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 6,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-02-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 7,
      title: '코멘터리 타이틀',
      createdAt: new Date('2022-01-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
    {
      id: 8,
      title: '코멘터리 타이틀',
      createdAt: new Date('2021-04-20T03:24:00'),
      contents: '뮤직비디오에서 많이 쓰는 기법',
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShowNum,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: OTHER_PROFILE_REQUEST,
      data: id,
    });
  }, [id]);

  //slide num 바꿔주기
  useEffect(() => {
    if (width) {
      if (width > 1024) {
        setSlideToShowNum(3);
      } else if (width > 768) {
        setSlideToShowNum(4);
      } else {
        setSlideToShowNum(3);
      }
    }
  }, [width]);

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

  return (
    <>
      <Header></Header>
      <ProfileWrapper type={'home'}>
        <div className={styles.profileBottomWrapper}>
          <div className={styles.profileBottomLeftWrapper}>
            <div className={styles.profileIntroTitle}>소개</div>
            <div className={styles.profileIntroContents}>
              소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글
            </div>
            <div className={styles.profileInfoCardWrapper}>
              <div>
                <div className={styles.profileInfoCardTitle}>프로젝트</div>
                <div className={styles.profileInfoCardNumber}>프로젝트 수</div>
              </div>
              <div>
                <div className={styles.profileInfoCardTitle}>팔로워</div>
                <div className={styles.profileInfoCardNumber}>팔로워 수</div>
              </div>
              <div>
                <div className={styles.profileInfoCardTitle}>팔로윙</div>
                <div className={styles.profileInfoCardNumber}>팔로윙 수</div>
              </div>
            </div>
            <div className={styles.profileJobWrapper}>
              <div>
                <div className={styles.profileJobIcon}></div>
                <div className={styles.profileJobBox}>
                  <div className={styles.profileJobContents}>
                    <b>
                      {user !== null
                        ? user.userProfile
                          ? user.userProfile.nickname
                          : user.email
                        : 'nickname'}
                    </b>
                    &nbsp;
                    디테일111111111111111111111111111111111111111111111111111
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.profileJobIcon}></div>
                <div className={styles.profileJobBox}>
                  <div className={styles.profileJobContents}>
                    <b>
                      {user !== null
                        ? user.userProfile
                          ? user.userProfile.nickname
                          : user.email
                        : 'nickname'}
                    </b>
                    &nbsp; 디테일2
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.profileJobIcon}></div>
                <div className={styles.profileJobBox}>
                  <div className={styles.profileJobContents}>
                    <b>
                      {user !== null
                        ? user.userProfile
                          ? user.userProfile.nickname
                          : user.email
                        : 'nickname'}
                    </b>
                    &nbsp; 디테일3 디테일3 디테일3 디테일3 디테일3 디테일3
                    디테일3 디테일3 디테일3 디테일3 디테일3 디테일3 디테일3
                    디테일3 디테일3 디테일3 디테일3 디테일3 디테일3 디테일3
                    디테일3 디테일3
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.profileSnsWrapper}>
              <div className={styles.youtube} />
              <div className={styles.insta} />
              <div className={styles.facebook} />
              <div className={styles.twitter} />
              <div className={styles.link} />
            </div>
            <div className={styles.profileShowAll}>
              프로필 전체 보기 {'>'} <div></div>
            </div>
          </div>
          <div className={styles.profileBottomRightWrapper}>
            <div className={styles.projectTopWrapper}>
              <div className={styles.profileIntroTitle}>대표프로젝트</div>
              <div className={styles.profileShowAll}>
                프로젝트 전체보기 {'>'} <div></div>
              </div>
            </div>
            <div className={styles.projectItemsWrapper}>
              {projectList.map((v: representativeProject) => {
                return (
                  <>
                    <RepresentativeProject projectItem={v} />
                  </>
                );
              })}
            </div>
            <div className={styles.profileIntroTitle}>최근 작성 코멘터리</div>
            <div className={styles.commentaryWrapper}>
              <Slider {...settings}>
                {commentaryList.map((v: commentaryItem) => {
                  return (
                    <>
                      <CommentaryItem commentaryItem={v} />
                    </>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default ProfileByEmail;

import { useRouter } from 'next/router';
import styles from './style.module.scss';
import ProfileThumbnail from '../ProfileThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { useEffect } from 'react';
import { OTHER_PROFILE_REQUEST } from '../../reducers/user';
import Link from 'next/link';

const ProfileWrapper = (props: { type: string }) => {
  const router = useRouter();
  const { id } = router.query;
  const { user, me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: OTHER_PROFILE_REQUEST,
      data: id,
    });
  }, [id]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className={styles.profileTopHeader}>
        <div className={styles.profileTopWrapper}>
          <div className={styles.userBasicInfo}>
            <ProfileThumbnail
              borderRadius={40}
              size={80}
              image={
                user !== null && user.userProfile
                  ? user.userProfile.profileImgUrl
                  : 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
              }
              onClick={() => {
                console.log('click');
              }}
            ></ProfileThumbnail>
            <div className={styles.userBasicInfoWrapper}>
              <div className={styles.nickname}>
                {user !== null
                  ? user.userProfile
                    ? user.userProfile.nickname
                    : user.email
                  : 'nickname'}
              </div>
              <div className={styles.userBasicInfoBottom}>
                <div className={styles.userBasicInfoBottomText}>
                  {user !== null
                    ? user.userProfile
                      ? user.userProfile.job
                      : '직업'
                    : '직업'}
                </div>
                <div className={styles.division}></div>
                <div className={styles.locationIcon}></div>
                <div className={styles.userBasicInfoBottomText}>
                  {user !== null
                    ? user.userProfile
                      ? user.userProfile.location
                      : '지역'
                    : '지역'}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <div className={styles.messageButton}>
              <div></div>
              <span>협업 제안</span>
            </div>
            {user !== null &&
            me !== null &&
            user.Followers &&
            user.Followers.includes(me.id) ? (
              <div className={styles.followingButton}>
                <div></div>
                <span>팔로잉</span>
              </div>
            ) : (
              <div className={styles.followButton}>
                <div></div>
                <span>팔로우</span>
              </div>
            )}
          </div>
          <div className={styles.linkWrapper}>
            <Link href={`${id}`}>
              <a
                style={{ width: 70 }}
                className={
                  props.type === 'home'
                    ? styles.pageLinkSelect
                    : styles.pageLink
                }
              >
                <span>홈</span>
                <div></div>
              </a>
            </Link>
            <Link href={`${id}/profile`}>
              <a
                style={{ width: 98 }}
                className={
                  props.type === 'profile'
                    ? styles.pageLinkSelect
                    : styles.pageLink
                }
              >
                <span>프로필</span>
                <div></div>
              </a>
            </Link>
            <Link href={`${id}/project`}>
              <a
                style={{ width: 112 }}
                className={
                  props.type === 'project'
                    ? styles.pageLinkSelect
                    : styles.pageLink
                }
              >
                <span>프로젝트</span>
                <div></div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.profileBottomWrapper}>
        <div className={styles.profileBottomLeftWrapper}>
          <div>소개</div>
          <div>소개글</div>
          <div>
            <div>
              <div>프로젝트</div>
              <div>프로젝트 수</div>
            </div>
            <div>
              <div>팔로워</div>
              <div>팔로워 수</div>
            </div>
            <div>
              <div>팔로윙</div>
              <div>팔로윙 수</div>
            </div>
          </div>
          <div>
            <div>디테일1</div>
            <div>디테일2</div>
            <div>디테일3</div>
          </div>
          <div>
            <div>유튜브</div>
            <div>인스타</div>
            <div>페북</div>
            <div>트윗</div>
            <div>기타</div>
          </div>
          <div>전체보기</div>
        </div>
        <div className={styles.profileBottomRightWrapper}>
          <div>
            <div>대표프로젝트</div>
            <div>프로젝트 전체보기</div>
          </div>
          <div>
            <div>프로젝트 아이템1</div>
            <div>프로젝트 아이템2</div>
            <div>프로젝트 아이템3</div>
          </div>
          <div>최근 작성 코멘터리</div>
          <div>
            <div>코멘터리 1</div>
            <div>코멘터리 2</div>
            <div>코멘터리 3</div>
            <div>코멘터리 ...</div>
          </div>
        </div>
      </div>
      <div>{id}</div>
    </>
  );
};

export default ProfileWrapper;

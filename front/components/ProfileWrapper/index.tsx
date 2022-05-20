import { useRouter } from 'next/router';
import styles from './style.module.scss';
import ProfileThumbnail from '../ProfileThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import React, { useCallback, useEffect, useState } from 'react';
import { OTHER_PROFILE_REQUEST } from '../../reducers/user';
import Link from 'next/link';

const ProfileWrapper = (props: { type: string; children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = router.query;
  const { user, me } = useSelector((state: RootState) => state.user);
  const [isMe, setIsMe] = useState(true);
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

  const onClickButton = useCallback(
    (key: string) => {
      router.push(`/profile/${id}/${key}`);
    },
    [id],
  );

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
            {isMe ? (
              <>
                <div className={styles.messageButton}>
                  <div>
                    <div className={styles.projectManagement}></div>
                    <span>프로젝트 관리</span>
                  </div>
                </div>
                <div
                  className={styles.followButton}
                  onClick={() => onClickButton('edit')}
                >
                  <div>
                    <div className={styles.profileEdit}></div>
                    <span>프로필 편집</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.messageButton}>
                  <div>
                    <div></div>
                    <span>협업 제안</span>
                  </div>
                </div>
                {user !== null &&
                me !== null &&
                user.Followers &&
                user.Followers.includes(me.id) ? (
                  <div className={styles.followingButton}>
                    <div>
                      <div></div>
                      <span>팔로잉</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.followButton}>
                    <div>
                      <div></div>
                      <span>팔로우</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.linkWrapper}>
            <Link href={`/profile/${id}`}>
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
            <Link href={`/profile/${id}/profile`}>
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
            <Link href={`/profile/${id}/project`}>
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
            {isMe && (
              <Link href={`/profile/${id}/scrap`}>
                <a
                  style={{ width: 112 }}
                  className={
                    props.type === 'scrap'
                      ? styles.pageLinkSelect
                      : styles.pageLink
                  }
                >
                  <span>스크랩</span>
                  <div></div>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      {props.children}
    </>
  );
};

export default ProfileWrapper;

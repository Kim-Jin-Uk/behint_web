import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import ProfileThumbnail from '../ProfileThumbnail';
import Footer from '../Footer';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { IS_LOGIN_REQUEST } from '../../reducers/user';

const Header: FC = () => {
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [profileIconUrl, setProfileIconUrl] = useState(
    'https://avatars.githubusercontent.com/u/76549646?v=4',
  );

  const onClickProfileIcon: MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      router.push(`/profile/${me.id}`);
    }, [me]);

  const onClickProjectUpload: MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      router.push(`/project/upload`);
    }, []);

  //user 로그인 확인
  useEffect(() => {
    dispatch({
      type: IS_LOGIN_REQUEST,
    });
  }, []);

  return (
    <>
      <div className={styles.background}>
        {/*1024px 초과*/}
        <Link href={'/useinfo'}>
          <a className={styles.pageLink}>
            이용안내
            <div></div>
          </a>
        </Link>
        <Link href={'/'}>
          <a className={styles.pageLink}>
            프로젝트
            <div></div>
          </a>
        </Link>
        <div className={styles.input_wrapper}>
          <input type="text" placeholder={'키워드를 검색해보세요!'} />
          <div></div>
        </div>
        {me ? (
          <div className={styles.loginButtonWrapper}>
            <div
              className={styles.projectUploadButton}
              onClick={onClickProjectUpload}
            >
              프로젝트 업로드
            </div>
            <div className={styles.alarmButton}></div>
            <div className={styles.messageButton}></div>
            <div
              className={styles.profileImageButton}
              onClick={onClickProfileIcon}
              style={{
                backgroundImage: "url('" + profileIconUrl + "')",
              }}
            ></div>
          </div>
        ) : (
          <div
            className={styles.loginButton}
            onClick={() => router.push('/signin/login')}
          >
            로그인
          </div>
        )}

        {/*1024px 이하*/}
        <div className={styles.profileIcon}>
          <ProfileThumbnail
            image={profileIconUrl}
            size={32}
            borderRadius={0}
            onClick={onClickProfileIcon}
          ></ProfileThumbnail>
        </div>
        <div className={styles.menu}></div>
        <div className={styles.alarm}></div>
        <div className={styles.chat}></div>
        <div className={styles.search}></div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Header;

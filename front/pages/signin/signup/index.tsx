import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import image_logo from '../../../images/logo.svg';
import styles from '../../../styles/Sign.module.scss';
import SignWrapper from '../../../components/SignWrapper';
import Router from 'next/router';

const SignUp = memo(() => {
  return (
    <>
      <SignWrapper>
        <Image src={image_logo} />
        <div className={styles.b24} style={{ marginTop: 20 }}>
          계정 만들기
        </div>
        <div className={styles.n13} style={{ marginTop: 8 }}>
          이미 계정이 있으십니까?&nbsp;
          <Link href="/signin/login">
            <a className={styles.signin}>
              <span className={styles.main_dark} style={{ marginLeft: 5 }}>
                로그인
              </span>
            </a>
          </Link>
        </div>

        <div style={{ marginTop: '52px' }}>
          <div
            onClick={() => Router.replace(`http://localhost:3095/auth/naver`)}
            className={styles.naver_btn}
          >
            <div className={styles.naver_icon}></div>
            <div style={{ marginTop: '1px' }}>네이버 아이디로 가입</div>
          </div>
          <div
            onClick={() => Router.replace(`http://localhost:3095/auth/kakao`)}
            style={{
              paddingLeft: 'calc(50% - 93.5px)',
              paddingRight: 'calc(50% - 93.5px)',
            }}
            className={styles.kakao_btn}
          >
            <div className={styles.kakao_icon}></div>
            <div style={{ marginTop: '1px' }}>카카오 계정으로 가입</div>
          </div>
        </div>
      </SignWrapper>
    </>
  );
});

export default SignUp;

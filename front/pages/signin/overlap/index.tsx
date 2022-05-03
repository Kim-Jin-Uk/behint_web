import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import image_logo from '../../../images/logo.svg';
import styles from '../../../styles/Sign.module.scss';
import SignWrapper from '../../../components/SignWrapper';

const Overlap = () => {
  return (
    <>
      <SignWrapper>
        <Image src={image_logo} />
        <div className={styles.b24} style={{ marginTop: 20 }}>
          로그인
        </div>
        <div className={styles.n13} style={{ marginTop: 8 }}>
          신규 사용자이신가요?&nbsp;
          <Link href="/signin/signup">
            <a className={styles.signin}>
              <span className={styles.main_dark} style={{ marginLeft: 5 }}>
                계정 만들기
              </span>
            </a>
          </Link>
        </div>

        <div style={{ marginTop: '52px' }}>
          <div
            style={{
              paddingLeft: 'calc(50% - 93.5px)',
              paddingRight: 'calc(50% - 93.5px)',
            }}
            className={styles.naver_btn}
          >
            <div className={styles.naver_icon}></div>
            <div style={{ marginTop: '1px' }}>네이버 아이디로 로그인</div>
          </div>
          <div
            style={{
              paddingLeft: 'calc(50% - 93.5px)',
              paddingRight: 'calc(50% - 93.5px)',
            }}
            className={styles.kakao_btn}
          >
            <div className={styles.kakao_icon}></div>
            <div style={{ marginTop: '1px' }}>카카오 계정으로 로그인</div>
          </div>
        </div>
      </SignWrapper>
    </>
  );
};

export default Overlap;

import React from 'react';
import SignWrapper from '../../../components/SignWrapper';
import Image from 'next/image';
import image_logo from '../../../images/logo.svg';
import styles from '../../../styles/Sign.module.scss';

const Complete = () => {
  return (
    <>
      <SignWrapper>
        <Image src={image_logo} />
        <div className={styles.b24} style={{ marginTop: 20 }}>
          가입이 완료 되었습니다.
        </div>
        <div className={styles.n13} style={{ marginTop: 8 }}></div>

        <div className={styles.create_btn_group}>
          <div className={styles.complete_btn_top}>
            <span>프로필 정보 입력하기</span>
          </div>
          <div className={styles.complete_btn_bottom}>
            <span>메인으로 이동</span>
          </div>
        </div>
      </SignWrapper>
    </>
  );
};

export default Complete;

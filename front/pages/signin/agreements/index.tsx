import React from 'react';
import SignWrapper from '../../../components/SignWrapper';
import Image from 'next/image';
import image_logo from '../../../images/logo.svg';
import styles from '../../../styles/Sign.module.scss';
import Agreements from '../../../components/Agreements';

const Agreement = () => {
  return (
    <>
      <SignWrapper>
        <Image src={image_logo} />
        <div className={styles.b24} style={{ marginTop: 20 }}>
          이용약관
        </div>

        <div style={{ marginTop: '60px' }}></div>
        <Agreements></Agreements>
      </SignWrapper>
    </>
  );
};

export default Agreement;

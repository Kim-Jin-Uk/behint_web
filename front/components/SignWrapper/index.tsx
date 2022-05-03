import Image from 'next/image';
import image_logo_white from './images/logo_white.svg';
import styles from './styles.module.scss';
import React from 'react';

const SignWrapper = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.sign_wrapper}>
        <div className={styles.sign_image}>
          <div className={styles.black_cover}>
            <Image src={image_logo_white} />
          </div>
        </div>
        <aside className={styles.sign_children} style={{ overflowX: 'hidden' }}>
          <div>{props.children}</div>
        </aside>
      </div>
    </>
  );
};
export default SignWrapper;

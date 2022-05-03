import Image from 'next/image';
import icon_check from './images/icon_check.svg';
import styles from './style.module.scss';
import React from 'react';

const Checkbox = (props: {
  checked: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) => {
  const checked = props.checked;
  const toggle = () => {
    if (props.toggle) {
      props.toggle();
    }
  };

  return (
    <div className={styles.checkbox}>
      {checked ? (
        <div onClick={toggle} className={styles.active}>
          <Image src={icon_check} />
        </div>
      ) : (
        <div onClick={toggle} className={styles.inactive}></div>
      )}
      <div onClick={toggle}>{props.children}</div>
    </div>
  );
};

export default Checkbox;

import { profileContent } from '../../reducers';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

const ProfileSns = (props: { data: profileContent }) => {
  const [contentCase, setContentCase] = useState(styles.youtube);
  useEffect(() => {
    switch (props.data.detailContents) {
      case 'youtube':
        setContentCase(styles.youtube);
        break;
      case 'insta':
        setContentCase(styles.insta);
        break;
      case 'facebook':
        setContentCase(styles.facebook);
        break;
      case 'twitter':
        setContentCase(styles.twitter);
        break;
      case 'link':
        setContentCase(styles.link);
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className={styles.snsWrapper}>
      <div className={contentCase}></div>
      <div className={styles.url}>{props.data.informationUrl}</div>
    </div>
  );
};

export default ProfileSns;

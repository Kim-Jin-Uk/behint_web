import styles from './style.module.scss';
import { CommentaryItem } from '../../reducers/project';
import { useEffect } from 'react';
import Image from 'next/image';
const CommentItem = (props: { item: CommentaryItem; userData: any }) => {
  useEffect(() => {
    console.log('item', props.item);
  }, []);
  return (
    <div style={{ margin: '0 0 24px 6px' }}>
      <Image
        src={
          props.userData.profiles[0]
            ? props.userData.profiles[0].profileImgUrl
              ? props.userData.profiles[0].profileImgUrl
              : 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
            : 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
        }
        width={28}
        height={28}
      ></Image>
      <div className={styles.leftWrapper}>
        <div style={{ marginBottom: 4 }}>
          {props.userData.profiles
            ? props.userData.profiles[0].nickname
            : props.userData.email}
        </div>
        <div className={styles.contents}>{props.item.contents}</div>
      </div>
    </div>
  );
};

export default CommentItem;

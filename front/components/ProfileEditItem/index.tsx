import styles from './style.module.scss';
import { profileContent } from '../../reducers';
import moment from 'moment';
import 'moment/locale/ko';
import Link from 'next/link';
import React from 'react';
moment.locale('ko');

const ProfileEditItem = (props: {
  data: profileContent;
  idx: number;
  onClickEditIcon: any;
}) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{props.data.title}</div>
        <div className={styles.position}>{props.data.position}</div>
        <div
          className={styles.editIcon}
          onClick={() => props.onClickEditIcon(props.data.type, props.idx)}
        ></div>
        <div className={styles.deleteIcon}></div>
      </div>
      <div className={styles.date}>
        {props.data.startDate !== null
          ? moment(props.data.startDate).format('YYYY.MM') + ` ~ `
          : null}
      </div>
      <div className={styles.date}>
        {props.data.startDate !== null
          ? props.data.endDate !== null
            ? moment(props.data.endDate).format('YYYY.MM')
            : '재직중'
          : null}
      </div>
      <Link
        href={
          props.data.informationUrl !== null
            ? `${props.data.informationUrl}`
            : ''
        }
      >
        <a rel={'noopener noreferrer'} className={styles.informationUrl}>
          {props.data.informationUrl}
        </a>
      </Link>
      <div className={styles.detailContents}>{props.data.detailContents}</div>
    </div>
  );
};

export default ProfileEditItem;

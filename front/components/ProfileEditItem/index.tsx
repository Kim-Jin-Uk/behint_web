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
  onClickDeleteIcon: any;
}) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{props.data.title}</div>
        <div className={styles.position}>{props.data.position}</div>
        <div
          className={styles.editIcon}
          onClick={() => props.onClickEditIcon(props.data.type, props.idx)}
        />
        <div
          className={styles.deleteIcon}
          onClick={() => props.onClickDeleteIcon(props.data.type, props.idx)}
        />
      </div>
      {props.data.startDate && (
        <>
          <div className={styles.date}>
            {moment(props.data.startDate).format('YYYY.MM') + ` ~ `}
          </div>
          <div className={styles.date}>
            {props.data.endDate !== null
              ? moment(props.data.endDate).format('YYYY.MM')
              : props.data.type === '근무 경험'
              ? '재직중'
              : '재학중'}
          </div>
        </>
      )}

      {props.data.informationUrl && (
        <Link href={`${props.data.informationUrl}`}>
          <a rel={'noopener noreferrer'} className={styles.informationUrl}>
            {props.data.informationUrl}
          </a>
        </Link>
      )}

      {props.data.detailContents && (
        <div className={styles.detailContents}>{props.data.detailContents}</div>
      )}
    </div>
  );
};

export default ProfileEditItem;

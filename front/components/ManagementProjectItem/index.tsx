import { Checkbox } from 'antd';
import { projectItem, projectManagementItem } from '../../reducers';
import { createGlobalStyle } from 'styled-components';
import styles from './style.module.scss';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const Global = createGlobalStyle`
  .ant-checkbox-wrapper{
    vertical-align: top;
    .ant-checkbox-checked .ant-checkbox-inner{
      background-color: #1E68FA;
    }
    .ant-checkbox-input{
      &:hover{
        border: 1px solid #1E68FA;
      }
    }
  }
`;

const ManagementProjectItem = (props: {
  data: projectManagementItem;
  type: string;
}) => {
  const [allowNumber, setAllowNumber] = useState(0);

  useEffect(() => {
    let allow = 0;
    props.data.participation.map((v: { position: string; allow: boolean }) => {
      if (v.allow) {
        allow++;
      }
    });
    setAllowNumber(allow);
  }, [props.data]);

  return (
    <div className={styles.projectWrapper}>
      <Global />
      <Checkbox />
      <div className={styles.itemWrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url('${props.data.thumbnailImgUrl}')` }}
        />

        <div className={styles.itemMain}>
          <div style={{ marginLeft: -4 }}>
            {props.data.category.split(',').map((v: string, i) => {
              return (
                <div className={styles.tagCopy} key={i}>
                  {v}
                </div>
              );
            })}
          </div>
          <div className={styles.title}>{props.data.title}</div>
          <div style={{ marginLeft: -4 }}>
            {props.data.category.split(',').map((v: string, i) => {
              return (
                <div className={styles.tag} key={i}>
                  {v}
                </div>
              );
            })}
          </div>
          <div className={styles.itemInfoWrapper}>
            <div>
              <div className={styles.locationIcon}></div>
            </div>
            <div className={styles.locationName}>{props.data.locationName}</div>
            <div>
              <div className={styles.likeIcon}></div>
            </div>
            <div>
              <div className={styles.likeCount}>{props.data.likeCount}</div>
            </div>
            <div>
              <div className={styles.viewIcon}></div>
            </div>
            <div>
              <div className={styles.viewCount}>{props.data.viewCount}</div>
            </div>
          </div>
          <div className={styles.itemInfoCopy}>
            <div>
              <div>
                <div className={styles.locationIcon}></div>
              </div>
              <div className={styles.locationName}>
                {props.data.locationName}
              </div>
            </div>
            <div>
              <div className={styles.likeIcon}></div>
              <div className={styles.likeCount}>{props.data.likeCount}</div>
              <div className={styles.viewIcon}></div>
              <div className={styles.viewCount}>{props.data.viewCount}</div>
            </div>
          </div>
        </div>
        <div className={styles.rightWrapper}>
          <div>
            {props.type === 'management'
              ? moment(props.data.createdAt).format('YYYY.MM.DD')
              : moment(props.data.invitedAt).format('YYYY.MM.DD')}
          </div>
          <div className={styles.allowNumWrapper}>
            <span style={{ fontWeight: 500, color: '#353C49' }}>
              {props.type === 'management'
                ? `${allowNumber}명`
                : props.data.userName}
            </span>
            {props.type === 'management' &&
            allowNumber !== props.data.participation.length ? (
              <span style={{ fontWeight: 400, color: '#505866' }}>{`(미수락 ${
                props.data.participation.length - allowNumber
              }명)`}</span>
            ) : null}
          </div>
          <div>{props.data.position}</div>
          <div>
            {props.type === 'management' ? (
              <>
                <div className={styles.editButton}></div>
                <div className={styles.deleteButton}></div>
              </>
            ) : (
              <>
                <button className={styles.allowButton}>수락</button>
                <button className={styles.rejectButton}>거절</button>
              </>
            )}
          </div>
        </div>
      </div>
      {props.type === 'management' ? (
        <button className={styles.deleteButtonCopy}>
          <div className={styles.deleteIcon}></div>
          <div className={styles.deleteText}>삭제</div>
        </button>
      ) : (
        <>
          <button className={styles.rejectButtonCopy}>
            <div className={styles.deleteText}>거절</div>
          </button>
          <button className={styles.allowButtonCopy}>
            <div className={styles.deleteText}>수락</div>
          </button>
        </>
      )}
    </div>
  );
};

export default ManagementProjectItem;

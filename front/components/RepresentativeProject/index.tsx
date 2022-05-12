import React from 'react';
import { representativeProject } from '../../reducers';

import styles from './style.module.scss';

const RepresentativeProject = (props: {
  projectItem: representativeProject;
}) => {
  return (
    <div className={styles.itemWrapper}>
      <div
        className={styles.thumbImage}
        style={{
          backgroundImage: "url('" + props.projectItem.thumbnailImgUrl + "')",
        }}
      ></div>
      <div className={styles.bottomWrapper}>
        <div className={styles.tag}>{props.projectItem.position}</div>
        <div className={styles.projectTitle}>{props.projectItem.title}</div>
        <div>
          <div className={styles.locationIcon}></div>
          <div className={styles.locationName}>
            {props.projectItem.locationName}
          </div>
        </div>
        <div className={styles.lastWrapper}>
          <div style={{ height: 18 }}>
            <div className={styles.userIcon}></div>
          </div>
          <div className={styles.userName}>{props.projectItem.userName}</div>
          <div>
            <div className={styles.likeIcon}></div>
          </div>
          <div>
            <div className={styles.likeCount}>
              {props.projectItem.likeCount}
            </div>
          </div>
          <div>
            <div className={styles.viewIcon}></div>
          </div>
          <div>
            <div className={styles.viewCount}>
              {props.projectItem.viewCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentativeProject;

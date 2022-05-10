import React from 'react';
import { projectItem } from '../../reducers';

import styles from './style.module.scss';

const ProjectItem = (props: {
  projectItem: projectItem;
  case: boolean;
  rankingNum: number | null;
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
        {props.case && (
          <div className={styles.rankingNum}>{props.rankingNum}</div>
        )}
        <div
          className={
            props.case
              ? styles.bottomRightWrapper
              : styles.bottomRightWrapperNonTop
          }
        >
          {props.projectItem.category.split(',').map((v: string) => {
            return <div className={styles.tag}>{v}</div>;
          })}
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
    </div>
  );
};

export default ProjectItem;

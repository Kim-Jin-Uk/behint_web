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
        <div>
          <div>tag</div>
          <div>title</div>
          <div>location</div>
          <div>username</div>
          <div>likenum</div>
          <div>viewnum</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

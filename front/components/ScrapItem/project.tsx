import styles from './style.module.scss';
import { projectItem } from '../../reducers';

const Project = (props: {
  data: projectItem;
  selected: boolean;
  dataSelect: boolean;
}) => {
  return (
    <div className={styles.scrapItemWrapper}>
      <div
        style={{
          backgroundImage: "url('" + props.data.thumbnailImgUrl + "')",
        }}
        className={styles.thumbnail}
      ></div>
      {props.selected && <div className={styles.thumbnailCover}></div>}
      <div className={styles.title}>{props.data.title}</div>
      {props.selected && (
        <div
          className={
            props.dataSelect ? styles.selectedIcon : styles.selectModeIcon
          }
        ></div>
      )}
    </div>
  );
};

export default Project;

import styles from './style.module.scss';
import { scrapItem } from '../../reducers';
import { useRouter } from 'next/router';
const ScrapItem = (props: { data: scrapItem; selected: boolean }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div
      className={styles.scrapItemWrapper}
      onClick={() =>
        !props.selected && router.push(`/profile/${id}/scrap/${props.data.id}`)
      }
    >
      <div
        style={{
          backgroundImage: "url('" + props.data.thumbnailUrl + "')",
        }}
        className={styles.thumbnail}
      ></div>
      {props.selected && <div className={styles.thumbnailCover}></div>}
      <div className={styles.title}>{props.data.title}</div>
      <div
        className={styles.projectNum}
      >{`프로젝트 ${props.data.projectNum}개`}</div>
      {props.selected && (
        <div
          className={
            props.data.select ? styles.selectedIcon : styles.selectModeIcon
          }
        ></div>
      )}
    </div>
  );
};

export default ScrapItem;

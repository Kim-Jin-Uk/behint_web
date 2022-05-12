import { commentaryItem } from '../../reducers';
import moment from 'moment';
import styles from './style.module.scss';
import 'moment/locale/ko';
moment.locale('ko');

const CommentaryItem = (props: { commentaryItem: commentaryItem }) => {
  return (
    <div className={styles.commentaryWrapper}>
      <div className={styles.commentaryTopWrapper}>
        <div className={styles.commentaryTitle}>
          {props.commentaryItem.title}
        </div>
        <div className={styles.commentaryTime}>
          {moment(props.commentaryItem.createdAt).fromNow()}
        </div>
      </div>
      <div className={styles.commentaryContent}>
        {props.commentaryItem.contents}
      </div>
      <div className={styles.commentaryShowAll}>
        자세히보기 {'>'} <div></div>
      </div>
    </div>
  );
};

export default CommentaryItem;

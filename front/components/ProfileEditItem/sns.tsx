import styles from './style.module.scss';
import { inputType, profileContent } from '../../reducers';
import useInput from '../../hooks/useInput';

const SNS = (props: {
  data: profileContent;
  onClickLinkSave: any;
  idx: number;
}) => {
  const [link, onChangeLink, setLink] = useInput(
    props.data.informationUrl ? props.data.informationUrl : '',
  ) as inputType;
  return (
    <>
      <div className={styles.snsWrapper}>
        <div style={{ height: 28 }}>
          <div
            className={`${styles.snsButton} ${
              props.data.detailContents === 'insta'
                ? styles.insta
                : props.data.detailContents === 'facebook'
                ? styles.facebook
                : props.data.detailContents === 'twitter'
                ? styles.twitter
                : props.data.detailContents === 'youtube'
                ? styles.youtube
                : styles.link
            }`}
          ></div>
        </div>
        <div style={{ width: '100%' }}>
          <input type="text" value={link} onChange={onChangeLink} />
        </div>
        <div className={styles.snsButtonWrapper}>
          {link.length > 0 ? (
            <button
              className={styles.saveButton}
              onClick={() => props.onClickLinkSave(link, props.idx)}
            >
              저장
            </button>
          ) : (
            <button className={styles.saveButtonNone}>저장</button>
          )}
        </div>
      </div>
    </>
  );
};

export default SNS;

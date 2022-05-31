import styles from './style.module.scss';
import { inputType, profileContent } from '../../reducers';
import useInput from '../../hooks/useInput';

const SNS = (props: { data: string; onClickLinkSave: any; type: string }) => {
  const [link, onChangeLink, setLink] = useInput(
    props.data ? props.data : '',
  ) as inputType;
  return (
    <>
      <div className={styles.snsWrapper}>
        <div style={{ height: 28 }}>
          <div
            className={`${styles.snsButton} ${
              props.type === 'instagramUrl'
                ? styles.insta
                : props.type === 'facebookUrl'
                ? styles.facebook
                : props.type === 'tweeterUrl'
                ? styles.twitter
                : props.type === 'youtubeUrl'
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
              onClick={() => props.onClickLinkSave(link, props.type)}
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

import styles from './style.module.scss';
import { CommentaryItem } from '../../reducers/project';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CommentItem from './commentItem';
import { useDispatch, useSelector } from 'react-redux';
import { GET_OTHER_USER_LIST_REQUEST } from '../../reducers/user';
import { RootState } from '../../reducers';
const CommentaryAddItem = (props: {
  index: number;
  itemList: CommentaryItem[];
  opened: boolean;
  onClickMoreButton: any;
}) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { userList, getOtherUsersSuccess, getOtherUsersError } = useSelector(
    (state: RootState) => state.user,
  );
  useEffect(() => {
    if (props) {
      const start = props.itemList[0].startTime;
      setStartTime(
        `${
          parseInt((start / 60).toString()).toString().length === 1
            ? `0${parseInt((start / 60).toString())}`
            : parseInt((start / 60).toString())
        }:${
          (start % 60).toString().length === 1 ? `0${start % 60}` : start % 60
        }`,
      );
      const end = props.itemList[0].endTime;
      setEndTime(
        `${
          parseInt((end / 60).toString()).toString().length === 1
            ? `0${parseInt((end / 60).toString())}`
            : parseInt((end / 60).toString())
        }:${(end % 60).toString().length === 1 ? `0${end % 60}` : end % 60}`,
      );
    }
  }, [props]);
  useEffect(() => {
    const userListData = props.itemList.map((v: CommentaryItem) => {
      return v.userId;
    });
    dispatch({
      type: GET_OTHER_USER_LIST_REQUEST,
      data: userListData,
    });
  }, []);
  useEffect(() => {
    console.log(userList);
  }, [getOtherUsersSuccess, userList]);
  return (
    <>
      <div className={styles.itemWrapper}>
        <span className={styles.itemIndex}>{props.index}</span>
        <div className={styles.thumbnailWrapper}>
          <Image
            src={props.itemList[0].thumbnailImgUrl}
            width={92}
            height={52}
          />
          <span className={styles.timeText}>{`${startTime} - ${endTime}`}</span>
        </div>
        <div className={styles.contentsWrapper}>
          <h5>{props.itemList[0].title}</h5>
          <div
            onClick={() => {
              props.onClickMoreButton(props.index);
            }}
          >
            {props.opened ? (
              <div>
                <span>{`코멘터리 ${props.itemList.length}개 접기`}</span>
                <div className={styles.shortButton}></div>
                <div className={styles.underLine}></div>
              </div>
            ) : (
              <div>
                <span>{`코멘터리 ${props.itemList.length}개 열기`}</span>
                <div className={styles.moreButton}></div>
                <div className={styles.underLine}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      {props.opened && (
        <>
          <div className={styles.bottomDivider}></div>
          {props.itemList.map((v: CommentaryItem, i: number) => {
            return (
              <CommentItem
                key={i}
                item={v}
                userData={userList[`${v.userId}`]}
              ></CommentItem>
            );
          })}
        </>
      )}
    </>
  );
};

export default CommentaryAddItem;

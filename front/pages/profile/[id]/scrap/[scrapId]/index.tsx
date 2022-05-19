import Header from '../../../../../components/Header';
import { useRouter } from 'next/router';
import scrapStyles from './style.module.scss';
import styles from '../style.module.scss';
import { projectItem } from '../../../../../reducers';
import React, { useCallback, useEffect, useState } from 'react';
import Project from '../../../../../components/ScrapItem/project';

const ScrapId = () => {
  const router = useRouter();
  const { id, scrapId } = router.query;
  const [selected, setSelected] = useState(false);
  const [selectedNum, setSelectedNum] = useState(0);
  const [projectListSelected, setProjectListSelected] = useState(
    [] as boolean[],
  );
  const scrapData = {
    title: '좋아하는 영상 모음',
    projectList: [
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title:
          '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station [unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName:
          'brmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmnbrmn',
        likeCount: 31,
        viewCount: 276,
      },
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName: 'brmn',
        likeCount: 31,
        viewCount: 276,
      },
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName: 'brmn',
        likeCount: 31,
        viewCount: 276,
      },
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName: 'brmn',
        likeCount: 31,
        viewCount: 276,
      },
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName: 'brmn',
        likeCount: 31,
        viewCount: 276,
      },
      {
        thumbnailImgUrl:
          'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
        category: '음악, 예능, 스포츠',
        title: '[unBOXing] mong_gle(몽글)의 ‘식탁’ 언박싱｜brmn station',
        locationName: '식탁',
        userName: 'brmn',
        likeCount: 31,
        viewCount: 276,
      },
    ],
    userData: {
      nickname: 'brmn station',
      profileImageUrl: null,
    },
  };

  useEffect(() => {
    const projectList = scrapData.projectList.map((v) => false);
    setProjectListSelected(projectList);
  }, []);

  const onClickEdit = useCallback(() => {
    setSelected(!selected);
  }, [selected]);

  const onClickItem = useCallback(
    (index: number) => {
      const projectList = [...projectListSelected];
      projectList[index] = !projectList[index];
      projectList[index]
        ? setSelectedNum(selectedNum + 1)
        : setSelectedNum(selectedNum - 1);
      setProjectListSelected(projectList);
    },
    [projectListSelected],
  );

  return (
    <>
      <Header></Header>
      <div className={scrapStyles.topWrapper}>
        <div className={scrapStyles.title}>{scrapData.title}</div>
        <div className={scrapStyles.userWrapper}>
          <div className={scrapStyles.userIcon}></div>
          <div className={scrapStyles.userNickname}>
            {scrapData.userData.nickname}
          </div>
        </div>
        <div>
          <button className={scrapStyles.delButton}>
            <div>
              <div></div>
              <span>삭제</span>
            </div>
          </button>
          <button className={scrapStyles.editButton}>
            <div>
              <div></div>
              <span>수정</span>
            </div>
          </button>
          <button className={scrapStyles.shareButton}></button>
        </div>
      </div>
      <div className={styles.scrapWrapper}>
        <div className={styles.scrapTopWrapper}>
          <div>
            {selected ? (
              <>
                <div
                  style={{ color: '#1E68FA' }}
                  className={styles.title}
                >{`${selectedNum}개`}</div>
                <div className={styles.title}>&nbsp;선택</div>
                <button
                  style={{ border: 'none', color: '#1A1E27' }}
                  className={styles.button}
                  onClick={onClickEdit}
                >
                  취소
                </button>
                <button style={{ border: 'none' }} className={styles.button}>
                  삭제
                </button>
              </>
            ) : (
              <>
                <div className={styles.title}>스크랩 폴더</div>
                <button onClick={onClickEdit} className={styles.button}>
                  편집
                </button>
              </>
            )}
          </div>
        </div>
        <div className={styles.scrapItemWrapper}>
          {scrapData.projectList.map((v: projectItem, i) => {
            return (
              <div
                style={{ display: 'inline-block', verticalAlign: 'top' }}
                onClick={() => onClickItem(i)}
              >
                <Project
                  key={i}
                  data={v}
                  selected={selected}
                  dataSelect={projectListSelected[i]}
                ></Project>
              </div>
            );
          })}
        </div>
      </div>
      <div>{scrapId}</div>
    </>
  );
};

export default ScrapId;

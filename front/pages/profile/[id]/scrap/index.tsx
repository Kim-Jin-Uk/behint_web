import Header from '../../../../components/Header';
import ProfileWrapper from '../../../../components/ProfileWrapper';
import React, { useCallback, useState } from 'react';
import styles from './style.module.scss';
import { scrapItem } from '../../../../reducers';
import ScrapItem from '../../../../components/ScrapItem';

const Scrap = () => {
  const [scrapList, setScrapList] = useState([
    {
      id: 1,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 2,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 3,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 4,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 5,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 6,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 7,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 8,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
    {
      id: 9,
      title: '레퍼런스 영상 모음',
      thumbnailUrl:
        'https://i.ytimg.com/vi/EcKzZ66NJ-s/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAvdk2hwkdkXlir9haubjliQxz76A',
      projectNum: 10,
      select: false,
    },
  ]);
  const [selectedNum, setSelectedNum] = useState(0);
  const [selected, setSelected] = useState(false);

  const onClickEdit = useCallback(() => {
    setSelected(!selected);
  }, [selected]);

  const onClickItem = useCallback(
    (index: number) => {
      const scrapItem = scrapList[index];
      scrapItem.select = !scrapItem.select;
      scrapItem.select
        ? setSelectedNum(selectedNum + 1)
        : setSelectedNum(selectedNum - 1);
      setScrapList([...scrapList]);
    },
    [scrapList],
  );

  return (
    <>
      <Header></Header>
      <ProfileWrapper type={'scrap'}>
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
            {scrapList.map((v: scrapItem, i) => {
              return (
                <div
                  style={{ display: 'inline-block' }}
                  onClick={() => onClickItem(i)}
                >
                  <ScrapItem key={i} data={v} selected={selected}></ScrapItem>
                </div>
              );
            })}
          </div>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default Scrap;

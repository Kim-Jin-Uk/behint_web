import styles from './style.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { leftMenu, projectItem, RootState } from '../../reducers';
import Router from 'next/router';
import ProjectItem from '../ProjectItem';
import Slider, { CustomArrowProps } from 'react-slick';
import { Button, Dropdown } from 'antd';

function SampleNextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <div className={styles.nextArrow} onClick={onClick} />;
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return <div className={styles.prevArrow} onClick={onClick} />;
}

const MainLayout = (props: {
  children: React.ReactNode;
  selectedMenu: string;
}) => {
  const { leftMenuList, selectMenu, rightTitleList } = useSelector(
    (state: RootState) => state.main,
  );
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(0);
  const [slideToShowNum, setSlideToShowNum] = useState(4);
  const projectList = [
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
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShowNum,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [filterName, setFilterName] = useState('인기순');
  const [leftMenuName, setLeftMenuName] = useState('인기순');

  function leftMenuBar() {
    return (
      <div className={styles.leftMenuWrapper}>
        {leftMenuList.map((v: leftMenu) => {
          return (
            <div
              key={v.value}
              className={
                v.value !== selectMenu
                  ? styles.nonSelectLeftItem
                  : styles.selectLeftItem
              }
              onClick={() => Router.push(`/project/${v.value}`)}
            >
              <span>{v.key}</span>
            </div>
          );
        })}
      </div>
    );
  }

  function rightMenuBar() {
    return (
      <div className={styles.dropdownMenu}>
        <div onClick={onClickPopularity}>인기순</div>
        <div onClick={onClickLatest}>최신순</div>
      </div>
    );
  }

  const onClickPopularity = useCallback(() => {
    setFilterName('인기순');
  }, []);
  const onClickLatest = useCallback(() => {
    setFilterName('최신순');
  }, []);

  //title 바꿔주기
  useEffect(() => {
    setTitle(rightTitleList[selectMenu]);
  }, [rightTitleList, selectMenu]);

  //slide num 바꿔주기
  useEffect(() => {
    if (width) {
      if (width >= 1600) {
        setSlideToShowNum(4);
      } else if (width >= 1260) {
        setSlideToShowNum(3);
      } else if (width >= 768) {
        setSlideToShowNum(2);
      } else {
        setSlideToShowNum(1);
      }
    }
  }, [width]);

  //window 에 resize 함수 달아주기
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  //좌측 메뉴 이름 바꿔주기
  useEffect(() => {
    for (const leftMenuListElement of leftMenuList) {
      if (leftMenuListElement.value === selectMenu) {
        setLeftMenuName(leftMenuListElement.key);
      }
    }
  }, [leftMenuList, selectMenu, leftMenuName]);

  return (
    <div id={'mainLayout'} className={styles.bodyWrapper}>
      <div className={styles.mainImage}>
        <div>
          <span>프로젝트 업로드</span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftWrapper}>
          <ul>
            {leftMenuList.map((v: leftMenu) => {
              return (
                <li
                  key={v.value}
                  className={
                    v.value !== selectMenu
                      ? styles.nonSelectItem
                      : styles.selectItem
                  }
                  onClick={() => Router.replace(`/project/${v.value}`)}
                >
                  <span>{v.key}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={styles.rightWrapper}
          style={props.selectedMenu === 'all' ? {} : { marginTop: 36 }}
        >
          {props.selectedMenu === 'all' ? (
            <>
              {width && width > 1024 ? (
                <div className={styles.rightTitle}>
                  요즘 많은 사람이 힌트를 얻은 프로젝트
                </div>
              ) : (
                <div className={styles.rightTitle}>
                  요즘 많은 사람이
                  <br />
                  힌트를 얻은 프로젝트
                </div>
              )}
              <Slider {...settings}>
                {projectList.map((v: projectItem, i: number) => {
                  return (
                    <>
                      <ProjectItem
                        projectItem={v}
                        case={true}
                        rankingNum={i + 1}
                      ></ProjectItem>
                    </>
                  );
                })}
              </Slider>
            </>
          ) : (
            <></>
          )}
          <div className={styles.dropLineWrapper}>
            <div>
              {width && width > 1024 ? (
                <div className={styles.subTitle}>{title}</div>
              ) : (
                <div className={styles.leftFilter}>
                  <Dropdown overlay={leftMenuBar} placement="bottom">
                    <Button>
                      <div>{leftMenuName}</div>
                      <div className={styles.bigDropdownIcon}></div>
                    </Button>
                  </Dropdown>
                </div>
              )}
            </div>
            <div className={styles.dropLineBlock}></div>
            <div className={styles.filter}>
              <Dropdown overlay={rightMenuBar} placement="bottom">
                <Button>
                  <div>{filterName}</div>
                  <div className={styles.dropdownIcon}></div>
                </Button>
              </Dropdown>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

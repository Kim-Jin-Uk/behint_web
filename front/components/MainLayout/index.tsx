import styles from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { leftMenu, projectItem, RootState } from '../../reducers';
import Router from 'next/router';
import ProjectItem from '../ProjectItem';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return <div className={styles.nextArrow} onClick={onClick}></div>;
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return <div className={styles.prevArrow} onClick={onClick}></div>;
}

const MainLayout = (props: {
  children: React.ReactNode;
  selectedMenu: string;
}) => {
  const { leftMenuList, selectMenu, rightTitleList } = useSelector(
    (state: RootState) => state.main,
  );
  const [title, setTitle] = useState('');
  const { width } = useWindowDimensions();
  const [slideToShowNum, setSlideToShowNum] = useState(4);
  const projectList = [
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

  return (
    <div className={styles.bodyWrapper}>
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
        <div className={styles.rightWrapper}>
          {props.selectedMenu === 'all' ? (
            <>
              <div className={styles.rightTitle}>
                요즘 많은 사람이 힌트를 얻은 프로젝트
              </div>
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
          <div>{title}</div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

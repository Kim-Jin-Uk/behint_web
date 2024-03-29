import Header from '../../../../../components/Header';
import styles from './style.module.scss';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Checkbox } from 'antd';
import { createGlobalStyle } from 'styled-components';
import ManagementProjectItem from '../../../../../components/ManagementProjectItem';
import {
  projectItem,
  projectManagementItem,
  RootState,
} from '../../../../../reducers';
import { useSelector } from 'react-redux';

const Global = createGlobalStyle`
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #1E68FA;
  }
  .ant-checkbox-input{
    &:hover{
      border: 1px solid #1E68FA;
    }
  }
`;

const Management = () => {
  const router = useRouter();
  const { id, page } = router.query;
  const { projectManagementList } = useSelector(
    (state: RootState) => state.project,
  );
  const [width, setWidth] = useState(0);
  const [maxProject, setMaxProject] = useState(false);
  const onClickPrev = useCallback(() => {
    router.push(`/profile/${id}/project/management/${+page! - 1}`);
  }, [id, page]);

  const onClickNext = useCallback(() => {
    router.push(`/profile/${id}/project/management/${+page! + 1}`);
  }, [id, page]);

  //window 에 resize 함수 달아주기
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  //초기값 설정
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (width) {
      if (width <= 1024) {
        setMaxProject(true);
      } else {
        setMaxProject(false);
      }
    }
  }, [width]);

  return (
    <>
      <Global />
      <Header />
      <div className={styles.topWrapper}>
        <h1 className={styles.title}>프로젝트 관리</h1>
        <div className={styles.linkWrapper}>
          <div>
            <Link href={`/profile/${id}/project/management/${page}`}>
              <a className={styles.pageLinkSelect}>
                <span>직접 업로드</span>
                <div></div>
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${id}/project/management/participation/1`}>
              <a className={styles.pageLink}>
                <span>함께한 사람으로 참여</span>
                <div></div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.topDarkWrapper}>
        <div>0개 선택됨</div>
        <button>삭제</button>
      </div>
      <div className={styles.topNavigation}>
        <Checkbox>프로젝트</Checkbox>
        <div>
          <ul>
            <li>
              <span>업로드일</span>
              <span>
                <div></div>
              </span>
            </li>
            <li>
              <span>함께한 사람</span>
            </li>
            <li>
              <span>역할</span>
            </li>
            <li>
              <span>수정/삭제</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.projectWrapper}>
        {!maxProject
          ? projectManagementList.map((v: projectManagementItem, i: number) => {
              if (5 * (+page! - 1) <= i && i < 5 * +page!) {
                return (
                  <ManagementProjectItem
                    data={v}
                    key={i}
                    type={'management'}
                  ></ManagementProjectItem>
                );
              }
            })
          : projectManagementList.map((v: projectManagementItem, i: number) => {
              return (
                <ManagementProjectItem
                  data={v}
                  key={i}
                  type={'management'}
                ></ManagementProjectItem>
              );
            })}
        <div className={styles.pageWrapper}>
          <div className={styles.pageText}>{`${5 * (+page! - 1) + 1}-${
            5 * +page! <= projectManagementList.length
              ? 5 * +page!
              : projectManagementList.length
          } / 총 ${projectManagementList.length}개`}</div>
          {+page! > 1 && (
            <div className={styles.prev} onClick={onClickPrev}></div>
          )}
          {projectManagementList.length > 5 * +page! && (
            <div className={styles.next} onClick={onClickNext}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Management;

import styles from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { leftMenu, RootState } from '../../reducers';
import Router from 'next/router';

const MainLayout = (props: {
  children: React.ReactNode;
  selectedMenu: string;
}) => {
  const { leftMenuList, selectMenu, rightTitleList } = useSelector(
    (state: RootState) => state.main,
  );
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(rightTitleList[selectMenu]);
  }, [rightTitleList, selectMenu]);

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
              if (v.value !== selectMenu) {
                return (
                  <li
                    className={styles.nonSelectItem}
                    onClick={() => Router.replace(`/project/${v.value}`)}
                    key={v.key}
                  >
                    <span>{v.key}</span>
                  </li>
                );
              } else {
                return (
                  <li
                    className={styles.selectItem}
                    onClick={() => Router.replace(`/project/${v.value}`)}
                    key={v.key}
                  >
                    <span>{v.key}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.rightWrapper}>
          {props.selectedMenu === 'all' ? (
            <div className={styles.rightTitle}>
              요즘 많은 사람이 힌트를 얻은 프로젝트
            </div>
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

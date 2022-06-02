import Header from '../../../components/Header';
import { createGlobalStyle } from 'styled-components';
import { Checkbox, Modal } from 'antd';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';

const Global = createGlobalStyle`
  .ant-modal-content{
    border-radius: 4px;
    padding: 0;
    .ant-modal-close{
      display: none;
    }
    .ant-modal-header{
      height: 43px;
      padding: 24px 0 42px 36px;
      .ant-modal-title{
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        color: #1A1E27;
      }
    }
    .ant-modal-body{
      padding: 20px 0 0;
      width: auto;
    }
    .ant-modal-footer{
      padding: 0;
    }
  }
`;
const Info = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  useEffect(() => {
    setInfoVisible(true);
  }, []);
  return (
    <>
      <Global />
      <Header />

      <Modal
        width={970}
        title={'기본 정보'}
        visible={infoVisible}
        footer={
          <div className={styles.bottomWrapper}>
            <button>다음</button>
          </div>
        }
      >
        <div className={styles.closeButton} />
        <div className={styles.editorWrapper}>
          <div className={styles.leftWrapper}>
            <div style={{ marginBottom: 12 }}>영상 업로드</div>
            <div className={styles.thumbnailWrapper}>
              <div className={styles.imageWrapper} />
              <div className={styles.blackCover}>
                <div className={styles.buttonGroup}>
                  <div className={styles.buttonWrapper}>
                    <button>
                      <div className={styles.editButton}></div>
                    </button>
                    <div>파일 변경</div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button>
                      <div className={styles.deleteButton}></div>
                    </button>
                    <div>삭제</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>표지 이미지 설정</div>
            <div className={styles.imageWrapper} />
          </div>
          <div className={styles.rightWrapper}>
            <div>프로젝트 제목*</div>
            <input type="text" />
            <div>분야*</div>
            <div>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
              <Checkbox></Checkbox>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Info;

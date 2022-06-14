import Header from '../../../components/Header';
import { createGlobalStyle } from 'styled-components';
import { message, Modal, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import styles from './style.module.scss';
import backUrl from '../../../config/config';
import { useRouter } from 'next/router';
import axios from 'axios';

const Global = createGlobalStyle`
  .ant-modal-mask{
    z-index: 5000;
  }
  .ant-modal-wrap{
    z-index: 5000;
  }
  .ant-modal{
    position: static;
    width: 500px!important;
  }
  .ant-modal-content{
    width: 500px;
    height: 448px;
    border-radius: 4px;
    padding: 24px 20px;
    margin-top: calc(50vh - 224px);
    .ant-modal-close{
      display: none;
    }
    .ant-modal-header{
      padding: 0;
      height: 43px;
      .ant-modal-title{
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        color: #1A1E27;
      }
    }
    .ant-modal-body{
      padding: 20px 0;
      width: 100%;
      height: 380px;
    }
    .ant-modal-footer{
      display: none;
    }
  }
  .ant-upload{
    border: none !important;
    width: 100%;
    height: 100%;
    background: none !important;
  }
  .ant-upload-list{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 396px;
    right: 52px;
    > div{
      display: none;
    }
    > div:last-child{
      display: block;
    }
    .ant-upload-span{
      display: block;
    }
    .ant-upload-text-icon{
      display: none;
    }
    .ant-upload-list-item-card-actions{
      display: none;
    }
    .ant-upload-list-item-name{
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      color: #6D7582;
      text-align: center;
      margin-bottom: 24px;
    }
    .ant-upload-list-item-error{
      display: none;
    }
  }
  .ant-message-notice{
    display: none;
  }
  .ant-upload-span{
    margin-bottom: 24px;
  }
  .ant-progress-inner{
    position: relative;
    top: 24px;
    height: 8px;
    .ant-progress-bg{
      height: 8px !important;
    }
  }
  .ant-upload-list-item-progress{
    padding: 0;
  }
`;
axios.defaults.withCredentials = true;
const Upload = () => {
  const [visible, setVisible] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadDone, setUploadDone] = useState(false);
  const [videoData, setVideoData] = useState('');
  const [videoError, setVideoError] = useState(null as string | null);
  const router = useRouter();

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: (file) => {
      const formData = new FormData();
      formData.append('file', file);
      axios
        .post(`${backUrl}/project/upload/video`, formData)
        .then((res) => {
          setVideoData(res.data);
          setVideoError(null);
        })
        .catch((err) => {
          setVideoData('');
          setVideoError(err);
        });
      return 'true';
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        setUploadVisible(false);
      }
      if (status === 'done') {
      } else if (status === 'error') {
        setUploadVisible(true);
        setErrorMessage(`${info.file.name} 파일 업로드에 실패하였습니다.`);
      }
    },
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (videoData && videoError === null) {
      setVisible(false);
      router.push({
        pathname: '/project/upload/info',
        query: {
          videoData: videoData,
        },
      });
    } else {
      setErrorMessage(`\n파일 업로드에 실패하였습니다.\n\n\n\n`);
      setUploadVisible(true);
    }
  }, [videoData, videoError]);

  return (
    <>
      <Global />
      <Header />
      <Modal title={'프로젝트 업로드'} visible={visible}>
        <div className={styles.closeButton}></div>
        <Dragger accept={'.mp4'} {...props}>
          {uploadVisible && (
            <>
              <div className={styles.uploadProject}></div>
              <pre className={styles.uploadText}>
                {errorMessage === ''
                  ? '클릭, 드래그해서 영상 업로드하기'
                  : errorMessage}
              </pre>
              <div className={styles.uploadButton}>파일 선택</div>
            </>
          )}
        </Dragger>
      </Modal>
    </>
  );
};

export default Upload;

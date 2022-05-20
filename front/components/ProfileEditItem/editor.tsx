import { profileContent } from '../../reducers';
import { DatePicker } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';
import { createGlobalStyle } from 'styled-components';
import styles from './style.module.scss';

const Global = createGlobalStyle`
  .ant-picker{
    width: calc(50% - 10px);
    border: none;
    padding: 0;
    height: 40px;
    box-shadow:none;
    margin-bottom: 20px;
    .ant-picker-input{
      height: 40px;
      input{
        margin-bottom: 0;
        &:hover{
          border: 1px solid #1E68FA;
        }
      }
      .ant-picker-suffix{
        display: none;
      }
      .ant-picker-clear{
        display: none;
      }
    }
  }
`;

const Editor = (props: { data: profileContent | null }) => {
  return (
    <>
      <Global></Global>
      {props.data && props.data.type === '근무 경험' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>회사/조직*</h3>
            <span>(0/20)</span>
          </div>
          <input type="text" placeholder={'회사 이름'} maxLength={20} />

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>기간</h3>
          </div>
          <DatePicker
            mode={'month'}
            defaultValue={moment()}
            locale={locale}
          ></DatePicker>
          <div className={styles.datePickerDivision}>~</div>
          <DatePicker
            mode={'month'}
            defaultValue={moment()}
            locale={locale}
          ></DatePicker>

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>직책</h3>
            <span>(0/20)</span>
          </div>
          <input type="text" placeholder={'직책'} maxLength={20} />

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>세부 사항</h3>
            <span>(0/20)</span>
          </div>
          <input type="text" placeholder={'세부 사항'} maxLength={20} />
        </div>
      )}
    </>
  );
};

export default Editor;

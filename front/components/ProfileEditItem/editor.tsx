import {
  datePickType,
  inputType,
  openListOptions,
  profileContent,
  userData,
} from '../../reducers';
import { Checkbox, DatePicker } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';
import { createGlobalStyle } from 'styled-components';
import styles from './style.module.scss';
import useInput from '../../hooks/useInput';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import useDatePick from '../../hooks/useDatePick';

const Global = createGlobalStyle`
  .ant-picker{
    width: calc(50% - 10px);
    border: none;
    padding: 0;
    height: 40px;
    box-shadow:none;
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
  .ant-checkbox-wrapper{
    height: 24px;
    padding-left: 4px;
    padding-top: 4px;
    margin-bottom: 20px;
    div{
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
      color: #353C49;
    }
    .ant-checkbox-input{
      border: 1px solid #D2D6DA;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #1E68FA;
      border-color: #1E68FA;
    }
    .ant-checkbox + span {
      padding-right: 6px;
      padding-left: 6px;
    }
    &:hover{
      .ant-checkbox-input{
        border: 1px solid #1E68FA
      }
    }
  }
`;

const Editor = (props: {
  data: profileContent | null;
  type: string;
  openAbleList: openListOptions;
  editModeList: openListOptions | null;
  setOpenAbleList: Dispatch<SetStateAction<openListOptions>>;
  setEditModeList: Dispatch<SetStateAction<openListOptions>> | null;
  userData: userData;
  setUserData: Dispatch<SetStateAction<userData>>;
  idx: number;
}) => {
  const [title, onChangeTitle] = useInput(
    props.data?.title ? props.data?.title : '',
  ) as inputType;

  const [position, onChangePosition] = useInput(
    props.data?.position ? props.data?.position : '',
  ) as inputType;

  const [detail, onChangeDetail] = useInput(
    props.data?.detailContents ? props.data?.detailContents : '',
  ) as inputType;

  const [informationUrl, onChangeInformationUrl] = useInput(
    props.data?.informationUrl ? props.data?.informationUrl : '',
  ) as inputType;

  const [startDate, onChangeStartDate, setStartDate] = useDatePick(
    props.data?.startDate ? props.data?.startDate : null,
  ) as datePickType;
  const [endDate, onChangeEndDate, setEndDate] = useDatePick(
    props.data?.endDate ? props.data?.endDate : null,
  ) as datePickType;

  const [inService, setInService] = useState(props.data?.endDate === null);

  const onClickInService = useCallback(
    (e: CheckboxChangeEvent) => {
      setInService(e.target.checked);
    },
    [inService],
  );

  const onClickCancel = useCallback(() => {
    if (props.editModeList) {
      props.editModeList[props.type][0] = false;
      props.setEditModeList && props.setEditModeList({ ...props.editModeList });
      return;
    }
    props.openAbleList[props.data?.type ? props.data?.type : ''] =
      props.openAbleList[props.data?.type ? props.data?.type : ''].map(() => {
        return true;
      });
    props.setOpenAbleList({ ...props.openAbleList });
  }, [props.openAbleList]);

  const onClickDelete = useCallback(() => {
    props.openAbleList[props.data?.type ? props.data?.type : ''].splice(
      props.idx,
      1,
    );
    let index = 0;
    for (let i = 0; i < props.userData.information.length; i++) {
      if (props.userData.information[i].type === props.data?.type) {
        if (index === props.idx) {
          props.userData.information.splice(i, 1);
          props.setUserData(props.userData);
          break;
        } else {
          index++;
        }
      }
    }
    props.setOpenAbleList({ ...props.openAbleList });
  }, [props.openAbleList, props.userData, props.idx]);

  const onClickSave = useCallback(() => {
    if (title.length === 0) {
      return console.log('No!');
    }
    let index = 0;
    const userEditData = {
      title: title,
      startDate: startDate,
      endDate: inService ? null : endDate,
      position: position,
      detailContents: detail,
      informationUrl: informationUrl,
      type: props.type,
    };
    for (let i = 0; i < props.userData.information.length; i++) {
      if (props.userData.information[i].type === props.data?.type) {
        if (index === props.idx) {
          props.userData.information[i] = userEditData;
          props.setUserData(props.userData);

          props.openAbleList[props.data?.type ? props.data?.type : ''] =
            props.openAbleList[props.data?.type ? props.data?.type : ''].map(
              () => {
                return true;
              },
            );
          props.setOpenAbleList({ ...props.openAbleList });

          return;
        } else {
          index++;
        }
      }
    }
    if (props.editModeList) {
      props.editModeList[props.type][0] = false;
      props.setEditModeList && props.setEditModeList({ ...props.editModeList });
      props.userData.information.push(userEditData);
      props.setUserData(props.userData);
      props.openAbleList[props.type].push(true);
      props.setOpenAbleList({ ...props.openAbleList });
      return;
    }
  }, [
    props.openAbleList,
    props.userData,
    props.idx,
    title,
    startDate,
    endDate,
    position,
    detail,
    informationUrl,
    props.data?.type,
    inService,
  ]);

  return (
    <div className={styles.editorWrapper}>
      <Global />
      {props.type === '근무 경험' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>회사/조직*</h3>
            <span>(0/20)</span>
          </div>
          <input
            type="text"
            placeholder={'회사 이름을 입력해 주세요.'}
            maxLength={20}
            value={title}
            onChange={onChangeTitle}
            style={{ marginBottom: 6 }}
          />
          {title.length === 0 ? (
            <div className={styles.errorMessage}>필수 입력 정보 입니다.</div>
          ) : (
            <div style={{ marginBottom: 14 }} />
          )}
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>기간</h3>
          </div>
          <DatePicker
            mode={'month'}
            defaultValue={moment(
              props.data && props.data.startDate
                ? props.data.startDate
                : new Date(),
            )}
            picker="month"
            locale={locale}
            onChange={(date: moment.Moment | null, dateString: string) =>
              onChangeStartDate(date as moment.Moment, dateString)
            }
          />
          <div className={styles.datePickerDivision}>~</div>
          {inService ? (
            <input
              style={{ width: 'calc(50% - 10px)', marginBottom: 0 }}
              readOnly={true}
              value={'재직중'}
            />
          ) : (
            <DatePicker
              mode={'month'}
              defaultValue={moment(
                props.data && props.data.endDate
                  ? props.data.endDate
                  : new Date(),
              )}
              picker="month"
              locale={locale}
              onChange={(date: moment.Moment | null, dateString: string) =>
                onChangeEndDate(date as moment.Moment, dateString)
              }
            />
          )}

          <div>
            <Checkbox onChange={onClickInService} checked={inService}>
              <div>재직중</div>
            </Checkbox>
          </div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>직책</h3>
            <span>(0/20)</span>
          </div>
          <input
            type="text"
            placeholder={'직책을 입력해 주세요. 예) 영상 기획자'}
            maxLength={20}
            value={position}
            onChange={onChangePosition}
          />

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>세부 사항</h3>
            <span>(0/20)</span>
          </div>
          <input
            type="text"
            placeholder={'담당한 업무를 입력해 주세요.'}
            maxLength={20}
            value={detail}
            onChange={onChangeDetail}
          />
          <div className={styles.buttonWrapper}>
            {props.data && (
              <button onClick={onClickDelete} className={styles.deleteButton}>
                삭제
              </button>
            )}
            <button onClick={onClickSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={onClickCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      )}
      {props.type === '콘텐츠 제작' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>콘텐츠 이름*</h3>
            <span>(0/20)</span>
          </div>
          <input
            type="text"
            placeholder={'콘텐츠 이름을 입력해 주세요.'}
            maxLength={20}
            value={title}
            onChange={onChangeTitle}
            style={{ marginBottom: 6 }}
          />
          {title.length === 0 ? (
            <div className={styles.errorMessage}>필수 입력 정보 입니다.</div>
          ) : (
            <div style={{ marginBottom: 14 }} />
          )}
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>세부 사항</h3>
            <span>(0/200)</span>
          </div>
          <input
            type="text"
            placeholder={'콘텐츠에 대해 설명해 주세요.'}
            maxLength={200}
            value={detail}
            onChange={onChangeDetail}
          />

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>링크</h3>
            <span>(0/200)</span>
          </div>
          <input
            type="text"
            placeholder={'https://'}
            maxLength={200}
            value={informationUrl}
            onChange={onChangeInformationUrl}
          />

          <div className={styles.buttonWrapper}>
            {props.data && (
              <button onClick={onClickDelete} className={styles.deleteButton}>
                삭제
              </button>
            )}
            <button onClick={onClickSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={onClickCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      )}
      {props.type === '보유 능력' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>능력/기술*</h3>
            <span>(0/50)</span>
          </div>
          <input
            type="text"
            placeholder={'활용 가능한 전문 기술을 입력해 주세요.'}
            maxLength={50}
            value={title}
            onChange={onChangeTitle}
            style={{ marginBottom: 6 }}
          />
          {title.length === 0 ? (
            <div className={styles.errorMessage}>필수 입력 정보 입니다.</div>
          ) : (
            <div style={{ marginBottom: 14 }} />
          )}
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>세부 사항</h3>
            <span>(0/200)</span>
          </div>
          <input
            type="text"
            placeholder={'능력에 대해 자세히 설명해 주세요.'}
            maxLength={200}
            value={detail}
            onChange={onChangeDetail}
          />

          <div className={styles.buttonWrapper}>
            {props.data && (
              <button onClick={onClickDelete} className={styles.deleteButton}>
                삭제
              </button>
            )}
            <button onClick={onClickSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={onClickCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      )}
      {props.type === '학력' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>학교 또는 대학*</h3>
            <span>(0/50)</span>
          </div>
          <input
            type="text"
            placeholder={'학교 이름을 입력해 주세요.'}
            maxLength={50}
            value={title}
            onChange={onChangeTitle}
            style={{ marginBottom: 6 }}
          />
          {title.length === 0 ? (
            <div className={styles.errorMessage}>필수 입력 정보 입니다.</div>
          ) : (
            <div style={{ marginBottom: 14 }} />
          )}
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>기간</h3>
          </div>
          <DatePicker
            mode={'month'}
            defaultValue={moment(
              props.data && props.data.startDate
                ? props.data.startDate
                : new Date(),
            )}
            picker="month"
            locale={locale}
            onChange={(date: moment.Moment | null, dateString: string) =>
              onChangeStartDate(date as moment.Moment, dateString)
            }
          />
          <div className={styles.datePickerDivision}>~</div>
          {inService ? (
            <input
              style={{ width: 'calc(50% - 10px)', marginBottom: 0 }}
              readOnly={true}
              value={'재학중'}
            />
          ) : (
            <DatePicker
              mode={'month'}
              defaultValue={moment(
                props.data && props.data.endDate
                  ? props.data.endDate
                  : new Date(),
              )}
              picker="month"
              locale={locale}
              onChange={(date: moment.Moment | null, dateString: string) =>
                onChangeEndDate(date as moment.Moment, dateString)
              }
            />
          )}

          <div>
            <Checkbox onChange={onClickInService} checked={inService}>
              <div>재학중</div>
            </Checkbox>
          </div>

          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>전공</h3>
            <span>(0/50)</span>
          </div>
          <input
            type="text"
            placeholder={'전공을 입력해 주세요.'}
            maxLength={50}
            value={detail}
            onChange={onChangeDetail}
          />
          <div className={styles.buttonWrapper}>
            {props.data && (
              <button onClick={onClickDelete} className={styles.deleteButton}>
                삭제
              </button>
            )}
            <button onClick={onClickSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={onClickCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      )}
      {props.type === '수상' && (
        <div>
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>수상명*</h3>
            <span>(0/50)</span>
          </div>
          <input
            type="text"
            placeholder={'수상 내용을 입력해 주세요.'}
            maxLength={50}
            value={title}
            onChange={onChangeTitle}
            style={{ marginBottom: 6 }}
          />
          {title.length === 0 ? (
            <div className={styles.errorMessage}>필수 입력 정보 입니다.</div>
          ) : (
            <div style={{ marginBottom: 14 }} />
          )}
          <div style={{ height: 18, marginBottom: 8 }}>
            <h3>수상일</h3>
          </div>
          <DatePicker
            mode={'month'}
            defaultValue={moment(
              props.data && props.data.startDate
                ? props.data.startDate
                : new Date(),
            )}
            picker="month"
            locale={locale}
            onChange={(date: moment.Moment | null, dateString: string) =>
              onChangeStartDate(date as moment.Moment, dateString)
            }
          />
          <div className={styles.datePickerDivision}>~</div>
          <DatePicker
            mode={'month'}
            defaultValue={moment(
              props.data && props.data.endDate
                ? props.data.endDate
                : new Date(),
            )}
            picker="month"
            locale={locale}
            onChange={(date: moment.Moment | null, dateString: string) =>
              onChangeEndDate(date as moment.Moment, dateString)
            }
          />
          <div style={{ height: 18, marginBottom: 8, marginTop: 20 }}>
            <h3>수상 기관</h3>
            <span>(0/50)</span>
          </div>
          <input
            type="text"
            placeholder={'기관 이름을 입력해 주세요.'}
            maxLength={50}
            value={detail}
            onChange={onChangeDetail}
          />
          <div className={styles.buttonWrapper}>
            {props.data && (
              <button onClick={onClickDelete} className={styles.deleteButton}>
                삭제
              </button>
            )}
            <button onClick={onClickSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={onClickCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;

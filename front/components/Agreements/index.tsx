import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_AGREEMENT_REQUEST,
  SET_AGREEMENT_REQUEST,
  UserAgreement,
} from '../../reducers/user';
import { RootState } from '../../reducers';
import { router } from 'next/client';

const Agreements = () => {
  type fieldOptions = {
    [key: string]: boolean;
  };
  const [allowAll, setAllowAll] = useState(false);
  const [requiredToggle, setRequiredToggle] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { agreement } = useSelector((state: RootState) => state.user);
  const [checked, setChecked] = useState<fieldOptions>({
    c1: false,
    c2: false,
    c3: false,
  });

  const onAllowAll = () => {
    if (allowAll) {
      setAllowAll(false);
      setChecked({
        c1: false,
        c2: false,
        c3: false,
      });
      setRequiredToggle(false);
      return;
    }
    setAllowAll(true);
    setChecked({
      c1: true,
      c2: true,
      c3: true,
    });
    setRequiredToggle(true);
  };
  const onToggle = useCallback(
    (name: string) => {
      const field: fieldOptions = {};
      field[name] = !checked[name];
      setChecked({ ...checked, ...field });
      if ({ ...checked, ...field }['c1'] && { ...checked, ...field }['c2']) {
        setRequiredToggle(true);
        if ({ ...checked, ...field }['c3']) {
          setAllowAll(true);
        } else {
          setAllowAll(false);
        }
      } else {
        setRequiredToggle(false);
        setAllowAll(false);
      }
    },
    [checked, requiredToggle, allowAll],
  );

  const onClickAgreement = useCallback(() => {
    if (checked.c1 && checked.c2) {
      const agreementData: UserAgreement = {
        termOfService: checked.c1,
        personalInformation: checked.c2,
        eventReceive: checked.c3,
      };
      dispatch({
        type: SET_AGREEMENT_REQUEST,
        data: agreementData,
      });
    } else {
      console.log('필수항목을 선택하세요');
    }
  }, [checked]);

  useEffect(() => {
    dispatch({
      type: GET_AGREEMENT_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (agreement) {
      router.replace('/');
    }
  }, [agreement]);

  return (
    <>
      <div className={styles.agreements}>
        <div className={styles.content}>
          <Checkbox checked={allowAll} toggle={onAllowAll}>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>
              가입 약관 전체동의
            </div>
          </Checkbox>
          <div className={styles.subtitle}>
            광고 수신 동의를 포함하여 모두 동의합니다.
          </div>
        </div>
      </div>
      <>
        <div>
          <div className={styles.agreement}>
            <Checkbox
              checked={checked['c1']}
              toggle={() => {
                onToggle('c1');
              }}
            >
              <span className={styles.impact}>
                (필수) 서비스 이용약관에 동의합니다.
              </span>
            </Checkbox>
          </div>
          <div className={styles.agreement}>
            <Checkbox
              checked={checked['c2']}
              toggle={() => {
                onToggle('c2');
              }}
            >
              <span className={styles.impact}>
                (필수) 개인정보 수집·이용에 동의합니다.
              </span>
            </Checkbox>
          </div>
          <div className={styles.agreement}>
            <Checkbox
              checked={checked['c3']}
              toggle={() => {
                onToggle('c3');
              }}
            >
              <span className={styles.choice}>
                (선택) 이벤트 할인 혜택 알림 수신에 동의합니다.
              </span>
            </Checkbox>
          </div>
        </div>
      </>

      <div className={styles.create_btn_group}>
        <div className={styles.complete_btn_top} onClick={onClickAgreement}>
          <span>다음</span>
        </div>
      </div>
    </>
  );
};
export default Agreements;

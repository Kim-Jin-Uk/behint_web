import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import styles from './style.module.scss';
import Router from 'next/router';

const Agreements = () => {
  type fieldOptions = {
    [key: string]: boolean;
  };
  const [allowAll, setAllowAll] = useState(false);
  const [requiredToggle, setRequiredToggle] = useState(false);

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
        <div
          className={styles.complete_btn_top}
          onClick={() => Router.replace('/')}
        >
          <span>다음</span>
        </div>
      </div>
    </>
  );
};
export default Agreements;

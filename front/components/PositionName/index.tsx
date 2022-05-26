import styles from './style.module.scss';

const PositionName = (props: { value: string }) => {
  return (
    <>
      <button className={styles.positionButton}>
        <div>{props.value}</div>
      </button>
    </>
  );
};

export default PositionName;

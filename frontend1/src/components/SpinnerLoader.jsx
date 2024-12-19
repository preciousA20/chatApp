
import styles from "./SpinnerLoader.module.css";

const SpinnerLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SpinnerLoader;


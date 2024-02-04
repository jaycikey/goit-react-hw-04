import styles from './ErrorMsg.module.css';
export const ErrorMsg = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

import styles from './LoadMoreBtn.module.css';
export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      Load more
    </button>
  );
};

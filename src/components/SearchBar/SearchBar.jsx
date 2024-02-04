import { useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

export const SearchBar = ({ value, onChange, onSubmit }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          ref={inputRef}
          onChange={e => onChange(e.target.value)}
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

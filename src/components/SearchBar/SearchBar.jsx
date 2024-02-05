import styles from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search images and photos"
          autoFocus
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

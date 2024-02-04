import styles from './ImageCard.module.css';

export const ImageCard = ({ image }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImage}
        src={image.urls.small}
        alt={image.alt_description}
        loading="lazy"
      />
      <div className={styles.cardInfo}>
        <p> Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </div>
    </div>
  );
};

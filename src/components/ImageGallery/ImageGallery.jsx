import { ImageCard } from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div>
      <ul className={styles.gallery}>
        {images.map(image => (
          <li key={image.id} onClick={() => onImageClick(image)}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

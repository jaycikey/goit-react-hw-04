import { Toaster, toast } from 'react-hot-toast';
import { fetchImagesWithName } from './gallery-api';
import { ErrorMsg } from './components/ErrorMsg/ErrorMsg';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ImageModal } from './components/ImageModal/ImageModal';
import { Loader } from './components/Loader/Loader';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useState } from 'react';
import { LoadMoreBtn } from './components/LoadMoreBtn/LoadMoreBtn';
import styles from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastQuery, setLastQuery] = useState('');

  const fetchImages = async (query, nextPage = page) => {
    try {
      setIsLoading(true);
      setIsLoadMoreBtn(false);
      setError(null);

      const { results, total_pages } = await fetchImagesWithName(
        query,
        nextPage,
        10
      );
      setImages(prevImages => {
        return nextPage === 1 ? [...results] : [...prevImages, ...results];
      });

      setTotalPages(total_pages);

      if (nextPage === total_pages) {
        setIsLoadMoreBtn(false);
      } else {
        setPage(nextPage);
      }
    } catch (error) {
      setError('Failed to fetch images: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formQuery = event.target.elements.query.value.trim();
    if (formQuery === '') {
      toast.error('Please enter a text to search for images.');
    } else if (formQuery !== lastQuery) {
      setQuery(formQuery);
      setImages([]);
      setPage(1);
      try {
        await fetchImages(formQuery, 1);
        setModalOpen(false);
        setLastQuery(formQuery);
      } catch (error) {
        setError('Failed to fetch images: ' + error.message);
      }
    }
  };

  const handleLoadMore = () => {
    if (page === totalPages) {
      setIsLoadMoreBtn(false);
    } else {
      fetchImages(query, page + 1);
    }
  };

  const handleImageClick = image => {
    if (!modalOpen) {
      setSelectedImage(image);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    if (modalOpen) {
      setModalOpen(false);
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />

      {error ? (
        <ErrorMsg message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {isLoadMoreBtn && <LoadMoreBtn onClick={handleLoadMore} />}
      </div>

      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          imageSrc={selectedImage ? selectedImage.urls.regular : ''}
        />
      )}
    </div>
  );
};

import { Toaster, toast } from 'react-hot-toast';
import { fetchImagesWithName } from './gallery-api';
import { ErrorMsg } from './components/ErrorMsg/ErrorMsg';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ImageModal } from './components/ImageModal/ImageModal';
import { Loader } from './components/Loader/Loader';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await fetchImagesWithName(
          query,
          page,
          10
        );
        setTotalPages(total_pages);
        setIsLoadMoreBtn(page < total_pages);
        setImages(prev => (page === 1 ? results : [...prev, ...results]));
        setError(null);
      } catch (error) {
        setError('Failed to fetch images: ' + error.message);
        setImages([]);
        setIsLoadMoreBtn(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a text to search for images.');
      return;
    }
    setError(null);
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSubmit} />

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


import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';

import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import UnsplashAPI from '../../UnsplashAPI';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal';
import { isArrayEmpty } from '../../utils';

const UNSPLASH_ACCESS_KEY = '5KC85giyG2o5aaS-dCVULk4D5dx8B3tu4xbyoL2xLRY';
const searchAPI = new UnsplashAPI(UNSPLASH_ACCESS_KEY);
const PER_PAGE = 12;

Modal.setAppElement('#root');

function App() {

  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showLoadMoreBtn, setShowMoreLoadBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState([]);
  const [imageForModal, setImageForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image) => {
    setImageForModal(image);
    setIsModalOpen(true);
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageForModal(null);
  }

  const handleUpdateImageGallery = (nextImages) => {
    setImages((existingImages) => {
      return [
        ...existingImages,
        ...nextImages
        ]
    });
  };

  const handleSearchQuery = (searchQuery) => {
    setPageNumber(1);
    setImages([]);
    setShowMoreLoadBtn(false);
    setSearchQuery(searchQuery);
  };

  useEffect(() => {

    if (searchQuery === '') {
      return;
    }

    async function searchImages() {
      try {
        setShowLoader(true);
        const foundImages = await searchAPI.searchImages({
          query: searchQuery,
          page: pageNumber,
          per_page: PER_PAGE
        });
        handleUpdateImageGallery(foundImages);
        if (!isArrayEmpty(foundImages)) {
          setShowMoreLoadBtn(foundImages);
          setErrorMessage('');
        } else {
          setErrorMessage('There is no results. Try to change the search query');
        }
      } catch (error) {
        setImages([]);
        setErrorMessage(error.message);
      } finally {
        setShowLoader(false);
      }
    }
    
    searchImages();  
  }, [searchQuery, pageNumber]);

  return (
    <div className={css.container}>
      <ImageModal isOpen={isModalOpen} image={imageForModal} onClose={handleCloseModal} />
      <div><Toaster position="top-right" reverseOrder={false}/></div>
      <SearchBar onSearch={handleSearchQuery} />
      {errorMessage && <div className={css.error}>{errorMessage}</div>}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} /> }
      {showLoader && <Loader /> }
      {showLoadMoreBtn && !errorMessage && <LoadMoreBtn onClick={() => setPageNumber(pageNumber + 1)} /> }
    </div>
  )
}

export default App

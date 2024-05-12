import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images , onImageClick}) {
    return (
        <ul className={css.imageGallery}>
            {images.map((image) => {
                return (
                    <li key={image.id} className={css.imageGalleryItem} >
                        <ImageCard onClick={() => onImageClick(image)} image={image} />
                    </li>
                );
            })}
        </ul>
    );
};
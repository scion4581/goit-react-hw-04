import css from './ImageCard.module.css';

export default function ImageCard({ image: { id, urls, alt_description }, onClick }) {
    return (
        <div>
            <img onClick={onClick} className={css.imageGalleryImage} src={urls.small} alt={alt_description} />
        </div>            
    );
}
import css from './Loader.module.css';

export default function ErrorMessage({value}) {
    return (
        <div className={css.errorMessage}>
            {value}
        </div>
    );
}
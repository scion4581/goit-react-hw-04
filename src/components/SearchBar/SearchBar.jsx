import { GoSearch } from 'react-icons/go';
import toast from 'react-hot-toast';

import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';

export default function SearchBar({onSearch}) {

    const onSubmit = (values, actions) => {
        const searchQuery = values.search_query.trim();        
        if (!searchQuery) {
            toast.error('To search the images you have to enter something!');
        } else {
            onSearch(searchQuery);
            actions.resetForm();
        }
    };

    return (
        <div className={css.searchPicturesBar}>
            <Formik initialValues={{'search_query':''}} onSubmit={onSubmit} >
                <Form className={css.searchPicturesForm}>
                    <button className={css.searchPicturesButton} type='submit'>
                        <GoSearch />
                    </button>
                    <Field
                        className={css.searchPicturesInput}
                        type="text"
                        name="search_query"
                        placeholder="Search images and photos"
                        autoComplete="off"
                        autoFocus
                    />
                </Form>
            </Formik>
        </div>
      );
}
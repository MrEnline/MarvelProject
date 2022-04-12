import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComic = (props) => {
    
    const [comics, setComics] = useState(null);

    const {loading, error, getComics, clearError} = useMarvelService();
    
    useEffect(() => {
        updateComics();
    }, [props.comicsId]);

    const updateComics = () => {
        const {comicsId} = props.comicsId;
        clearError();
        getComics(7373)
                    .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(error || loading || !comics)? <View comics={comics}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {description, thumbnail, title, pageCount, price, language} = comics;
    //используем фрагменты(<>...</>), потому что родителя нет в return
    return(
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;
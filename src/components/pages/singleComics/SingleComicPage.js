import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../../services/marvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [comic, setComic] = useState({});
    const {loading, error, getComic, clearError} = useMarvelService();

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();
        getComic(id)
            .then(onComicLoaded)
    }

    useEffect(() => {
        updateComic();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View handleGoBack={handleGoBack} comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({handleGoBack, comic}) => {

    const {title, description, pageCount, thumbnail, language, price} = comic;
    let imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 
    {"objectFit" : "contain"} : {"objectFit" : "cover"};

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" style={imgStyle}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link onClick={handleGoBack} to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;
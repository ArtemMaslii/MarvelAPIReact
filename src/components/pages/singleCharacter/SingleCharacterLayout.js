import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./singleCharacterLayout.scss";

const singleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;
    let imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" ? 
    {"objectFit" : "contain"} : {"objectFit" : "cover"};

    return (
        <div className="single-char">
            <Helmet>
            <meta
                name="description"
                content={`Information about ${name}`} 
            />
            <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img" style={imgStyle}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    );
}

export default singleCharacterLayout;
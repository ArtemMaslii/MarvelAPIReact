import './charInfo.scss';

import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
    }

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {id, name, description, thumbnail, wiki, comics} = data;
    let imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" || "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif" ? 
    {"objectFit" : "contain"} : {"objectFit" : "cover"};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} className="button button__main">
                            <div className="inner">homepage</div>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {
                    // esling-disable-next-line
                    comics.map((item, i) => {
                        if (i > 9) {
                            return; 
                        }
                        return (
                            <Link 
                                key={i} 
                                className='char__comics-item'
                                to={`/comics/${new URL(item.resourceURI).pathname.split("/").pop()}`}>
                                    {item.name}
                            </Link>
                        );
                    })
                }
            </ul>
        </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
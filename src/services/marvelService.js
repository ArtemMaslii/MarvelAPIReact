import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/"
    const _apiKey = "apikey=b12d377fa43785bf0b0af5c466ebcba1";
    const _baseOffset = 210;

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getCharacter = async (id, fullDesc = false) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0], fullDesc);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        console.log(res);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char, fullDesc) => {

        return {
            id: char.id,
            name: char.name,
            description: char.description ? (fullDesc ? char.description : `${char.description.slice(0, 210)}...`) : 'There is no description for this character',
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title && !comics.title.endsWith(" #-1") ? comics.title : comics.title.replace(/ #-1$/, ""),
            description: comics.description || 'There is no description for this comics',
            pageCount : comics.pageCount ? `${comics.pageCount} pages` : "There is no information about number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : "Price is not found"
        }
    }

    return {loading, error, clearError, getCharacterByName, getAllCharacters, getCharacter, getAllComics, getComic};
}

export default useMarvelService;
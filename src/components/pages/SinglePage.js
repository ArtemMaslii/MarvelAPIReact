import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import AppBanner from "../appBanner/AppBanner";


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState({});
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
        // eslint-disable-next-line
    }, [id]);

    const updateData = () => {
        clearError();

        switch(dataType) {
            case "comic": 
                getComic(id).then(onDataLoaded).then(() => setProcess("confirmed"));
                break;
            case "character":
                getCharacter(id, true).then(onDataLoaded).then(() => setProcess("confirmed"));
                break;
            default:
                throw new Error("Unexpected data type");
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }


    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    );
}

export default SinglePage;
import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import "./404.scss";

const NotFound = () => {
    return (
        <>
            <ErrorMessage/>
            <p className="app__paragraph">Page doesn't exist</p>
            <Link className="app__link" to="/">Back to main page</Link>
        </>
    );
}
export default NotFound;
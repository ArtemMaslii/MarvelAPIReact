import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages";
import Spinner from "../spinner/Spinner";

const NotFound = lazy(() => import("../pages/404/404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/singleComics/SingleComicPage"));

const App = () => {
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                <Route path="/comics/:id" element={<SingleComicPage />} />
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </Router>
        )
    }

export default App;
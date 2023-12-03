import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages";
import Spinner from "../spinner/Spinner";

const SinglePage = lazy(() => import("../pages/SinglePage"));
const NotFound = lazy(() => import("../pages/404/404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() => import("../pages/singleComic/SingleComicLayout"));
const SingleCharacterLayout = lazy(() => import("../pages/singleCharacter/SingleCharacterLayout"));

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
                                <Route path="*" element={<NotFound/>}/>
                                <Route 
                                    path="/comics/:id" 
                                    element={<SinglePage Component={SingleComicLayout} dataType="comic"/>}/>
                                <Route 
                                    path="/characters/:id" 
                                    element={<SinglePage Component={SingleCharacterLayout} dataType="character"/>}/>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </Router>
        )
    }

export default App;
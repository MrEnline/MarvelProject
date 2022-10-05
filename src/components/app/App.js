import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';

//import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

//динамические импорты обязательно должны располагаться после статических
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

//import MarvelService from "../../services/MarvelService";

//const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item)));
// marvelService.getCharacter(1011052).then(res => res.data.results);
//marvelService.getAllCharacters().then(res => console.log(res));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            {/* <Route exact path="/comics/:id">
                                <SinglePage Component={SingleComicLayout} dataType="comic" />
                            </Route>
                            <Route exact path="/characters/:id">
                                <SinglePage Component={SingleCharacterLayout} dataType="character" />
                            </Route> */}
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType="comic" />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType="character" />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;

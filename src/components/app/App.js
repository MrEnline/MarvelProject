import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleComic from "../singleComic/SingleComic";

import decoration from '../../resources/img/vision.png';

//import MarvelService from "../../services/MarvelService";
import { useState } from "react";

//const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item)));
// marvelService.getCharacter(1011052).then(res => res.data.results);
//marvelService.getAllCharacters().then(res => console.log(res));

const App = () => {
    
    const [selectedChar, setChar] = useState(null);
    const [selectedComics, setComics] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    const onComicsSelected = (id) => {
        setComics(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <ComicsList onComicsSelected={onComicsSelected}/>
                </ErrorBoundary>
                {/* <ErrorBoundary>
                    <SingleComic comicsId={selectedComics}/>
                </ErrorBoundary> */}
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
        </div>
    )
}

export default App;
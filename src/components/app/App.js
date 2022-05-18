import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsPage } from '../pages';

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
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;

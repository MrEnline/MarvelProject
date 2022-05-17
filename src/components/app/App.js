import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsPage } from '../pages';

//import MarvelService from "../../services/MarvelService";
import { useState } from 'react';

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
                    <Switch>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;

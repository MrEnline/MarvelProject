import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types'; 

class CharList extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    // componentDidMount() вызывается сразу после монтирования (то есть, вставки компонента в DOM). 
    // В этом методе должны происходить действия, которые требуют наличия DOM-узлов. 
    // Это хорошее место для создания сетевых запросов.
    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)     //если не задан offset, то используется опциональный параметр в данном методе
                          .then(this.onCharListLoaded)  //если получаем результат, то вызываем onCharListLoaded и передаем в него результат
                          .catch(this.onError)          //при ошибке вызываем метод onError
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading : true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = newCharList.length < 9 ? true : false;

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({error: true})
    }

    renderItems(arr) {
        const newCharList = arr.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
        
            return(
                <li className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                            
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>

                </li>
            )
        })

        return (
            <ul className="char__grid">
                {newCharList}
            </ul>
        ) 
    }
    
    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}
                        style={{'display' : charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

//проверка пропса, который мы получаем из App на тип функции
CharList.propType = {
    onCharSelected : PropTypes.func
}

export default CharList;
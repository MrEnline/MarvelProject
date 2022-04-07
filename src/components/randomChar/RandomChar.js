import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();
    

    // вызывается сразу после монтирования (то есть, вставки компонента в DOM). 
    // В этом методе должны происходить действия, которые требуют наличия DOM-узлов. 
    // Это хорошее место для создания сетевых запросов.
    // componentDidMount() {
    //     this.updateChar();
    //     // this.timerId = setInterval(this.updateChar, 15000); Обновление персонажей в верхней части сайта кажды 15 секунд
    // }

    // componentWillUnmount() {
    //     //clearInterval(this.timerId);
    // }

    useEffect(() => {
        updateChar();
        
        const timerId = setInterval(updateChar, 60000); //Обновление персонажей в верхней части сайта кажды 15 секунд
        
        return () => {
            clearInterval(timerId)
        }; //выполняет хук состояния componentWillUnmount после уничтожения компонента
    }, [])
    

    //загрузка данных по персонажу закончена
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        //id от 1011000 до 1011400
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        //в then можно так как ниже или (res => this.onCharLoaded(res))
        getCharacter(id).then(onCharLoaded);
    }
    
        //{char: {name, description, thumbnail, homepage, wiki}} - возможно так
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading)? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {/* {loading ? <Spinner/> : <View char={char}/>} */}
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    // componentDidMount() вызывается сразу после монтирования (то есть, вставки компонента в DOM).
    // В этом методе должны происходить действия, которые требуют наличия DOM-узлов.
    // Это хорошее место для создания сетевых запросов.
    // componentDidMount() {
    //     this.onRequest();
    // }

    //данный пример useEffect - аналог componentDidMount, т.е. вызывается после перерендера компонента
    //и один раз, потому что пустой массив данных []
    //идеальное место для создания сетевых запросов
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(true) : setNewItemLoading(true);
        getAllCharacters(offset) //если не задан offset, то используется опциональный параметр в данном методе
            .then(onCharListLoaded); //если получаем результат, то вызываем onCharListLoaded и передаем в него результат
    };

    const onCharListLoaded = (newCharList) => {
        let ended = newCharList.length < 9 ? true : false;

        setCharList((charList) => [...charList, ...newCharList]); //коллбэк используется, потому что требуется предыдущее значение
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    //динамический импорт возвращает всегда promis, причем export всегда возвращает объект с каким-либо свойством
    //свойством может быть название функции или default
    // if (loading) {
    //     // import('./someFunc')
    //     //     .then((obj) => obj.someFunc())
    //     //     .catch();

    //     import('./someFunc')
    //         .then((obj) => obj.default())
    //         .catch();
    // }

    const itemRefs = useRef([]);

    //в массив добавим реф(ссылки) на элементы li в DOM-структуре - реализация в классовом компоненте
    // setRef = (elem) => {
    //     this.itemRefs.push(elem)
    // }

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) => {
            item.classList.remove('char__item_selected');
        });
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    };

    function renderItems(arr) {
        const newCharList = arr.map((item, i) => {
            let imgStyle = { objectFit: 'cover' };
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={(el) => (itemRefs.current[i] = el)}
                    tabIndex={0}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{newCharList}</ul>;
    }

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    //const content = !(loading || error) ? items : null; удалим, потому что постоянно из-за этого перерендеривается компонент

    //вместо content добавим items, чтобы компонент не перерендеривался за счет использования useRef
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

//проверка пропса, который мы получаем из App на тип функции
CharList.propType = {
    onCharSelected: PropTypes.func,
};

export default CharList;

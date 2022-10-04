import './charInfo.scss';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    // componentDidMount() {
    //     this.updateChar();
    // }

    //componentDidUpdate() вызывается сразу после обновления. Не вызывается при первом рендере.
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }

    //выполняет сразу два хука состояния: componentDidMount и componentDidUpdate
    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) return;
        clearError();
        getCharacter(charId).then(onCharLoaded);

        //this.foo.bar = 0; добавлена строчка для имитации ошибки
    };

    //загрузка данных по персонажу закончена
    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || error || loading ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { objectFit: 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' };
    }
    //используем фрагменты(<>...</>), потому что родителя нет в return
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics this character'}
                {comics.map((item, i) => {
                    if (i > 9) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

//проверка получаемого пропса на тип, который нам требуется
CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;

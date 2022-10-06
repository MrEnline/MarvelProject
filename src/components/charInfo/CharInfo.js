import './charInfo.scss';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

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
        //установим здесь вручную состояние setProcess('confirmed') процесса загрузки
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));

        //this.foo.bar = 0; добавлена строчка для имитации ошибки
    };

    //загрузка данных по персонажу закончена
    const onCharLoaded = (char) => {
        setChar(char);
    };

    return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
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

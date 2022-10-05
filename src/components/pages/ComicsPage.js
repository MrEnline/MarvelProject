import { useState } from 'react';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
    const [selectedComics, setComics] = useState(null);

    const onComicsSelected = (id) => {
        setComics(id);
    };

    return (
        <>
            <Helmet>
                <meta name="List comic page" content="Marvel information portal" />
                <title>Comic page</title>
            </Helmet>
            <AppBanner />
            <ComicsList onComicsSelected={onComicsSelected} />
        </>
    );
};

export default ComicsPage;

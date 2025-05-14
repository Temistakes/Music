import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
    getAlbums,
    getArtistLimit,
    getPage,
    getTotal,
} from "../../bll/selectors/albumsSelectors";
import { getAlbumsPages, clearAlbums } from "../../bll/reducers/aldumsReducer";
import Tile from "../Tile/Tile";
import cl from "./Albums.module.css";

const Albums = ({
    id,
    limit,
    page,
    total,
    albums,
    getAlbumsPages,
    clearAlbums,
}) => {
    useEffect(() => {
        clearAlbums();
        getAlbumsPages(0, limit, null, id, null);
    }, [id]);

    if (!albums.length) return;

    return (
        <div className={cl.albums}>
            <h2 className={cl.title}>Artist's Albums:</h2>
            <div className={cl.items}>
                {albums.map(album => (
                    <Tile {...album} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    limit: getArtistLimit(state),
    page: getPage(state),
    total: getTotal(state),
    albums: getAlbums(state),
});

export default connect(mapStateToProps, {
    getAlbumsPages,
    clearAlbums,
})(Albums);

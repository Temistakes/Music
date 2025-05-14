import React, { useEffect, useRef, useState } from "react";
import Input from "../../ui/Input/Input";
import Tile from "../../Tile/Tile";
import cl from "./Albums.module.css";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/Header";
import { connect } from "react-redux";
import {
    getAlbums,
    getOrder,
    getPage,
    getTotal,
} from "../../../bll/selectors/albumsSelectors";
import { Formik, Form } from "formik";
import { useLoading } from "../../../hooks/useLoading";
import {
    clearAlbums,
    getAlbumsPages,
    setPage,
} from "../../../bll/reducers/aldumsReducer";
import { getLimit } from "../../../bll/selectors/tracksSelectors";
import { useObserver } from "../../../hooks/useObserver";
import Select from "../../Select/Select";
import { setOrder } from "../../../bll/reducers/aldumsReducer";
import MainLoader from "../../MainLoader/MainLoader";
import Loader from "../../Loader/Loader";

let SelectComponent = ({ setOrder }) => {
    return (
        <Select
            defaultVal="Select sort method"
            values={[
                { name: "Name", value: "name" },
                { name: "Id", value: "id" },
                { name: "Release Date", value: "releasedate" },
                { name: "Artist Id", value: "artist_id" },
                { name: "Artist Name", value: "artist_name" },
                { name: "Popularity Total", value: "popularity_total" },
                { name: "Popularity Month", value: "popularity_month" },
                { name: "Popularity Week", value: "popularity_week" },
            ]}
            setVal={setOrder}
        />
    );
};

SelectComponent = connect(null, {
    setOrder,
})(SelectComponent);

const Albums = ({
    albums,
    total,
    page,
    limit,
    getAlbumsPages,
    clearAlbums,
    setPage,
    order,
}) => {
    const intersectEl = useRef();
    const [query, setQuery] = useState("");
    const [loading, getPagesWrap, err] = useLoading(async () => {
        setPage(page + 1);
        return getAlbumsPages(
            (page + 1) * limit + 1,
            limit,
            query,
            null,
            order,
        );
    });

    const canLoad = !loading && total > limit && total - albums.length > limit;

    useObserver(intersectEl, getPagesWrap, loading, canLoad);

    useEffect(() => {
        clearAlbums();
        getAlbumsPages(0, limit, query, null, order);
    }, [query, order]);

    const handleSubmit = values => setQuery(values.query);

    return (
        <div className={cl.playlists}>
            <Header
                title="Albums"
                Select={SelectComponent}
                subtitle={`${total} Albums`}
            />

            <Formik
                initialValues={{
                    query: "",
                }}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Input
                            name="query"
                            value={values.query}
                            placeholder="Search in Albums"
                            icon={faMicrophone}
                        />
                    </Form>
                )}
            </Formik>

            <div className={cl.items}>
                {albums.map(album => (
                    <Tile key={album.id} {...album} />
                ))}
            </div>
            <div ref={intersectEl} className={cl.intersectObj}>
                {total - albums.length > limit && <Loader />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    albums: getAlbums(state),
    total: getTotal(state),
    limit: getLimit(state),
    page: getPage(state),
    order: getOrder(state),
});

export default connect(mapStateToProps, {
    getAlbumsPages,
    clearAlbums,
    setPage,
})(Albums);

import { Form, Formik } from "formik";
import React from "react";
import {
    getArtists,
    getLimit,
    getOrder,
    getPage,
    getTotal,
} from "../../../bll/selectors/artistsSelector";
import {
    setPage,
    getArtistPages,
    clearArtists,
} from "../../../bll/reducers/artistReducer";
import { useLoading } from "../../../hooks/useLoading";
import Header from "../../Header/Header";
import Input from "../../ui/Input/Input";
import cl from "./Artists.module.css";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useObserver } from "../../../hooks/useObserver";
import Artist from "../../Artist/Artist";
import { setOrder } from "../../../bll/reducers/artistReducer";
import Select from "../../Select/Select";
import MainLoader from "../../MainLoader/MainLoader";
import Loader from "../../Loader/Loader";

let SelectComponent = ({ setOrder }) => {
    return (
        <Select
            defaultVal="Select sort method"
            values={[
                { name: "Name", value: "name" },
                { name: "Id", value: "id" },
                { name: "Join Date", value: "joindate" },
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

const Artists = ({
    artists,
    limit,
    page,
    total,
    getArtistPages,
    clearArtists,
    order,
}) => {
    const [query, setQuery] = useState("");
    const intersectEl = useRef();

    const [loading, getPagesWrap, err] = useLoading(async () => {
        setPage(page + 1);
        getArtistPages((page + 1) * limit + 1, limit, query, order);
    });

    useEffect(() => {
        clearArtists();
        getArtistPages(0, limit, query, order);
    }, [query, order]);

    const canLoad = !loading && limit < total && total - artists.length > limit;

    useObserver(intersectEl, getPagesWrap, loading, canLoad);

    const handleSubmit = values => setQuery(values.query);

    return (
        <div className={cl.artists}>
            <Header
                title="Artists"
                Select={SelectComponent}
                subtitle="For you"
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
                            placeholder="Search in Artists"
                            name="query"
                            value={values.query}
                        />
                    </Form>
                )}
            </Formik>

            <div className={cl.items}>
                {artists.map(artist => (
                    <Artist data={artist} />
                ))}
            </div>

            <div className={cl.intersectObj} ref={intersectEl}>
                {total - artists.length > limit && <Loader />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    artists: getArtists(state),
    limit: getLimit(state),
    page: getPage(state),
    total: getTotal(state),
    order: getOrder(state),
});

export default connect(mapStateToProps, {
    getArtistPages,
    setPage,
    clearArtists,
})(Artists);

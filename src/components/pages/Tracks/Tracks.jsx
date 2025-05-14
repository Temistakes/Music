import React, { useEffect, useState } from "react";
import cl from "./Tracks.module.css";
import Header from "../../Header/Header";
import Input from "../../ui/Input/Input";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import TrackItem from "../../TrackItem/TrackItem";
import { connect } from "react-redux";
import {
    getLimit,
    getOrder,
    getPage,
    getTotalResults,
    getTracks,
} from "../../../bll/selectors/tracksSelectors";
import {
    getTrackPages,
    setPage,
    clearTracks,
    setOrder,
} from "../../../bll/reducers/tracksReducer";
import { setTrack } from "../../../bll/reducers/appReducer";
import "../../../api/tracksApi";
import { useRef } from "react";
import { useLoading } from "../../../hooks/useLoading";
import { useObserver } from "../../../hooks/useObserver";
import { Formik, Form } from "formik";
import {
    getAlbums,
    getLoading,
    getPlaying,
    getTrack,
} from "../../../bll/selectors/appSelectors";
import Albums from "../../Albums/Albums";
import Select from "../../Select/Select";
import Loader from "../../Loader/Loader";

let SelectComponent = ({ setOrder }) => {
    return (
        <Select
            defaultVal="Select sort method"
            values={[
                { name: "Relevance", value: "relevance" },
                { name: "Buzzrate", value: "buzzrate" },
                { name: "Downloads Week", value: "downloads_week" },
                { name: "Downloads Month", value: "downloads_month" },
                { name: "Downloads Total", value: "downloads_total" },
                { name: "Listens Week", value: "listens_week" },
                { name: "Listens Month", value: "listens_month" },
                { name: "Listens Total", value: "listens_total" },
                { name: "Popularity Month", value: "popularity_month" },
                { name: "Popularity Total", value: "popularity_total" },
                { name: "Name", value: "name" },
                { name: "Artist Name", value: "artist_name" },
                { name: "Release Date", value: "releasedate" },
                { name: "Duration", value: "duration" },
                { name: "Id", value: "id" },
            ]}
            setVal={setOrder}
        />
    );
};

SelectComponent = connect(null, {
    setOrder,
})(SelectComponent);

const Tracks = ({
    title,
    tracks,
    limit,
    page,
    total,
    setTrack,
    setPage,
    getTrackPages,
    clearTracks,
    albums,
    albumId,
    artistId,
    artistImg,
    order,
    currentId,
    isPlayingCurrent,
    trackLoading,
}) => {
    console.log(total);
    const intersectEl = useRef();
    const [query, setQuery] = useState("");

    const [loading1, getTrackPageWrap, err1] = useLoading(async () => {
        setPage(page + 1);
        return getTrackPages(
            (page + 1) * limit + 1,
            limit,
            query,
            albumId,
            artistId,
            order,
        );
    });

    const canLoad = !loading1 && total > limit && total - tracks.length > limit;

    useObserver(intersectEl, getTrackPageWrap, loading1, canLoad);

    const handleSubmit = values => setQuery(values.query);

    useEffect(() => {
        clearTracks();
        getTrackPages(0, limit, query, albumId, artistId, order);
    }, [query, order, albumId, artistId]);

    return (
        <div className={cl.tracks}>
            <Header
                title={title}
                artistImg={artistImg}
                Select={SelectComponent}
                subtitle="For you"
                isArtist={!!artistId}
                isAlbum={!!albumId}
            />

            {artistId && <Albums id={artistId} />}

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
                            placeholder="Search in Tracks"
                            icon={faMicrophone}
                        />
                    </Form>
                )}
            </Formik>

            <div className={cl.items}>
                {tracks.map(track => (
                    <TrackItem
                        key={track.id}
                        data={track}
                        setTrack={setTrack}
                        albums={albums}
                        isCurrent={track.id === currentId}
                        isPlaying={isPlayingCurrent}
                        loading={trackLoading}
                    />
                ))}

                <div ref={intersectEl} className={cl.intersectObj}>
                    {total - tracks.length > limit && <Loader />}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    tracks: getTracks(state),
    limit: getLimit(state),
    page: getPage(state),
    total: getTotalResults(state),
    albums: getAlbums(state),
    order: getOrder(state),
    currentId: getTrack(state).id,
    isPlayingCurrent: getPlaying(state),
    trackLoading: getLoading(state),
});

export default connect(mapStateToProps, {
    setTrack,
    getTrackPages,
    setPage,
    clearTracks,
    setOrder,
})(Tracks);

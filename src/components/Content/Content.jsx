import React from "react";
import { Route, Routes } from "react-router-dom";
import Playlists from "../pages/Playlists/Playlists";
import cl from "./Content.module.css";
import Tracks from "../pages/Tracks/Tracks";
import TrackPage from "../pages/TrackPage/TrackPage";
import Album from "../pages/Album/Album";
import {
    getAlbums,
    getDuration,
    getLoading,
    getPlaying,
    getRef,
    getTime,
    getTrack,
} from "../../bll/selectors/appSelectors";
import { connect } from "react-redux";
import {
    setBackground,
    setPlaying,
    setTime,
    setTrack,
} from "../../bll/reducers/appReducer";
import Albums from "../pages/Albums/Albums";
import Artists from "../pages/Artists/Artists";
import ArtistPage from "../pages/Artist/ArtistPage";
import Settings from "../pages/Settings/Settings";

const Content = ({
    track,
    audio,
    time,
    duration,
    playing,
    setPlaying,
    setTime,
    setTrack,
    albums,
    trackLoading,
    setBackground,
}) => {
    return (
        <div className={cl.content}>
            <Routes>
                {/* <Route index element={<Playlists />} /> */}
                <Route index element={<Tracks title="Songs" />} />
                <Route path="/albums/" element={<Albums />} />
                <Route
                    path="/album/:id"
                    element={<Album title="Mia maxima culpa" />}
                />
                <Route
                    path="/songs/:id"
                    element={
                        <TrackPage
                            data={{ ...track, time, duration, playing }}
                            setTime={setTime}
                            audio={audio}
                            setPlaying={setPlaying}
                            setTrack={setTrack}
                            albums={albums}
                            loading={trackLoading}
                        />
                    }
                />
                <Route path="/artists/" element={<Artists />} />
                <Route path="/artists/:id" element={<ArtistPage />} />
                <Route
                    path="/settings/"
                    element={<Settings setBackground={setBackground} />}
                />
            </Routes>
        </div>
    );
};

const mapStateToProps = state => ({
    track: getTrack(state),
    audio: getRef(state),
    time: getTime(state),
    duration: getDuration(state),
    playing: getPlaying(state),
    albums: getAlbums(state),
    trackLoading: getLoading(state),
});

export default connect(mapStateToProps, {
    setTime,
    setPlaying,
    setTrack,
    setBackground,
})(Content);

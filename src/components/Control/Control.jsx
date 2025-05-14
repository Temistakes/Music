import React, { useState, memo, useEffect } from "react";
import IconBtn from "../ui/IconBtn/IconBtn";
import Track from "../Track/Track";
import cl from "./Control.module.css";
import {
    faLeftLong,
    faPause,
    faRightLong,
    faRepeat,
    faVolumeHigh,
    faPlay,
    faCocktail,
    faRecordVinyl,
} from "@fortawesome/free-solid-svg-icons";
import Nouislider from "nouislider-react";
import cls from "classnames";
import { connect } from "react-redux";
import {
    getDuration,
    getLooping,
    getPlaying,
    getPosition,
    getAlbumTracks,
    getRef,
    getTime,
    getTrack,
    getVolume,
    getDisabled,
    getAlbums,
    getLoading,
} from "../../bll/selectors/appSelectors";
import {
    next,
    prev,
    setDuration,
    setLooping,
    setPlaying,
    setTime,
    setVolume,
} from "../../bll/reducers/appReducer";
import Loader from "../Loader/Loader";

const Control = ({
    track,
    isPlaying,
    looping,
    disabled,
    setPlaying,
    setLooping,
    setTime,
    prev,
    next,
    audio,
    time,
    duration,
    position,
    albumTracks,
    albums,
    loading,
}) => {
    const [isVolumeHide, setVolumeHide] = useState(true);

    useEffect(() => {
        if (!isPlaying) {
            audio.current.pause();
        } else {
            audio.current.play();
        }
        console.log(isPlaying, track);
    }, [isPlaying, track.id]);

    const togglePlayPause = () => {
        setPlaying(!isPlaying);
    };

    const toggleLoop = () => {
        setLooping(!looping);

        if (looping) {
            audio.current.loop = false;
        } else {
            audio.current.loop = true;
        }
    };

    const handleChange = (values, handle, value) => {
        setVolume(value);
        audio.current.volume = value;
    };

    const slidePrev = () => prev(albumTracks, position, albums);
    const slideNext = () => next(albumTracks, position, albums);

    return (
        <div className={cl.control}>
            <div className={cl.left}>
                <IconBtn
                    icon={faLeftLong}
                    disabled={disabled.left}
                    onClick={slidePrev}
                    size="xl"
                    className={cl.prev}
                />
                {isPlaying ? (
                    <IconBtn
                        onClick={togglePlayPause}
                        icon={faPause}
                        size="xl"
                    />
                ) : (
                    <IconBtn
                        onClick={togglePlayPause}
                        icon={faPlay}
                        size="xl"
                    />
                )}
                <IconBtn
                    icon={faRightLong}
                    disabled={disabled.right}
                    onClick={slideNext}
                    size="xl"
                    className={cl.next}
                />
            </div>

            {!track.id && loading ? (
                <Loader />
            ) : (
                track.id && (
                    <Track
                        data={{ ...track, time, duration }}
                        setTime={setTime}
                        setPlaying={setPlaying}
                        audio={audio}
                        loading={loading}
                    />
                )
            )}

            <div className={cl.right}>
                {
                    <IconBtn
                        onClick={toggleLoop}
                        icon={faRepeat}
                        active={looping}
                        size="xl"
                    />
                }
                <div
                    className={cls(cl.volumeWrap, {
                        hidden: isVolumeHide,
                    })}
                >
                    <Nouislider
                        className={"vertSlider volume"}
                        orientation="vertical"
                        range={{ min: 0, max: 0.1 }}
                        start={0.1}
                        connect={[true, false]}
                        onUpdate={handleChange}
                    />
                    <IconBtn
                        icon={faVolumeHigh}
                        onClick={() => setVolumeHide(prev => !prev)}
                        size="xl"
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isPlaying: getPlaying(state),
    volume: getVolume(state),
    looping: getLooping(state),
    audio: getRef(state),
    track: getTrack(state),
    time: getTime(state),
    duration: getDuration(state),
    albumTracks: getAlbumTracks(state),
    position: getPosition(state),
    disabled: getDisabled(state),
    albums: getAlbums(state),
    loading: getLoading(state),
});

export default connect(mapStateToProps, {
    setPlaying,
    setLooping,
    setVolume,
    setTime,
    setDuration,
    prev,
    next,
})(memo(Control));

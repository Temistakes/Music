import React, { useEffect, useMemo } from "react";
import cl from "./TrackPage.module.css";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { getFormattedTime } from "../../../utils/numberMethods";
import cls from "classnames";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";

const TrackPage = ({
    data,
    audio,
    setPlaying,
    setTime,
    setTrack,
    albums,
    loading,
}) => {
    const formattedTime = getFormattedTime(data.time);
    const formattedDuration = getFormattedTime(data.duration);

    const handleChange = (values, handle, value) => {
        setTime(value);
        audio.current.currentTime = value;
    };

    const handleClick = () => {
        setPlaying(!data.playing);

        if (data.playing) {
            audio.current.pause();
        } else {
            audio.current.play();
        }
    };

    const params = useParams();

    useEffect(() => {
        if (!!params.id && data.id !== params.id) {
            setTrack(params.id, albums, true, loading);
        }
    }, [params.id]);

    if (!data.id && loading) {
        return (
            <div className={cl.track}>
                <div className={cl.wrap}>
                    <Loader />
                </div>
            </div>
        );
    } else if (!data.id) {
        return <></>;
    }

    return (
        <div className={cl.track}>
            <div className={cl.wrap}>
                <div
                    onClick={handleClick}
                    className={cls(cl.imgWrap, {
                        [cl.play]: data.playing,
                    })}
                >
                    <img src={data.image} alt={data.name} className={cl.img} />
                </div>
                <span className={cl.name}>
                    {data.name || "Name not written"}
                </span>
                <NavLink
                    to={`/artists/${data.artist_id}`}
                    className={cl.artist}
                >
                    {data.artist_name || "Artist not written"}
                </NavLink>
                <div className={cl.barWrap}>
                    <Nouislider
                        range={{
                            min: 0,
                            max: data.duration ? data.duration : 1,
                        }}
                        start={data.time}
                        connect={[true, false]}
                        onChange={handleChange}
                    />
                    <div className={cl.times}>
                        <span className={cl.time}>{formattedTime}</span>

                        <span className={cl.time}>{formattedDuration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackPage;

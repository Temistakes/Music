import React from "react";
import cls from "classnames";
import cl from "./TrackItem.module.css";
import IconBtn from "../ui/IconBtn/IconBtn";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { getFormattedTime } from "../../utils/numberMethods";

const TrackItem = ({
    data,
    albums,
    setTrack,
    className,
    isCurrent,
    isPlaying,
    loading,
}) => {
    const handleClick = () => {
        setTrack(data.id, albums, false, loading);
    };

    return (
        <div
            onClick={handleClick}
            className={cls(cl.track, className, {
                [cl.current]: isCurrent,
                [cl.play]: isCurrent && isPlaying,
            })}
        >
            <div className={cl.left}>
                <div className={cl.imgWrap}>
                    <img src={data.image} alt={data.name} className={cl.img} />
                </div>

                <div className={cl.info}>
                    <span className={cl.name}>{data.name}</span>
                    <span className={cl.artist}>{data.artist_name}</span>
                </div>
            </div>

            <div className={cl.right}>
                {/* {data.isHearted ? (
                    <IconBtn
                        className={cl.likeBtn}
                        size="1.2"
                        icon={faHeartCrack}
                    />
                ) : (
                    <IconBtn className={cl.likeBtn} size="1.2" icon={faHeart} />
                )} */}
                <span className={cl.time}>
                    {getFormattedTime(data.duration)}
                </span>
            </div>
        </div>
    );
};

export default TrackItem;

import React, { useEffect, useState } from "react";
import IconBtn from "../ui/IconBtn/IconBtn";
import cls from "classnames";
import cl from "./Track.module.css";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

export default function Track({
    data,
    audio,
    setTime,
    setPlaying,
    loading,
    className,
    ...props
}) {
    const nodeRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(audio.current.currentTime);

            if (audio.current.currentTime >= data.duration) {
                setPlaying(false);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [data]);

    return (
        <CSSTransition
            classNames="track"
            nodeRef={nodeRef}
            timeout="300"
            addEndListener={done =>
                nodeRef.current.addEventListener("transitionend", done)
            }
            in={!loading}
            appear
        >
            <NavLink
                to={`/songs/${data.id}`}
                className={cls(cl.track, className, {
                    [cl.loading]: loading,
                })}
                ref={nodeRef}
                {...props}
            >
                <div className={cl.left}>
                    {loading ? (
                        <div className={cl.loadingStub}></div>
                    ) : (
                        <img
                            src={data.image}
                            alt={data.name}
                            className={cl.img}
                        />
                    )}

                    <div className={cl.info}>
                        <span className={cl.name}>{data.name}</span>
                        <span className={cl.artist}>{data.artist_name}</span>
                    </div>
                </div>

                {/* <div className={cl.right}>
                <IconBtn className={cl.settingsBtn} icon={faEllipsis} />
            </div> */}

                <div className={cl.bar}>
                    <div
                        style={{
                            width: (data.time / data.duration) * 100 + "%",
                        }}
                        className={cl.progress}
                    ></div>
                </div>
            </NavLink>
        </CSSTransition>
    );
}

import React from "react";
import cl from "./Header.module.css";
import RoundBtn from "../ui/RoundBtn/RoundBtn";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import userDefault from "../../assets/img/general/user-default.png";

const Header = ({
    title,
    subtitle,
    callback,
    artistImg,
    Select,
    isArtist,
    isAlbum,
    ...props
}) => {
    return (
        <div className={cl.header}>
            <div className={cl.left}>
                {isArtist && (
                    <img
                        src={artistImg || userDefault}
                        alt=""
                        className={cl.artistImg}
                    />
                )}
                <div className={cl.text}>
                    <h2 className={cl.title}>
                        {String(title).trim() ||
                            ((isArtist || isAlbum) && "Name not written")}
                    </h2>
                    {subtitle && (
                        <span className={cl.subtitle}>{subtitle}</span>
                    )}
                </div>
            </div>

            <div className={cl.right}>
                {/* <RoundBtn icon={faBarsStaggered} /> */}
                {Select && <Select />}
            </div>
        </div>
    );
};

export default Header;

import React from "react";
import RoundBtn from "../ui/RoundBtn/RoundBtn";
import { NavLink } from "react-router-dom";
import Link from "../ui/Link/Link";
import DropDown from "../DropDown/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faClock,
    faMicrophoneLines,
    faCompactDisc,
    faMusic,
    faCircleUser,
    faTable,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import cl from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={cl.navbar}>
            <header className={cl.header}>
                <div className={cl.text}>
                    <h2 className={cl.title}>Library</h2>
                    <span className={cl.subtitle}>All Music</span>
                </div>
                {/* <RoundBtn icon={faEllipsis} /> */}
            </header>

            <nav>
                <ul className={cl.list}>
                    {/* <li>
                        <Link to="/recent/" icon={faClock}>
                            Recently Added
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/artists/" icon={faMicrophoneLines}>
                            Artist
                        </Link>
                    </li>
                    <li>
                        <Link to="/albums/" icon={faCompactDisc}>
                            Albums
                        </Link>
                    </li>
                    <li>
                        <Link to="/" icon={faMusic}>
                            Songs
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings/" icon={faCircleUser}>
                            Personalization
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* <DropDown name="Playlist">
                <ul className={cl.list}>
                    <li>
                        <Link to="/" icon={faTable} className={cl.firstBtn}>
                            All Playlists
                        </Link>
                    </li>
                    <li>
                        <NavLink className={cl.imgBtn} to="/">
                            <img
                                src="https://sun77-2.userapi.com/s/v1/ig2/VCWo-QP16csS6sC72oUk3dyzJeAJk4sKQN6Pg-2J2ViVhZ6uTl79cziBEbAWlLV1NTHWCvLJ-HZbGmBL3hGrj0-W.jpg?quality=95&crop=0,0,1000,1000&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=D_dAesZA5B171fxYND5igzGRqIo7Mx2d1XPBwVT5N_Y&cs=200x200"
                                alt=""
                            />
                            Good Vibes Only
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={cl.imgBtn} to="/">
                            <img
                                src="https://sun77-2.userapi.com/s/v1/ig2/VCWo-QP16csS6sC72oUk3dyzJeAJk4sKQN6Pg-2J2ViVhZ6uTl79cziBEbAWlLV1NTHWCvLJ-HZbGmBL3hGrj0-W.jpg?quality=95&crop=0,0,1000,1000&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=D_dAesZA5B171fxYND5igzGRqIo7Mx2d1XPBwVT5N_Y&cs=200x200"
                                alt=""
                            />
                            Indie Anthems
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={cl.quadroBtn} to="/">
                            <div className={cl.iconWrap}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            Add Playlist
                        </NavLink>
                    </li>
                </ul>
            </DropDown> */}
        </div>
    );
};

export default NavBar;

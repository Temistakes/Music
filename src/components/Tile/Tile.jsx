import React, { useEffect, useRef, useState } from "react";
import cl from "./Tile.module.css";
import { NavLink } from "react-router-dom";

const Tile = ({ id, image, name, artist_name, ...props }) => {
    return (
        <NavLink to={`/album/${id}`} className={cl.tile} {...props}>
            <div className={cl.imgWrap}>
                <img src={image} alt="" className={cl.img} />
            </div>
            <span className={cl.name}>{name.trim() || "Name not written"}</span>
            <p className={cl.descr}>{artist_name}</p>
        </NavLink>
    );
};

export default Tile;

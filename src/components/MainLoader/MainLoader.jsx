import React from "react";
import cl from "./MainLoader.module.css";

const MainLoader = () => {
    return (
        <div className={cl.loaderWrap}>
            <div class={cl.loader}></div>
        </div>
    );
};

export default MainLoader;

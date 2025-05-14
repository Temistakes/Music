import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cl from "./RoundBtn.module.css";
import cls from "classnames";

const RoundBtn = ({ icon, className, size, ...props }) => {
    return (
        <button className={cls(cl.btn, className)}>
            <FontAwesomeIcon
                style={{ transform: `scale(${1 && size})` }}
                icon={icon}
            />
        </button>
    );
};

export default RoundBtn;

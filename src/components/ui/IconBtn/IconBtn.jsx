import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cl from "./IconBtn.module.css";
import cls from "classnames";

const IconBtn = ({ icon, className, size, active, ...props }) => {
    return (
        <button
            className={cls(cl.btn, className, {
                [cl.active]: active,
            })}
            {...props}
        >
            <FontAwesomeIcon size={size} icon={icon} />
        </button>
    );
};

export default IconBtn;

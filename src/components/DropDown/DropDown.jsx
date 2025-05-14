import React from "react";
import cls from "classnames";
import cl from "./DropDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ name, children, className, ...props }) => {
    return (
        <div className={cls(cl.dropDown, className)} {...props}>
            <button className={cl.btn}>
                {name}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className={cl.wrap}>{children}</div>
        </div>
    );
};

export default DropDown;

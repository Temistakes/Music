import React from "react";
import cls from "classnames";
import { NavLink } from "react-router-dom";
import cl from "./Link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Link = ({ to, icon, children, className, ...props }) => {
    return (
        <NavLink className={cls(cl.link, className)} {...props} to={to}>
            <FontAwesomeIcon icon={icon} />
            {children}
        </NavLink>
    );
};

export default Link;

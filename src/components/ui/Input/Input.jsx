import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cl from "./Input.module.css";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Field } from "formik";

const Input = ({ icon, ...props }) => {
    return (
        <div className={cl.wrap}>
            <FontAwesomeIcon icon={faMicrophone} />
            <Field {...props} />
        </div>
    );
};

export default Input;

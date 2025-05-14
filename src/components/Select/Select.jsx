import React from "react";
import cl from "./Select.module.css";

const Select = ({ defaultVal, values, setVal }) => {
    return (
        <select onChange={e => setVal(e.target.value)} className={cl.select}>
            <option disabled>{defaultVal}</option>
            {values.map((val, index) => (
                <option key={index} value={val.value}>
                    {val.name}
                </option>
            ))}
        </select>
    );
};

export default Select;

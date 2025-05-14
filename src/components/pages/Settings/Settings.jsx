import React, { useEffect, useState } from "react";
import cl from "./Settings.module.css";

const Settings = ({ setBackground }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const storageUrl = localStorage.getItem("background");

        if (!!url) {
            setBackground(url);
            localStorage.setItem("background", url);
        } else if (storageUrl) {
            setBackground(storageUrl);
        }
    }, [url]);

    return (
        <div className={cl.settings}>
            <h1 className={cl.title}>Personalization</h1>

            <div className={cl.items}>
                <div className={cl.group}>
                    <h2 className={cl.groupTitle}>Background</h2>
                    <input
                        type="text"
                        placeholder="IMAGE'S URL"
                        className={cl.bgInput}
                        onChange={e => setUrl(e.target.value)}
                    />
                </div>

                {/* <div className={cl.group}>
                    <h2 className={cl.groupTitle}>Main color</h2>
                    <input type="color" className={cl.colorInput} />
                </div> */}
            </div>
        </div>
    );
};

export default Settings;

import cls from "classnames";
import cl from "./Artist.module.css";
import { NavLink } from "react-router-dom";
import userDefault from "../../assets/img/general/user-default.png";

export default function Artist({ data, className }) {
    return (
        <NavLink
            to={`/artists/${data.id}`}
            className={cls(cl.artistTile, className)}
        >
            <div className={cl.left}>
                <img
                    src={data.image || userDefault}
                    alt={data.name}
                    className={cl.img}
                />

                <div className={cl.info}>
                    <span className={cl.name}>
                        {data.name.trim() || "Name is not writed"}
                    </span>
                    <span className={cl.artist}>{data.artist_name}</span>
                </div>
            </div>
        </NavLink>
    );
}

import React from "react";
import Input from "../../ui/Input/Input";
import Tile from "../../Tile/Tile";
import cl from "./Playlists.module.css";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/Header";
import { connect } from "react-redux";
import { getAlbums } from "../../../bll/selectors/albumsSelectors";
import { Formik, Form } from "formik";

const Playlists = ({ albums }) => {
    return (
        <div className={cl.playlists}>
            <Header title="Playlists" subtitle="1 Playlist" />

            <Formik
                initialValues={{
                    query: "",
                }}
                // onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Input
                            name="query"
                            value={values.query}
                            placeholder="Search in Tracks"
                            icon={faMicrophone}
                        />
                    </Form>
                )}
            </Formik>

            <div className={cl.items}>
                {albums.map(album => (
                    <Tile {...album} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    albums: getAlbums(state),
});

export default connect(mapStateToProps)(Playlists);

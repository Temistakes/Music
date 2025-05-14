import React, { useEffect } from "react";
import Tracks from "../Tracks/Tracks";
import { connect } from "react-redux";
import { getAlbum } from "../../../bll/reducers/albumReducer";
import { getTitle } from "../../../bll/selectors/albumSelector";
import { useParams } from "react-router-dom";

const Album = ({ title, getAlbum }) => {
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getAlbum(id);
    }, [id]);

    return <Tracks albumId={id} title={title} />;
};

const mapStateToProps = state => ({
    title: getTitle(state),
});

export default connect(mapStateToProps, {
    getAlbum,
})(Album);

import React from "react";
import { useEffect } from "react";
import {
    getCurrentArtist,
    getCurrentId,
} from "../../../bll/selectors/artistsSelector";
import { getTrackPages } from "../../../bll/reducers/tracksReducer";
import { getArtist } from "../../../bll/reducers/artistReducer";
import Tracks from "../Tracks/Tracks";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const ArtistPage = ({ getTrackPages, getArtist, artist, ...props }) => {
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getArtist(id);
    }, [id]);

    return (
        <Tracks title={artist.name} artistId={id} artistImg={artist.image} />
    );
};

const mapStateToProps = (state) => ({
    artist: getCurrentArtist(state),
});

export default connect(mapStateToProps, {
    getTrackPages,
    getArtist,
})(ArtistPage);

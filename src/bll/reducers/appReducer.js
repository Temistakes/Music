import { createRef } from "react";
import TracksAPI from "../../api/tracksApi";

const SET_TRACK = "music/app/SET_TRACK";
const SET_TIME = "music/app/SET_TIME";
const SET_PLAYING = "music/app/SET_PLAYING";
const SET_VOLUME = "music/app/SET_VOLUME";
const SET_LOOPING = "music/app/SET_LOOPING";
const SET_DURATION = "music/app/SET_DURATION";
const SET_POSITION = "music/app/SET_POSITION";
const SET_ALBUM_TRACKS = "music/app/SET_ALBUM_TRACKS";
const ADD_ALBUM = "music/app/ADD_ALBUM";
const SET_LOADING = "music/app/SET_LOADING";
const SET_ERROR = "music/app/SET_ERROR";
const SET_BACKGROUND = "music/app/SET_BACKGROUND";
const SET_COLOR = "music/app/SET_COLOR";

const initialState = {
    track: {},
    albums: [],
    albumTracks: [],
    time: 0,
    playing: false,
    looping: false,
    volume: 1,
    ref: createRef(),
    position: 1,
    disableLeft: true,
    disableRight: true,
    loading: false,
    error: null,
    background: "https://gagaru.club/uploads/posts/2023-12/1703104084_gagaru-club-p-krasivii-zadnii-fon-vkontakte-5.jpg",
    color: "#ff3d00",
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case (SET_TRACK):
            return {
                ...state,
                track: action.track,
                time: 0,
                playing: false,
                looping: false,
            }
        case (SET_TIME):
            return {
                ...state,
                time: action.time,
            }
        case (SET_PLAYING):
            return {
                ...state,
                playing: action.playing,
            }
        case (SET_VOLUME):
            return {
                ...state,
                volume: action.volume,
            }
        case (SET_LOOPING):
            return {
                ...state,
                looping: action.looping,
            }
        case (SET_DURATION):
            return {
                ...state,
                track: {...state.track, duration: action.duration},
            }
        case (SET_POSITION):
            return {
                ...state,
                position: action.position,
                disableLeft: action.position === 1,
                disableRight: !(state.position < state.albumTracks.length),
            }
        case (SET_ALBUM_TRACKS):
            return {
                ...state,
                albumTracks: action.tracks,
            }
        case (ADD_ALBUM):
            return {
                ...state,
                albums: [ ...state.albums, action.album ],
            }
        case (SET_LOADING):
            return {
                ...state,
                loading: action.loading,
            }
        case (SET_ERROR):
            return {
                ...state,
                error: action.error,
            }
        case (SET_BACKGROUND):
            return {
                ...state,
                background: action.background,
            }
        case (SET_COLOR):
            return {
                ...state,
                color: action.color,
            }
        default:
            return state;
    }
}

// AC

export const setTrackObj = (track) => ({
    type: SET_TRACK,
    track,
});

export const setTime = (time) => ({
    type: SET_TIME,
    time,
});

export const setPlaying = (playing) => ({
    type: SET_PLAYING,
    playing,
});

export const setVolume = (volume) => ({
    type: SET_VOLUME,
    volume,
});

export const setLooping = (looping) => ({
    type: SET_LOOPING,
    looping,
})

export const setDuration = (duration) => ({
    type: SET_DURATION,
    duration,
});

export const setPosition = (position) => ({
    type: SET_POSITION,
    position,
});

export const setAlbumTracks = (tracks) => ({
    type: SET_ALBUM_TRACKS,
    tracks,
});

export const addAlbum = (album) => ({
    type: ADD_ALBUM,
    album,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading,
});

export const setError = (error) => ({
    type: SET_ERROR,
    error,
});

export const setBackground = (background) => ({
    type: SET_BACKGROUND,
    background,
});

export const setColor = (color) => ({
    type: SET_BACKGROUND,
    color,
});

// TC

export const setTrack = (id, albums, isPlay, loading) => async dispatch => {
    if (!loading) {
        try {
            dispatch(setLoading(true));

            let track, currentAlbum;

            albums.forEach(album => {
                track = album.find(track => track.id === id);
                currentAlbum = album;
            });

            if (track) {
                dispatch(setAlbumTracks(currentAlbum));
            }   else {
                track = await TracksAPI.getTrack(id);

                const tracks = await TracksAPI.getTracks(0, 200, "", track.album_id, null, null, 300);
                dispatch(setAlbumTracks(tracks.data.results));
                dispatch(addAlbum(tracks.data.results));
            }

            dispatch(setPosition(track.position));
            dispatch(setTrackObj(track));
            if (!isPlay) {
                dispatch(setPlaying(true));
            }
        }   catch (err) {
            dispatch(setError(err.message));
        }   finally {
            dispatch(setLoading(false));
        }
    }
}

export const prev = (albumTracks, position, albums) => async dispatch => {
    if (position > 1) {
        dispatch(setPosition(position - 1));
        dispatch(setTrack(albumTracks.find(track => +track.position === (position - 1)).id, albums));
    }
}

export const next = (albumTracks, position, albums) => async dispatch => {
    if (position < albumTracks.length) {
        dispatch(setPosition(position + 1));
        dispatch(setTrack(albumTracks.find(track => +track.position === (position + 1)).id, albums));
    }
}
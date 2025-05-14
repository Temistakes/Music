import AlbumsAPI from "../../api/albumsApi";

const SET_TITLE = "music/albums/SET_TITLE";
const SET_ALBUM = "music/albums/SET_ALBUM";

const initialState = {
    name: "Album",
}

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SET_TITLE):
            return {
                ...state,
                title: action.title,
            }
        case (SET_ALBUM):
            return {
                ...state,
                ...action.album,
            }
        default:
            return state;
    }
}

// AC

export const setTitle = (title) => ({
    type: SET_TITLE,
    title,
});

export const setAlbum = (album) => ({
    type: SET_ALBUM,
    album,
});

// TC

export const getAlbum = id => async dispatch => {
    const response = await AlbumsAPI.getAlbum(id);
    dispatch(setAlbum(response));
};

export default albumReducer;
import ArtistsAPI from "../../api/artistApi";

const ADD_ITEM = "music/artist/ADD_ITEM";
const SET_ITEMS = "music/artist/SET_ITEMS";
const SET_TOTAL = "music/artist/SET_TOTAL";
const SET_PAGE = "music/artist/SET_PAGE";
const ADD_ITEMS = "music/artist/ADD_ITEMS";
const CLEAR = "music/artist/CLEAR";
const SET_CURRENT_ID = "music/artist/SET_CURRENT_ID";
const SET_CURRENT_ARTIST = "music/artist/SET_CURRENT_ARTIST";
const SET_ORDER = "music/artist/SET_ORDER";

const initialState = {
    items: [],
    total: 100,
    page: 0,
    limit: 10,
    currentId: null,
    currentArtist: {},
    order: "name",
}

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SET_ITEMS):
            return {
                ...state,
                items: action.items,
            }
        case (ADD_ITEM):
            return {
                ...state,
                items: [ ...state.items, action.item ],
            }
        case (ADD_ITEMS):
            return {
                ...state,
                items: [ ...state.items, ...action.items ],
            }
        case (CLEAR):
            return {
                ...state,
                items: [],
                total: 100,
                page: 0,
            }
        case (SET_TOTAL):
            return {
                ...state,
                total: action.total,
            }
        case (SET_PAGE):
            return {
                ...state,
                page: action.page,
            }
        case (SET_CURRENT_ID):
            return {
                ...state,
                id: action.id,
            }
        case (SET_CURRENT_ARTIST):
            return {
                ...state,
                currentArtist: action.artist,
            }
        case (SET_ORDER):
            return {
                ...state,
                order: action.order,
            }
        default:
            return state;
    }
}

// AC

export const setItems = (items) => ({
    type: SET_ITEMS,
    items,
});

export const addItems = (items) => ({
    type: ADD_ITEMS,
    items,
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    item,
});

export const clearArtists = () => ({
    type: CLEAR,
});

export const setTotal = (total) => ({
    type: SET_TOTAL,
    total,
});

export const setPage = (page) => ({
    type: SET_PAGE,
    page,
});

export const setCurrentId = (id) => ({
    type: SET_CURRENT_ID,
    id,
});

export const setCurrentArtist = (artist) => ({
    type: SET_CURRENT_ARTIST,
    artist,
});

export const setOrder = (order) => ({
    type: SET_ORDER,
    order,
});

// TC

export const getArtistPages = (offset, limit, query, order) => async dispatch => {
    const response = await ArtistsAPI.getArtists(offset, limit, query, order);
    dispatch(addItems(response.data.results));
    dispatch(setTotal(response.data.headers.results_fullcount));
};

export const getArtist = (id) => async dispatch => {
    const response = await ArtistsAPI.getArtist(id);
    dispatch(setCurrentArtist(response));
}

export default artistsReducer;
import TracksAPI from "../../api/tracksApi";

const ADD_ITEMS = "music/tracks/ADD_ITEMS";
const SET_ITEMS = "music/tracks/SET_ITEMS";
const SET_PAGE = "music/tracks/SET_PAGE";
const SET_TOTAL = "music/tracks/SET_TOTAL";
const SET_ORDER = "music/tracks/SET_ORDER";
const CLEAR = "music/tracks/CLEAR";

const initialState = {
    items: [],
    limit: 10,
    page: 0,
    total: 100,
    order: "relevance",
}

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_ITEMS):
            return {
                ...state,
                items: [ ...state.items, ...action.items ],
            }
        case (SET_ITEMS):
            return {
                ...state,
                items: [ ...action.items ],
            }
        case (SET_PAGE):
            return {
                ...state,
                page: action.page,
            }
        case (SET_TOTAL):
            return {
                ...state,
                total: action.total,
            }
        case (CLEAR):
            return {
                ...state,
                items: [],
                page: 0,
                total: 100,
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

export const addTracks = (items) => ({
    type: ADD_ITEMS,
    items,
})

export const setTracks = (items) => ({
    type: SET_ITEMS,
    items,
})

export const setPage = (page) => ({
    type: SET_PAGE,
    page,
});

export const setTotal = (total) => ({
    type: SET_TOTAL,
    total,
});

export const clearTracks = () => ({
    type: CLEAR,
});

export const setOrder = (order) => ({
    type: SET_ORDER,
    order,
})

// TC

export const getTrackPages = (offset, limit, query, albumId, artistId, order) => async dispatch => {
    const response = await TracksAPI.getTracks(offset, limit, query, albumId, artistId, order);
    dispatch(addTracks(response.data.results));
    dispatch(setTotal(response.data.headers.results_fullcount));
}

export default tracksReducer;
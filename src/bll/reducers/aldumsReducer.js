import AlbumsAPI from "../../api/albumsApi";

const ADD_ITEM = "music/albums/ADD_ITEM";
const SET_ITEMS = "music/albums/SET_ITEMS";
const SET_TOTAL = "music/albums/SET_TOTAL";
const SET_PAGE = "music/albums/SET_PAGE";
const ADD_ITEMS = "music/albums/ADD_ITEMS";
const SET_ORDER = "music/albums/SET_ORDER";
const CLEAR = "music/albums/CLEAR";

const initialState = {
    items: [],
    total: 100,
    page: 0,
    limit: 10,
    artistLimit: 4,
    order: "name",
}

const albumsReducer = (state = initialState, action) => {
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

export const clearAlbums = () => ({
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

export const setOrder = (order) => ({
    type: SET_ORDER,
    order,
});

// TC

export const getAlbumsPages = (offset, limit, query, artistId, order) => async dispatch => {
    const response = await AlbumsAPI.getAlbums(offset, limit, query, artistId, order);
    dispatch(addItems(response.data.results));
    dispatch(setTotal(response.data.headers.results_fullcount));
};

export default albumsReducer;
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import { compose } from "redux";

import appReducer from "./reducers/appReducer";
import tracksReducer from "./reducers/tracksReducer";
import albumsReducer from "./reducers/aldumsReducer";
import albumReducer from "./reducers/albumReducer";
import artistsReducer from "./reducers/artistReducer";

const reducers = combineReducers({
    app: appReducer,
    tracks: tracksReducer,
    albums: albumsReducer,
    album: albumReducer,
    artists: artistsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
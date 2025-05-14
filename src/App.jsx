import { connect } from "react-redux";
import "./App.css";
import Control from "./components/Control/Control";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import {
    getBackground,
    getLooping,
    getRef,
    getSrc,
} from "./bll/selectors/appSelectors";
import { setDuration, setTime } from "./bll/reducers/appReducer";
import { useEffect } from "react";

function App({ src, looping, audio, setDuration, background, ...props }) {
    useEffect(() => {
        audio.current?.addEventListener("loadedmetadata", () => {
            setDuration(audio.current.duration);
        });
        audio.current.src = src;
    }, [src, audio.current]);

    const img = {
        backgroundImage: `url(${background})`,
    };

    return (
        <BrowserRouter>
            <div className="app" style={img}>
                <div className="container">
                    <div className="content-wrap">
                        <Main />
                        <Control />
                    </div>
                </div>
            </div>
            <audio src={src} ref={audio} />
        </BrowserRouter>
    );
}

const mapStateToProps = state => ({
    src: getSrc(state),
    looping: getLooping(state),
    audio: getRef(state),
    background: getBackground(state),
});

export default connect(mapStateToProps, {
    setDuration,
})(App);

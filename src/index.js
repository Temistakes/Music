import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AudioPlayerProvider } from 'react-use-audio-player';
import store from './bll/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AudioPlayerProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </AudioPlayerProvider>
);
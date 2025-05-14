export const getTrack = (state) => state.app.track;
export const getSrc = (state) => state.app.track.audio;
export const getLooping = (state) => state.app.looping;
export const getName = (state) => state.app.track.name;
export const getArtist = (state) => state.app.track.artist_name;
export const getDuration = (state) => state.app.track.duration;
export const getRef = (state) => state.app.ref;
export const getPlaying = (state) => state.app.playing;
export const getVolume = (state) => state.app.volume;
export const getTime = (state) => state.app.time;
export const getAlbumTracks = (state) => state.app.albumTracks;
export const getPosition = (state) => state.app.position;
export const getDisabled = (state) => ({
    left: state.app.disableLeft,
    right: state.app.disableRight,
});
export const getAlbums = (state) => state.app.albums;
export const getLoading = (state) => state.app.loading;
export const getBackground = (state) => state.app.background;
export const getColor = (state) => state.app.color;
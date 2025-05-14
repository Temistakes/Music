import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.jamendo.com/v3.0/albums/",
    params: {
        client_id: "80ba0fa7",
        format: "json",
    },
});

export default class AlbumsAPI {

    static async getAlbums(offset = 0, limit = 10, query = "", artistId, order = "name") {
        return instance.get("/", {
            params: {
                offset,
                limit,
                namesearch: query,
                fullcount: true,
                artist_id: artistId,
                order: order,
            },
        }).then(response => response);
    }

    static async getAlbum(id) {
        return instance.get("/", {
            params: {
                id,
                limit: 1,
            },
        }).then(response => response.data.results[0]);
    }

    static async getAlbumTracks(id) {
        return instance.get("/tracks/", {
            params: {
                id,
            }
        }).then(response => response.data.results[0].tracks);
    }

}
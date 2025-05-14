import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.jamendo.com/v3.0/tracks/",
    params: {
        client_id: "80ba0fa7",
        format: "json",
    }
});

export default class TracksAPI {

    static async getTracks(offset = 0, limit = 10, query = "", albumId, artistId, order = "relevance", imgSize = 50) {
        return instance.get("/", {
            params: {
                limit: String(limit),
                offset,
                namesearch: query,
                fullcount: true,
                album_id: albumId,
                artist_id: artistId,
                imagesize: imgSize,
                order: albumId ? "album_name" : order,
            }
        }).then(response => response);
    }

    static async getTrack(id) {
        return instance.get("/", {
            params: {
                id,
                include: "musicinfo",
            }
        }).then(response => response.data.results[0]);
    }

}


import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.jamendo.com/v3.0/artists/",
    params: {
        client_id: "80ba0fa7",
        format: "json",
    },
});

export default class ArtistsAPI {

    static async getArtists(offset = 0, limit = 10, query = "", order = "name") {
        return instance.get("/", {
            params: {
                limit,
                offset,
                namesearch: query,
                fullcount: true,
                order: order,
            },
        });
    }

    static async getArtist(id) {
        return instance.get("/", {
            params: {
                id,
            },
        }).then(response => response.data.results[0]);
    }

}
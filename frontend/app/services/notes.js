const { httpClient } = require("./httpClient");

export const getNotes = async () => await httpClient.get("api/v1/notes").data;
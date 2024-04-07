const { httpClient } = require("./httpClient");

export const getNotes = async () => await httpClient.get("api/v1/notes").data;

export const deleteNoteById = async(id) => await httpClient.post(`api/v1/notes/${id}/delete`).data;

export const archiveNoteById = async(id) => await httpClient.post(`api/v1/notes/${id}/archive`).data;
const { httpClient } = require("./httpClient");

export const getNotes = async () => await httpClient.get("api/v1/notes").data;

export const deleteNoteById = async(id) => await httpClient.post(`api/v1/notes/${id}/delete`).data;

export const archiveNoteById = async(id) => await httpClient.post(`api/v1/notes/${id}/archive`).data;

export const deleteNoteTag = async(noteId,tagId) => await httpClient.post(`api/v1/notes/${noteId}/archive`).data;

export const updateNote = async(noteId,text) => await httpClient.post()
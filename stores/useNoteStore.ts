import { create } from "zustand";
import { baseList } from "..";

type storeData = {
    noteList: baseList[],
    setNoteList: (data: fetchData) => void,
    deleteNote: (id: number, jwt: string) => void,
    reset: () => void
}
type fetchData = {
    noteId: number,
    userId: number,
    text: string,
    height: number
}


export const useNoteStore = create((set, get: () => storeData) => ({
    noteList: [],
    setNoteList: (data: fetchData) => set(status => {
        return { noteList: [...status.noteList, { id: data.noteId, text: data.text, height: data.height }] }
    }),
    deleteNote: async (id: number, jwt: string) => set(status => {
        const newArray = status.noteList.filter(data => data.id !== id)
        fetch('api/deleteNote', { method: 'delete', body: JSON.stringify(id), headers: { 'Authorization': `Bearer ${jwt}` } })
        return { noteList: newArray }
    }),
    reset: () => set({ noteList: [] })
}))
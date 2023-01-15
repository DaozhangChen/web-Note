import { create } from "zustand";
import { baseList } from "..";

type storeData = {
    noteList: baseList[],
    setNoteList: (data: fetchData) => void,
    delectNote: (id: number) => void,
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
    delectNote: (id: number) => set(status => {
        const newArray = status.noteList.filter(data => data.id !== id)
        return { noteList: newArray }
    }),
    reset: () => set({ noteList: [] })
}))
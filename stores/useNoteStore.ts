import { create } from "zustand";
import { addNoteData, baseList } from "..";

type storeData = {
    noteList: baseList[],
    addNote: (formData: addNoteData, jwt: string) => void,
    setNoteList: (data: fetchData) => void,
    deleteNote: (id: number, jwt: string) => void,
    fetchList: (jwt: string) => void,
    patchNote: (formData: Omit<fetchData, | 'userId'>, jwt: string) => void,
    syncPatchNote: (formData: Omit<fetchData, | 'userId'>) => void,
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
    addNote: async (formData: addNoteData, jwt: string) => {
        const response = await fetch('/api/addNote', {
            method: 'post', body: JSON.stringify(formData),
            headers: { 'Authorization': `Bearer ${jwt}` }
        })
        const jsonData = await response.json()
        set({ noteList: [...get().noteList, { id: jsonData.data.insertId, text: formData.text, height: formData.height }] })
    },
    setNoteList: (data: fetchData) => set(status => {
        return { noteList: [...status.noteList, { id: data.noteId, text: data.text, height: data.height }] }
    }),
    deleteNote: async (id: number, jwt: string) => set(status => {
        const newArray = status.noteList.filter(data => data.id !== id)
        fetch('api/deleteNote', { method: 'delete', body: JSON.stringify(id), headers: { 'Authorization': `Bearer ${jwt}` } })
        return { noteList: newArray }
    }),
    fetchList: (jwt: string) => {
        fetch('/api/getList', { method: 'get', headers: { 'Authorization': `Bearer ${jwt}` } })
            .then((response) => { return response.json() })
            .then(jsonData => {
                const dataList: fetchData[] = jsonData.data
                get().reset()
                dataList.forEach((data) => {
                    get().setNoteList(data)
                })
            })
    },
    patchNote: (formData: Omit<fetchData, 'userId'>, jwt: string) => {
        fetch('/api/patchNote', { method: 'PATCH', body: JSON.stringify(formData), headers: { 'Authorization': `Bearer ${jwt}` } })
    },
    syncPatchNote: (formData: Omit<fetchData, 'userId'>) => {
        const findArray = get().noteList.find(list => list.id === formData.noteId)
        if (findArray) {
            findArray.height = formData.height
            findArray.text = formData.text
        }
        console.log(get().noteList)
    },

    reset: () => set({ noteList: [] })
}))
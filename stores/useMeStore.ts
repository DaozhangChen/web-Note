import { create } from "zustand";

type storeData = {
    userId: number,
    userName: string,
    fetchMe: (jwt: string) => void
}

export const useMeStore = create((set, get: () => storeData) => ({
    userId: 13,
    userName: 'a1588',
    fetchMe: async (jwt) => {
        const response = await fetch('/api/me', { method: 'get', headers: { 'Authorization': `Bearer ${jwt}` } })
        console.log(response)
    }
}))
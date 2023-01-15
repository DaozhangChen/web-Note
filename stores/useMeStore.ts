import { create } from "zustand";

type storeData = {
    userId: number,
    userName: string,
    fetchMe: (jwt: string) => void,
    patchUserId: (newId: number) => void,
    patchUserName: (newUserName: string) => void,
    reset: () => void
}
type Data = {
    userId?: number,
    userName?: string,
    error?: string
}

export const useMeStore = create((set, get: () => storeData) => ({
    userId: 0,
    userName: '',
    patchUserId: (newId: number) => set({ userId: newId }),
    patchUserName: (newUserName: string) => set({ userName: newUserName }),
    reset: () => set({ userId: 0, userName: '' }),
    fetchMe: async (jwt) => {
        const response = await fetch('/api/me', { method: 'get', headers: { 'Authorization': `Bearer ${jwt}` } })
        const status = response.status
        console.log(status)
        if (status >= 200 && status < 300) {
            const data: Data = await response.json()
            if (data.userId && data.userName) {
                get().patchUserId(data.userId)
                get().patchUserName(data.userName)
            }
        } else {
            get().reset()
        }
    }
}))
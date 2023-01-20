import { type } from "os"

export interface betterList extends baseList {
    top: number
    left: number
    zIndex?: number
}
export interface baseList {
    id: number
    text: string
    height: number
}
export interface noteListData {
    width: number
    leftArray: number[]
}
export interface formData {
    username: string
    password: string
}
export interface errorMessage {

    nameError?: string,
    pwdError?: string
}
export type addNoteData = Omit<baseList, 'id'>


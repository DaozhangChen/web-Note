export interface betterList extends baseList {
    top: number
    left: number
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
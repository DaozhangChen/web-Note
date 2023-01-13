import { baseList, betterList } from "../next-env"

export const returnNewArray = (list: baseList[], leftArray: number[], heightArray: number[]): betterList[] => {
    let count = 0
    const newArray: betterList[] = []
    list.forEach(noteList => {
        if (count < leftArray.length) {
            heightArray.push(10 + noteList.height)
            newArray.push(
                { id: noteList.id, top: 10, left: leftArray[count], text: noteList.text, height: noteList.height }
            )
        } else {
            const i = count % leftArray.length
            const height = heightArray[i] + 10
            heightArray[i] += noteList.height + 10
            newArray.push(
                { id: noteList.id, top: height, left: leftArray[i], text: noteList.text, height: noteList.height }
            )
        }
        ++count
    })
    return newArray
}
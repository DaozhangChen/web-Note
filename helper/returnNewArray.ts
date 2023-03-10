import { baseList, betterList } from ".."


export const returnNewArray = (list: baseList[], leftArray: number[], heightArray: number[]): betterList[] => {
    let count = 0
    let zIndex = list.length
    const newArray: betterList[] = []
    list.forEach(noteList => {
        if (count < leftArray.length) {
            heightArray.push(10 + noteList.height)
            newArray.push(
                {
                    id: noteList.id || noteList.noteId || 0,
                    top: 10, left: leftArray[count],
                    text: noteList.text,
                    height: noteList.height,
                    zIndex: zIndex
                }
            )
        } else {
            const i = count % leftArray.length
            const height = heightArray[i] + 10
            heightArray[i] += noteList.height + 10
            newArray.push(
                {
                    id: noteList.id || noteList.noteId || 0,
                    top: height,
                    left: leftArray[i],
                    text: noteList.text,
                    height: noteList.height,
                    zIndex: zIndex
                }
            )
        }
        ++count
        --zIndex
    })
    return newArray
}
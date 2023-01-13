import { noteListData } from "../next-env";

export const returnLeftListArray = (list: noteListData) => {
    const count = Math.floor((list.width - 20) / 250)
    const width = (list.width - count * 250) / (count + 2)
    let leftArray = []
    let currentLeft = width
    for (let i = 0; i < count; i++) {
        leftArray.push(currentLeft)
        currentLeft += width + 250
    }
    return { ...list, leftArray: leftArray }
}
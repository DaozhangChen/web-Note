import { noteListData } from ".."

export const returnLeftArray = (list: noteListData) => {
    const count = Math.floor((list.width - 40) / 250)
    const width = ((list.width - 20) - count * 250) / (count + 1)
    let leftArray = []
    let currentLeft = width + 10
    for (let i = 0; i < count; i++) {
        leftArray.push(currentLeft)
        currentLeft += width + 250
    }
    return { ...list, leftArray: leftArray }
}
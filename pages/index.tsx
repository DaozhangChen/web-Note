import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import Note from '../components/note'
import s from '../styles/index.module.scss'

interface noteListData {
  width: number,
  listCount: number,
  gapWidth: number,
  leftArray: number[]
}

export default function Home() {
  const baseList = [
    { id: 1, top: 10, left: 20, text: '31231321', height: 100 },
    { id: 2, top: 10, left: 270, text: '64', height: 150 },
    { id: 3, top: 10, left: 530, text: '64654654', height: 200 },
    { id: 4, top: 10, left: 800, text: '13213', height: 300 },
    { id: 5, top: 300, left: 20, text: '654654', height: 150 },
    { id: 6, top: 300, left: 270, text: '654654', height: 112 },
    { id: 7, top: 300, left: 530, text: '1321321', height: 130 },
    { id: 8, top: 300, left: 800, text: '645654', height: 140 },
    { id: 9, top: 600, left: 20, text: '65465487', height: 200 },
    { id: 10, top: 600, left: 270, text: '4654654', height: 180 },
    { id: 11, top: 600, left: 800, text: '3232465464', height: 130 }
  ]
  const [list, setList] = useState(baseList)
  const [noteListData, setNoteListData] = useState<noteListData>({ width: 1000, listCount: 3, gapWidth: 10, leftArray: [0, 0, 0] })
  useEffect(() => {
    if (window.innerWidth) {
      setNoteListData(list => ({ ...list, width: window.innerWidth }))
      window.addEventListener('resize', () => {
        setNoteListData(list => ({ ...list, width: window.innerWidth }))
      })
    }
  }, [])
  useEffect(() => {
    if (noteListData.width) {
      setNoteListData(list => {
        const count = Math.floor(list.width / 250)
        const width = (list.width - 40 - count * 250) / count
        let leftArray = []
        let currentLeft = width
        for (let i = 0; i < count; i++) {
          leftArray.push(currentLeft)
          currentLeft += width + 250
        }
        return { ...list, gapWidth: width, listCount: count, leftArray: leftArray }
      })
    }
  }, [noteListData.width])
  useEffect(() => {
    const leftArray = noteListData.leftArray
    let count = 0
    let heightArray: number[] = []
    const a = list.map(noteList => {
      if (count < 4) {
        heightArray.push(noteList.height)
        ++count
        return { ...noteList, left: leftArray[count - 1] }
      } else {
        const i = count % heightArray.length
        const height = heightArray[i]
        heightArray[i] += noteList.height + 10
        ++count
        return { ...noteList, top: height + 20, left: leftArray[i] }
      }
    })
    setList(a)

  }, [noteListData.gapWidth])

  return (
    <>
      <Head>
        <title>便利贴</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={s.wrapper}>
        <div className={s.background}>
          <Image src="/background.svg" alt='背景图片' fill priority property="true" />
        </div>
        <NavBar />
        <div className={s.noteWrapper}>
          {list.map(note => <Note key={note.id} id={note.id} changeText={setList} top={note.top} left={note.left} text={note.text} height={note.height} />)}
        </div>
      </main>
    </>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import NavBar from '../components/navBar'
import Note from '../components/note'
import { returnLeftArray } from '../helper/returnLeftArray'
import { returnNewArray } from '../helper/returnNewArray'
import { betterList, baseList } from '..'
import s from '../styles/index.module.scss'
import { useRouter } from 'next/router'

interface noteListData {
  width: number,
  leftArray: number[]
}

export default function Home() {
  const router = useRouter()
  const [list, setList] = useState<baseList[]>([])
  const [betterList, setBetterList] = useState<betterList[]>()
  const [noteListData, setNoteListData] = useState<noteListData>({ width: 100, leftArray: [0] })
  useEffect(() => {
    fetch('/api/getUser', { method: 'get' }).then((a) => {
      return a.json()
    }).then((b => {
      // console.log(b)
    }))
    fetch('/api/getList', { method: 'get' }).then((promiseData) => {
      return promiseData.json()
    }, (res) => {
      console.log(res)
    }).then((a) => {
      setList(a.data)
    })
    if (window.innerWidth) {
      setNoteListData(list => ({ ...list, width: window.innerWidth }))
      window.addEventListener('resize', () => {
        setNoteListData(list => ({ ...list, width: window.innerWidth }))
      })
    }
  }, [])
  const gapWidth = useMemo(() => {
    const count = Math.floor((noteListData.width - 40) / 250)
    return (noteListData.width - count * 250) / (count + 2)
  }, [noteListData])
  useEffect(() => {
    if (noteListData.width) {
      setNoteListData(list => {
        return returnLeftArray(list)
      })
    }
  }, [noteListData.width])
  useEffect(() => {
    const leftArray = noteListData.leftArray
    const heightArray: number[] = []
    setBetterList(returnNewArray(list, leftArray, heightArray))
  }, [gapWidth, list, noteListData.leftArray])

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
          {betterList?.map(note => <Note
            key={note.id}
            id={note.id}
            changeText={setList}
            top={note.top}
            left={note.left}
            text={note.text}
            height={note.height} />)}
        </div>
      </main>
    </>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import { MouseEventHandler, useEffect, useMemo, useState } from 'react'
import NavBar from '../components/navBar'
import Note from '../components/note'
import { returnLeftArray } from '../helper/returnLeftArray'
import { returnNewArray } from '../helper/returnNewArray'
import { betterList } from '..'
import s from '../styles/index.module.scss'
import { NextPage } from 'next'
import { useMeStore } from '../stores/useMeStore'
import { useNoteStore } from '../stores/useNoteStore'
import { randomColor } from '../helper/randomColor'

interface noteListData {
  width: number,
  leftArray: number[]
}

const Home: NextPage = () => {
  const { noteList, deleteNote, fetchList } = useNoteStore()
  const [betterList, setBetterList] = useState<betterList[]>()
  const [noteListData, setNoteListData] = useState<noteListData>({ width: 100, leftArray: [0] })
  const [jwt, setJwt] = useState<string>()
  const meStoreFetch = useMeStore(state => state.fetchMe)
  const { jwt: trueJwt } = useMeStore()

  const deleteData: MouseEventHandler = (e) => {
    const id = (e.target as Element).id
    if (jwt && trueJwt) {
      deleteNote(+id, jwt)
    }
  }
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      setJwt(jwt)
      meStoreFetch(jwt)
      fetchList(jwt)
    }
    if (window.innerWidth) {
      setNoteListData(list => ({ ...list, width: window.innerWidth }))
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 315) {
          setNoteListData(list => ({ ...list, width: window.innerWidth }))
        }
      })
      window.addEventListener('storage', (e: StorageEvent) => {
        if (e.key === 'jwt') {
          meStoreFetch(e.newValue || '')
        }
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
    setBetterList(returnNewArray(noteList, leftArray, heightArray))
  }, [gapWidth, noteList, noteListData.leftArray])

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
            color={randomColor[Math.floor(Math.random() * randomColor.length)]}
            key={note.id}
            id={note.id}
            top={note.top}
            left={note.left}
            text={note.text}
            height={note.height}
            zIndex={note.zIndex}
            onClick={deleteData} />)}
        </div>
      </main>
    </>
  )
}


export default Home
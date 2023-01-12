import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/navBar'
import Note from '../components/note'
import s from '../styles/index.module.scss'

export default function Home() {
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
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </main>
    </>
  )
}

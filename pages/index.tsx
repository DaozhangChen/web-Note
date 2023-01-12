import Head from 'next/head'
import NavBar from '../components/navBar'

export default function Home() {
  return (
    <>
      <Head>
        <title>便利贴</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <h1>Hello World</h1>
      </main>
    </>
  )
}

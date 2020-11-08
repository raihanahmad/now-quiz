import Head from 'next/head'
import Login from './Login'

export default function Home() {
  return (
    <>
      <Head>
        <title>Now Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Login/>

    </>
  )
}

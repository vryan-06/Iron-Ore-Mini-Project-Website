import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MainPage from '@/components/MainPage'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
        <title>FeroCity</title>
    </Head>
    <Navbar></Navbar>
    <MainPage></MainPage>
    <Footer></Footer>
    </>
  )
}
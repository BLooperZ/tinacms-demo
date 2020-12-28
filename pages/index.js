import Head from 'next/head'
import { getAllGames } from '../helpers/games'
import GameList from '../components/GameList'

const Home = ({ games }) => {
  return (
    <>
      <Head>
        <title>Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameList games={games}/>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      games: getAllGames()
    }
  }
}

export default Home

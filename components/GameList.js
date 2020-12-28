import GameCard from './GameCard'

const GameList = ({games}) => {
  return (
    <ul>
      {games.map(game => (
        <li key={game.fileName}><GameCard game={game} /></li>
      ))}
    </ul>
  )
}

export default GameList

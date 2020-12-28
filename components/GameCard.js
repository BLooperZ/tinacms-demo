import react, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const GameCard = ({ game }) => {
  const imgSrc = useMemo(() => (
    game.frontmatter.image ?? `/images/comming_soon.jpeg`
  ), [game.frontmatter.image])
  return (
    <div>
      <Image src={imgSrc} width={320} height={200} />
      <Link href={game.fileName}><a><h2>{game.frontmatter.title}</h2></a></Link>
    </div>
  )
}

export default GameCard

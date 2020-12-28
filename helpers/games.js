import fs from 'fs'
import { join } from 'path'
import { parseMdFile, dataDirectory } from './markdown'

const gamesDirectory = join(dataDirectory, 'games')

export const getAllGameSlugs = () => {
  return fs.readdirSync(gamesDirectory).filter(f => f.endsWith('.md'))
}

export const getAllGames = () => {
  return getAllGameSlugs().map(f => parseMdFile(`games/${f}`))
}

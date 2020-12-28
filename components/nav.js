import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
      </ul>
    </nav>
  )
}

export default Nav

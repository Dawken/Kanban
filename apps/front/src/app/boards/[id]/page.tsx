import React from 'react'
import Layout from '@src/layout/layout'
import Board from '@src/app/boards/[id]/board/board'

const Page = () => {
    return <Board />
}

export default Layout(Page)

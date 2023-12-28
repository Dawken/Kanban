import { BoardProps } from '@src/types/boardProps'
import React from 'react'
import Link from 'next/link'
import ToolTip from '@src/components/ui/toolTip'
import useToggleOpen from '@src/hooks/useToogleOpen'
import { Dialog, DialogTitle, IconButton } from '@mui/material'
import BoardForm from '@src/components/ui/boardForm'
import FormButton from '@src/components/ui/formButton'
import EditIcon from '@mui/icons-material/Edit'
import useToggleHover from '@src/hooks/useToogleHover'
import useBoard from '@src/layout/sidebarMenu/boards/board/useBoard'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'

type BoardsProps = {
    board: BoardProps
    expanded: boolean
}
const Board = ({ board, expanded }: BoardsProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { isHover, handleHover, handleUnhover } = useToggleHover()

    const { methods, loading, error, updateBoard } = useBoard({ board })

    return (
        <>
            <ToolTip name={board.boardName}>
                <div
                    className='w-full h-12 bg-zinc-900 rounded-md flex items-center font-bold hover:bg-gradient-to-br from-[#00dffc] to-[#00ff82] hover:text-black'
                    onMouseEnter={handleHover}
                    onMouseLeave={handleUnhover}
                >
                    <Link
                        href={`/boards/${board.id}`}
                        className={
                            'ml-[1.15rem] w-full h-full text-sm flex justify-start items-center whitespace-nowrap overflow-hidden'
                        }
                    >
                        <DashboardRoundedIcon className='text-2xl' />
                        {expanded && (
                            <div className='overflow-hidden overflow-ellipsis mx-2'>
                                {board.boardName}
                            </div>
                        )}
                    </Link>
                    {expanded && (
                        <div className='ml-auto mr-1'>
                            <IconButton onClick={handleOpen}>
                                <EditIcon
                                    className={`${
                                        isHover ? 'opacity-100' : 'opacity-0'
                                    } transition-opacity duration-300 ease-in-out text-lg text-black`}
                                />
                            </IconButton>
                        </div>
                    )}
                </div>
            </ToolTip>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <div className='m-3'>
                    <DialogTitle className='text-2xl font-bold'>
                        Edit Board
                    </DialogTitle>
                    <BoardForm
                        methods={methods}
                        submitAction={updateBoard()}
                        ActionButton={
                            <FormButton
                                text={'Edit Board'}
                                loading={loading}
                                error={error}
                            />
                        }
                    />
                </div>
            </Dialog>
        </>
    )
}
export default Board

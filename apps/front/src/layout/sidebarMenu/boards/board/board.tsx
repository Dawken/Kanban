import { BoardProps } from '@src/types/boardProps'
import React from 'react'
import Link from 'next/link'
import ToolTip from '@src/components/ui/toolTip'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { Dialog } from '@mui/material'
import BoardForm from '@src/components/ui/boardForm'
import FormButton from '@src/components/ui/formButton'
import EditIcon from '@mui/icons-material/Edit'
import useToggleHover from '@src/hooks/useToggleHover'
import useBoard from '@src/layout/sidebarMenu/boards/board/useBoard'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import DeleteBoard from '@src/layout/sidebarMenu/boards/board/deleteBoard/deleteBoard'
import { useParams } from 'next/navigation'
import { DragIdProps } from '@src/types/dragIdProps'

type BoardsProps = {
    board: BoardProps
    expanded: boolean
    dragId?: DragIdProps
}

const Board = ({ board, expanded, dragId }: BoardsProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { isHover, handleHover, handleUnhover } = useToggleHover()

    const { methods, loading, error, updateBoard } = useBoard({ board })

    const params = useParams()

    return (
        <>
            <ToolTip name={dragId ? '' : board.boardName}>
                <div
                    className={`${
                        params.id === board.id
                            ? 'bg-gradient-to-br from-[#00dffc] to-[#00ff82] text-black'
                            : 'bg-zinc-900'
                    } w-full h-12 rounded-md flex items-center font-bold hover:bg-gradient-to-br from-[#00dffc] to-[#00ff82] hover:text-black shadow-2xl`}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleUnhover}
                >
                    <Link
                        href={`/boards/${board.id}`}
                        className={
                            'w-full h-full text-sm flex justify-start items-center whitespace-nowrap overflow-hidden'
                        }
                    >
                        <DashboardRoundedIcon className='text-2xl ml-[1.15rem] ' />
                        {expanded && (
                            <div className='overflow-hidden overflow-ellipsis mx-2'>
                                {board.boardName}
                            </div>
                        )}
                    </Link>
                    {expanded && (
                        <div
                            className={`flex items-center ml-auto mr-1  transition-opacity duration-300 ease-in-out text-black gap-1 ${
                                isHover ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <EditIcon
                                className={'text-lg'}
                                onClick={handleOpen}
                            />
                            <DragIndicatorIcon />
                        </div>
                    )}
                </div>
            </ToolTip>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <div className='m-3'>
                    <div className='m-6 flex justify-between items-center'>
                        <div className='text-2xl font-bold'>Edit Board</div>
                        <DeleteBoard boardId={board.id} />
                    </div>
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

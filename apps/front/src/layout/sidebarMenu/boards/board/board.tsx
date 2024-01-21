import { BoardProps } from '@src/types/boardProps'
import React from 'react'
import Link from 'next/link'
import ToolTip from '@src/components/ui/toolTip'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { CircularProgress, Dialog, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import useToggleHover from '@src/hooks/useToggleHover'
import useBoard from '@src/layout/sidebarMenu/boards/board/useBoard'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import DeleteBoard from '@src/layout/sidebarMenu/boards/board/deleteBoard/deleteBoard'
import { useParams } from 'next/navigation'
import { DragIdProps } from '@src/types/dragIdProps'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { StatusProps } from '@src/types/statusProps'
import { Draggable } from '@src/components/ui/drag/draggable'

type BoardsProps = {
    board: BoardProps
    expanded: boolean
    dragId?: DragIdProps
}

const Board = ({ board, expanded, dragId }: BoardsProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { isHover, handleHover, handleUnhover } = useToggleHover()

    const { loading, editBoardName, boardName, handleChange } = useBoard({
        board,
    })

    const params = useParams()

    return (
        <Draggable id={board.id} disabled={open}>
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
                <div className='m-3 custom-scrollbar'>
                    <div className='m-6 flex justify-between items-center'>
                        <div className='text-2xl font-bold'>Edit Board</div>
                        <DeleteBoard boardId={board.id} />
                    </div>
                    <div className='m-6 space-y-5'>
                        <div className='font-bold'>Board Name</div>
                        <div className='flex items-center gap-3'>
                            <TextField
                                value={boardName}
                                onChange={(event) =>
                                    handleChange(event.target.value)
                                }
                                fullWidth
                            />
                            {loading ? (
                                <div className='w-8'>
                                    <CircularProgress size={30} />
                                </div>
                            ) : (
                                <DoneIcon
                                    className='cursor-pointer text-3xl'
                                    onClick={editBoardName}
                                />
                            )}
                        </div>
                        <div className='font-bold'>Board Columns</div>
                        {board.status.map((status: StatusProps) => {
                            return (
                                <div
                                    className='flex justify-center items-center gap-3'
                                    key={status.id}
                                >
                                    <TextField
                                        fullWidth
                                        value={status.statusName}
                                    />
                                    <ClearIcon className='cursor-pointer text-3xl' />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Dialog>
        </Draggable>
    )
}
export default Board

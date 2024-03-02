'use client'
import React from 'react'
import useBoard from '@src/app/boards/[id]/board/useBoard'
import Skeleton from '@mui/material/Skeleton'
import EditIcon from '@mui/icons-material/Edit'
import EditBoard from '@src/components/ui/dialog/editBoard/editBoard'
import useToggleOpen from '@src/hooks/useToggleOpen'
import Image from 'next/image'
import BoardPhoto from '../../../../../public/assets/boardImage.png'
import { StatusProps } from '@src/types/status/statusProps'
import arrayFrom from '@src/utils/arrayFrom'
import { SortableContext } from '@dnd-kit/sortable'
import useDragHandler from '@src/hooks/useDragHandler'
import { DragOverlay } from '@dnd-kit/core'
import DntContext from '@src/components/ui/drag/dntContext'
import Statuses from '@src/app/boards/[id]/board/statuses/statuses'
import Status from '@src/app/boards/[id]/board/statuses/status/status'
import AddStatus from '@src/app/boards/[id]/board/addStatus'
import Task from '@src/app/boards/[id]/board/statuses/status/tasks/task/task'

const Board = () => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const {
        dragId,
        onDragStart,
        onDragCancel,
        onDragOver,
        handleOnDragEnd,
        draggedTask,
        isDraggingTask,
    } = useDragHandler()

    const {
        data,
        scrollableRef,
        loading,
        statuses,
        setStatuses,
        tasks,
        setTasks,
        statusesId,
        draggedStatus,
    } = useBoard(dragId)

    return (
        <div className='sm:mx-10 h-full m-2'>
            <div className='max-sm:flex justify-center'>
                <div className='sm:w-4/5 max-sm:w-[250px] text-center text-gray-200 mt-10 max-sm:mt-2 text-xl font-bold md:w-[40vw]'>
                    {loading ? (
                        <div className='flex items-center gap-3'>
                            <Skeleton
                                width={44}
                                height={44}
                                variant='rounded'
                            />
                            <Skeleton
                                className='w-1/3'
                                height={32}
                                variant='rounded'
                            />
                        </div>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Image
                                src={BoardPhoto}
                                alt='board image'
                                width={44}
                                className='rounded object-cover'
                            />
                            <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                {data?.board && data.board.boardName}
                            </div>
                            <EditIcon
                                className='text-gray-400 cursor-pointer text-lg'
                                onClick={() => handleOpen()}
                            />
                        </div>
                    )}
                    {data?.board && (
                        <EditBoard
                            board={data.board}
                            open={open}
                            handleClose={handleClose}
                        />
                    )}
                </div>
            </div>
            <hr className='my-4 border-t border-[#474747] w-full' />
            <DntContext
                handleOnDragEnd={(event) =>
                    handleOnDragEnd<StatusProps>(event, setStatuses)
                }
                onDragStart={onDragStart}
                onDragCancel={onDragCancel}
                onDragOver={(event) => onDragOver(event, setTasks)}
                isDraggingTask={isDraggingTask}
            >
                <div
                    className='statusesScrollbar max-sm:h-5/6 h-5/6 overflow-auto'
                    ref={scrollableRef}
                >
                    <section className='flex items-start max-sm:flex-col gap-6'>
                        {loading ? (
                            arrayFrom(
                                4,
                                <div>
                                    <Skeleton
                                        height={620}
                                        className='max-sm:w-[60vw] sm:min-w-[276px] sm:max-w-[276px] flex-1 min-h-[420px]'
                                        variant='rounded'
                                    />
                                </div>
                            )
                        ) : (
                            <SortableContext items={statusesId}>
                                <Statuses
                                    statuses={statuses}
                                    tasks={tasks}
                                    scrollableRef={scrollableRef}
                                    dragId={dragId}
                                />
                            </SortableContext>
                        )}
                        {data?.board.id && (
                            <AddStatus boardId={data.board.id} />
                        )}
                    </section>
                </div>
                <DragOverlay
                    className={
                        draggedStatus ? 'bg-neutral-900' : 'bg-transparent'
                    }
                >
                    {draggedStatus && (
                        <Status
                            key={draggedStatus.id}
                            status={draggedStatus as StatusProps}
                            tasks={tasks.filter(
                                (task) => task.statusId === draggedStatus.id
                            )}
                            statusesLength={statuses.length}
                            dragId={dragId}
                            hideCreateTask={true}
                        />
                    )}
                    {draggedTask && <Task task={draggedTask} />}
                </DragOverlay>
            </DntContext>
        </div>
    )
}

export default Board

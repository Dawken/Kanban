'use client'
import React from 'react'
import useBoard from '@src/app/boards/[id]/board/useBoard'
import Skeleton from '@mui/material/Skeleton'
import EditIcon from '@mui/icons-material/Edit'
import EditBoard from '@src/components/ui/dialog/editBoard/editBoard'
import useToggleOpen from '@src/hooks/useToggleOpen'
import Image from 'next/image'
import BoardPhoto from '../../../../../public/assets/boardImage.png'
import Status from '@src/app/boards/[id]/board/status/status'
import { StatusProps } from '@src/types/status/statusProps'
import arrayFrom from '@src/utils/arrayFrom'
import { SortableContext } from '@dnd-kit/sortable'
import DntContext from '@src/components/ui/drag/dntContext'
import useDragHandler from '@src/hooks/useDragHandler'
import { DragOverlay } from '@dnd-kit/core'
import AddStatus from '@src/app/boards/[id]/board/addStatus/addStatus'

const Board = () => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { data, loading, statuses, setStatuses } = useBoard()

    const {
        onDragStart,
        onDragCancel,
        handleOnDragEnd,
        draggedItem: draggedStatus,
    } = useDragHandler(statuses)

    return (
        <div className='sm:mx-10 h-full'>
            <div className='max-sm:flex justify-center'>
                <div className='sm:w-4/5 max-sm:w-[250px] text-center text-gray-200 mt-10 text-xl font-bold md:w-[40vw] '>
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
            <DntContext
                handleOnDragEnd={(event) =>
                    handleOnDragEnd<StatusProps>(event, setStatuses)
                }
                onDragStart={onDragStart}
                onDragCancel={onDragCancel}
            >
                <SortableContext items={statuses}>
                    <div className='statusesScrollbar max-sm:h-[85vh] h-5/6 max-sm:mt-3 mt-12 overflow-auto'>
                        <section className='flex items-start max-sm:flex-col max-sm:items-center gap-5'>
                            {loading
                                ? arrayFrom(
                                      4,
                                      <div>
                                          <Skeleton
                                              height={220}
                                              width={250}
                                              variant='rounded'
                                          />
                                      </div>
                                  )
                                : statuses &&
                                  statuses.map((status: StatusProps) => {
                                      return (
                                          <Status
                                              status={status}
                                              key={status.id}
                                          />
                                      )
                                  })}
                            {data?.board.id && (
                                <AddStatus boardId={data.board.id} />
                            )}
                        </section>
                    </div>
                </SortableContext>
                <DragOverlay>
                    {draggedStatus ? (
                        <Status
                            key={draggedStatus.id}
                            status={draggedStatus as StatusProps}
                        />
                    ) : null}
                </DragOverlay>
            </DntContext>
        </div>
    )
}

export default Board

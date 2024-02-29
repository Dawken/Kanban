import React, { RefObject } from 'react'
import useStatuses from '@src/app/boards/[id]/board/statuses/useStatuses'
import Status from '@src/app/boards/[id]/board/statuses/status/status'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import { DragIdProps } from '@src/types/dragIdProps'

type StatusesProps = {
    statuses: StatusProps[]
    tasks: TaskProps[]
    scrollableRef: RefObject<HTMLDivElement>
    dragId: DragIdProps
}
const Statuses = ({
    statuses,
    tasks,
    scrollableRef,
    dragId,
}: StatusesProps) => {
    const { isStatusOrderUpdating, isTaskOrderUpdating } =
        useStatuses(scrollableRef)

    return (
        <>
            {statuses.length > 0 &&
                statuses.map((status: StatusProps) => {
                    return (
                        <Status
                            status={status}
                            tasks={tasks.filter(
                                (task) => task.statusId === status.id
                            )}
                            statusesLength={statuses.length}
                            isStatusOrderUpdating={isStatusOrderUpdating}
                            isTaskOrderUpdating={isTaskOrderUpdating}
                            dragId={dragId}
                            key={status.id}
                        />
                    )
                })}
        </>
    )
}

export default Statuses

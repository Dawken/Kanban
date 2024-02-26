import React, { RefObject } from 'react'
import useStatuses from '@src/app/boards/[id]/board/statuses/useStatuses'
import Status from '@src/app/boards/[id]/board/statuses/status/status'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'

type StatusesProps = {
    statuses: StatusProps[]
    tasks: TaskProps[]
    scrollableRef: RefObject<HTMLDivElement>
}
const Statuses = ({ statuses, tasks, scrollableRef }: StatusesProps) => {
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
                            key={status.id}
                        />
                    )
                })}
        </>
    )
}

export default Statuses

import React from 'react'
import useStatuses from '@src/app/boards/[id]/board/statuses/useStatuses'
import Status from '@src/app/boards/[id]/board/statuses/status/status'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'

type StatusesProps = {
    statuses: StatusProps[]
    tasks: TaskProps[]
}
const Statuses = ({ statuses, tasks }: StatusesProps) => {
    useStatuses()

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

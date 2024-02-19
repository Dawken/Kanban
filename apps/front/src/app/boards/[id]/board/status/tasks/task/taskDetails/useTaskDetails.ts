import { useQuery } from '@apollo/client'
import { GET_TASK } from '@src/graphQL/tasks/queries'

const useTaskDetails = (taskId: string) => {
    const { data, loading } = useQuery(GET_TASK, { variables: { taskId } })

    return {
        data,
        loading,
    }
}
export default useTaskDetails

import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_BOARD } from '@src/graphQL/boards/queries'

const useBoard = () => {
    const params = useParams()

    const { data, loading } = useQuery(GET_BOARD, {
        variables: { boardId: params.id },
    })

    return {
        data,
        loading,
    }
}
export default useBoard

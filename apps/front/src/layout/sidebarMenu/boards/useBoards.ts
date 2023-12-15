import { useQuery } from '@apollo/client'
import GET_BOARDS from '@src/graphQL/boards/queries'

const useBoards = () => {
    const { data, loading } = useQuery(GET_BOARDS)

    return {
        data,
        loading,
    }
}

export default useBoards

import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { UPDATE_COOKIE } from '@src/graphQL/auth/mutations'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import useLocalStorage from 'use-local-storage'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

const removeTypenameLink = removeTypenameFromVariables()

const httpLink = createHttpLink({
    uri: authGateway,
    credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.find(async (error) => {
            if (error.message === 'unauthorized') {
                try {
                    await client.mutate({
                        mutation: UPDATE_COOKIE,
                    })

                    const refetchResult = await client.query({
                        query: operation.query,
                        variables: operation.variables,
                    })

                    client.writeQuery({
                        query: operation.query,
                        data: refetchResult.data,
                        variables: operation.variables,
                    })
                    return forward(operation)
                } catch {
                    const [, setIsLoggedId] = useLocalStorage(
                        'isLoggedIn',
                        false
                    )
                    setIsLoggedId(false)
                }
            }
        })
    }
})

const link = ApolloLink.from([removeTypenameLink, errorLink, httpLink])

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
})

export default client

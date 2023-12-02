import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { store } from '@src/context/redux/store'
import { getClientResponse } from '@src/context/redux/user'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

const httpLink = createHttpLink({
    uri: authGateway,
    credentials: 'include',
})

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.find((error) => {
            if (error.message === 'Unauthorized') {
                store.dispatch(getClientResponse({ isLoggedIn: false }))
            }
        })
    }
})
const link = ApolloLink.from([errorLink, httpLink])
const createApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link,
    })
}

export default createApolloClient

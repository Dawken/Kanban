import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
    Observable,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { UPDATE_COOKIE } from '@src/graphQL/auth/mutations'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { getClientResponse } from '@src/context/redux/user'
import { store } from '@src/context/redux/store'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

const removeTypenameLink = removeTypenameFromVariables()

const httpLink = createHttpLink({
    uri: authGateway,
    credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        const unauthorizedError = graphQLErrors.find(
            (error) => error.message === 'unauthorized'
        )
        if (unauthorizedError) {
            return new Observable((observer) => {
                client
                    .mutate({
                        mutation: UPDATE_COOKIE,
                    })
                    .then(() => {
                        const subscription = forward(operation).subscribe({
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer),
                        })
                        return () => subscription.unsubscribe()
                    })
                    .catch(() => {
                        store.dispatch(getClientResponse({ isLoggedIn: false }))
                    })
            })
        }
    }
    return forward(operation)
})

const link = ApolloLink.from([removeTypenameLink, errorLink, httpLink])

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
})

export default client

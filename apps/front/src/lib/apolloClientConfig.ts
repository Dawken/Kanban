import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

const link = createHttpLink({
    uri: authGateway,
    credentials: 'include',
})
const createApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link,
    })
}

export default createApolloClient

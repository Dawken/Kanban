import { ApolloClient, InMemoryCache } from '@apollo/client'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

const createApolloClient = () => {
    return new ApolloClient({
        uri: authGateway,
        cache: new InMemoryCache(),
    })
}

export default createApolloClient

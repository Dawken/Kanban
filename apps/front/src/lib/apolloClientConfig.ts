import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

const authGateway = process.env.NEXT_PUBLIC_AUTH_GATEWAY

let client: ApolloClient<NormalizedCacheObject> | null = null
export const getClient = () => {
    if (!client || typeof window === 'undefined') {
        client = new ApolloClient({
            link: new HttpLink({
                uri: authGateway,
            }),
            cache: new InMemoryCache(),
        })
    }
    return client
}

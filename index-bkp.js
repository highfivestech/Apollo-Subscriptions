import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
type Crypto{
    name: String,
    price: Float
}

type Query{
    crypto: Crypto
}
`;

const cryptoResponse = {
    name: 'ETH',
    price: 2.01
}

const resolvers = {
    Query: {
        crypto: () => cryptoResponse
    }
}

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at: ${url}`);
});


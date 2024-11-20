export const stocksPath = 'stocks'

export const stocksMethods = ['find', 'get', 'create', 'patch', 'remove']

export const stocksClient = (client) => {
    const connection = client.get('connection')

    client.use(stocksPath, connection.service(stocksPath), {
        methods: stocksMethods
    })
}

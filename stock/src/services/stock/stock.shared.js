export const stockPath = 'stock'

export const stockMethods = ['find', 'get', 'create', 'patch', 'remove']

export const stockClient = (client) => {
    const connection = client.get('connection')

    client.use(stockPath, connection.service(stockPath), {
        methods: stockMethods
    })
}

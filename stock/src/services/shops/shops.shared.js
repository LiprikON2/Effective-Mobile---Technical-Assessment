export const shopsPath = 'shops'

export const shopsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const shopsClient = (client) => {
    const connection = client.get('connection')

    client.use(shopsPath, connection.service(shopsPath), {
        methods: shopsMethods
    })
}

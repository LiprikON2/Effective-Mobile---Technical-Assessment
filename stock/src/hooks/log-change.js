export const logChange = async (context) => {
    console.log(`Running hook logChange on ${context.path}.${context.method}`)

    const result = structuredClone(context.result)

    if ('id' in result) {
        result['result_id'] = result['id']
        delete result['id']
    }

    console.log('Change', { service: context.path, action: context.event, result })
}

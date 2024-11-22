export const logChange = async (context) => {
    console.log(`Running hook logChange on ${context.path}.${context.method}`)

    console.log('Change', { service: context.path, action: context.event, result: context.result })
}

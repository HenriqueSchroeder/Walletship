/**
 * Run environment test in tenant.
 */
export const runInTenant = async (cb: () => Promise<void> | void) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await cb()
      resolve()
    } catch (error) {
      if (
        typeof error === 'object' &&
        Object.keys(error as object).length !== 0
      )
        console.log('Error:', JSON.stringify(error))

      reject(error)
    }
  })
}

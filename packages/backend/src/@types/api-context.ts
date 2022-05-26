/**
 * API context type.
 */
 export type APIContext = {
  req: {
    headers: {
      token?: string
    }
  }
}

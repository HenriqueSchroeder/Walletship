/**
 * API context type.
 */
export type APIContext = {
  uuid: string
  req: {
    headers: {
      token?: string
    }
  }
}

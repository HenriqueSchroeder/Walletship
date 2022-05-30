/**
 * Email generator
 */
export const emailGenerator = () => {
  const name = Math.random().toString(36).substring(2, 20)
  return `${name}@gmail.com`
}

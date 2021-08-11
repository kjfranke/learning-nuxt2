/*
 * https://nuxtjs.org/docs/2.x/concepts/context-helpers#redirecting-users--accessing-the-store
 */

export default function (context) {
  console.log('layout-middleware', Object.keys(context))

  return Promise.resolve()
}

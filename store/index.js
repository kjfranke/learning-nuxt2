export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  async nuxtServerinit (vuexContext, nuxtContext) {
    console.log('nuxtServerinit', vuexContext, nuxtContext)

    return await Promise.resolve().then({
      testNuxtServerinit: 'nuxtServerinitExample'
    })
  }
}

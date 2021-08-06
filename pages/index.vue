<template>
  <div>
    <NuxtLink to="/components/">
      Components
    </NuxtLink>
    <p>
      props: testProps = {{ testProps }}
    </p>
    <p>
      asyncData: testAsyncData.key = {{ testAsyncData.key }}
      <br>
      asyncData rendered on {{ testAsyncData.renderedOn }}
    </p>
    <pre>{{ $fetchState }}</pre>
    <p v-if="$fetchState.pending">
      Loading....
    </p>
    <p v-else-if="$fetchState.error">
      Error while fetching mountains
    </p>
    <p v-else>
      fetch: testFetch.key = {{ testFetch.key }}
      <br>
      fetch rendered on {{ testFetch.renderedOn }}
    </p>
    <p>
      data: testData = {{ testData }}
    </p>
    <p>
      $nuxt:
      <pre>{{ Object.keys($nuxt) }}</pre>
    </p>
  </div>
</template>

<script>
export default {

  components: {
    // Add components to your page, not necessary when components is enabled in nuxt.config.js
  },
  middleware: 'page-middleware',
  props: {
    testProps: {
      type: String,
      default: 'PropsExample'
    }
  },
  async asyncData (context) {
    /*
     * asyncData is only available for page type components
     *
     * Nuxt will wait for the asyncData hook to be finished before navigating to the next page or display the error page
     *
     * The asyncData method is not called on query string changes by default. If you want to change this behavior, for example when building a pagination component, you can set up parameters that should be listened to with the watchQuery property of your page component.
     *
     * https://nuxtjs.org/docs/2.x/features/data-fetching#async-data
     */

    /* eslint-disable-next-line */
    const testAsyncData = await new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
      return {
        key: 'asyncDataExample',
        renderedOn: process.client ? 'client' : 'server'
      }
    })

    console.log('asyncData', testAsyncData, Object.keys(context))

    return { testAsyncData } // You can use test
  },
  data () {
    const testData = 'dataExample'

    console.log('data', testData)

    return {
      testData,
      testFetch: null
    }
  },
  async fetch () {
    /* eslint-disable-next-line */
    const testFetch = await new Promise(resolve => setTimeout(resolve, 3500)).then(() => {
      return {
        key: 'fetchExample',
        renderedOn: process.client ? 'client' : 'server'
      }
    })

    console.log('fetch', testFetch)

    this.testFetch = testFetch
  },
  fetchOnServer: false,
  head () {
    /*
     * https://nuxtjs.org/docs/2.x/features/meta-tags-seo
     */

    console.log('head')

    return {
      title: 'Learning Nuxt 2',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Learning Nuxt 2 description'
        }
      ]
    }
  },
  /*
   * VueJS Lifecycle Hooks
   */
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  activated () {
    console.log('activated')
  }

}
</script>

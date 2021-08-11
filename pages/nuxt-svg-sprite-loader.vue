<template>
  <div>
    nuxt-svg-sprite-loader
    <br>

    <h2>original runtime</h2>
    <div>
      <svg height="40"><use :xlink:href="`#${arrow.id}`" /></svg>
      <pre>
        id {{ arrow.id }}
        viewBox {{ arrow.viewBox }}

        extract: false
        content {{ arrow.content }}
        node {{ arrow.node }}

        extract: true
        url {{ arrow.url }}
      </pre>
    </div>

    <h2>custom runtime</h2>
    <div>
      extract usage from js import (<a :href="arrow" target="_blank">{{ arrow }}</a>)
      <br>
      <svg height="40"><use :xlink:href="`${arrow}`" /></svg>
    </div>

    <div>
      extract usage from svg
      <br>
      <svg height="40"><use xlink:href="~/assets/icons/calendar.svg" /></svg>
    </div>

    <div>
      extract usage from css
      <br>
      <div class="svg-icon" />
    </div>

    <div>
      extract usage from img
      <br>
      <img src="~/assets/icons/calendar.svg">
    </div>

    <h2>custom css color variations</h2>

    <div>
      extract usage from css
      <br>
      <div class="svg-icon2" />
    </div>
  </div>
</template>

<script>
import arrow from '~/assets/icons/arrow.svg'

export default {
  computed: {
    arrow: () => arrow
  },
  mounted () {
    console.log('arrow', arrow)
  }
}
</script>

<style>
.svg-icon,
.svg-icon2 {
  height: 40px;
  width: 40px;
}

.svg-icon {
  background: url('~/assets/icons/arrow.svg') no-repeat center / cover;
}

.svg-icon2 {
  background: blue url('~/assets/icons/arrow.svg') no-repeat center / cover;
}
</style>

<template>
  <div>
    <div>
      HTML reference
      <br>
      <svg height="40" viewBox="0 0 6.8 13.3">
        <use xlink:href="/test-sprite.svg#use-arrow" />
      </svg>
    </div>

    <div>
      CSS reference
      <br>
      <div class="icon2" />
    </div>
  </div>
</template>

<style>
.icon2 {
  background: url("/test-sprite.svg#use-calendar") no-repeat center / cover;
  height: 4rem;
  width: 4rem;
}
</style>

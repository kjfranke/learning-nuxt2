<template>
  <div>
    <h3>Requirement</h3>
    <ol>
      <li>Easy referencing from svg>use[xlink:href], img[src], CSS with: "~/assets/icons/arrow.svg"</li>
      <li>Should work from HTML as wel as CSS</li>
      <li>A variations system to select color variants from CSS</li>
    </ol>

    <h3>Nice To have</h3>
    <ol>
      <li>A way to create a component which can show all the available SVG's (used or non-used)</li>
    </ol>

    <h3>Possible solutions</h3>
    <ul>
      <li>
        The issue:
        <a href="https://github.com/JetBrains/svg-sprite-loader/issues/32">
          https://github.com/JetBrains/svg-sprite-loader/issues/32
        </a>
        <br>
        Examples of issue:
        <a href="https://codepen.io/elado/pen/GZdJZG?editors=1100&__cf_chl_captcha_tk__=pmd_5c7b7b521c9c9a640915dfb607eeb40baeb7e342-1627447894-0-gqNtZGzNAw2jcnBszQdi" target="_blank" rel="noopener noreferer">
          https://codepen.io/elado/pen/GZdJZG?editors=1100&__cf_chl_captcha_tk__=pmd_5c7b7b521c9c9a640915dfb607eeb40baeb7e342-1627447894-0-gqNtZGzNAw2jcnBszQdi
        </a>
      </li>
      <li>
        DIY: Injecting existing sprite:
        <a href="https://www.codecookbook.dev/use-svg-sprites-with-nuxtjs/" target="_blank" rel="noreferer noopener">
          https://www.codecookbook.dev/use-svg-sprites-with-nuxtjs/
        </a>
      </li>
      <li>
        Injecting existing sprite:
        <a href="https://github.com/gaven/nuxt-svg-sprite-module">
          https://github.com/gaven/nuxt-svg-sprite-module
        </a>
      </li>
    </ul>

    <h3>Rejected</h3>
    <ul>
      <li>
        You have to use a svg-icon component
        <a href="https://github.com/nuxt-community/svg-sprite-module">
          https://github.com/nuxt-community/svg-sprite-module
        </a>
      </li>
      <li>
        DIY: You have to use a svg-icon component
        <a href="https://www.programmersought.com/article/30548946837/">
          https://www.programmersought.com/article/30548946837/
        </a>
      </li>
      <li>
        Serves different ways of using SVG's, doesn't make I a sprite out of it:
        <a href="https://github.com/nuxt-community/svg-module">
          https://github.com/nuxt-community/svg-module
        </a>
        We use it now for inlining SVG's
      </li>
    </ul>
  </div>
</template>

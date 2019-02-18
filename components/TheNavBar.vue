<template>
  <!-- START NAV -->
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="{name: 'index'}" class="logo text-lg">
          <img class="img" width="150" src="../static/kidocode_logo.png" alt="The KBlog logo">
        </nuxt-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  </nav>
  <!-- END NAV -->
</template>

<script>
export default {};
</script>

<style scoped>
</style>

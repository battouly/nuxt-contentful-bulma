<template>
  <div>
    <section class="is-medium is-bold">
      <div class="hero-body">
        <Logo/>
      </div>
    </section>
    <div class="container">
      <p class="title article-title">Latest {{posts.length}} Articles </p>
      <nuxt-link v-for="(post, index) in posts" :key="index" :to="post.fields.slug" class="button--grey">
        <li>{{ post.fields.title }}</li>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts;
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("posts/getPosts", params.slug);
  }
};
</script>

<style scoped>

</style>
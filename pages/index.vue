<template>
  <div>
    <section class="is-medium is-bold">
      <div class="hero-body"></div>
    </section>
    <br>
    <div class="container">

      <p class="title article-title">Latest {{posts.length}} Articles</p>
      <br>
      <div class="row columns is-multiline">
        <nuxt-link
          v-for="(post, index) in posts"
          :key="index"
          :to="post.fields.slug"
          class="column is-one-third"
        >
          <!-- Staff -->
          <div class="card">
            <!-- <div class="card-image">
              <figure class="image">
                <img src="https://source.unsplash.com/KgjcndVr7tU" alt="Image">
              </figure>
            </div> -->
            <div class="card-content">
              <div class="media">
                <!-- <div class="media-left">
                    <figure class="image is-96x96">
                      <img src="../static/daria.jpg" class="image is-96x96" alt="Placeholder image">
                    </figure>
                </div>-->
                <div class="media-content">
                  <p class="title is-4 no-padding">{{ post.fields.title }}</p>
                </div>
                
              </div>
              <div class="title is-7 no-padding">{{ (new Date(post.sys.updatedAt)).toDateString() }}</div>
              <div class="content">{{ post.fields.description }}</div>
              <div class="title is-5 no-padding">Read more...</div>
            </div>
          </div>
          <!-- End Staff -->
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
    head () {
    return {
      title: 'Posts - kidocode blog',
      meta: [
        { hid: 'description', name: 'description', content: 'Latest articles of our blog. ' }
      ]
    }
  },
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
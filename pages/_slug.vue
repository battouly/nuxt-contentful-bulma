<template>
  <div>
    <section class="hero is-info is-medium is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <br>
          </h1>
        </div>
      </div>
    </section>
    <!-- START ARTICLE FEED -->
    <section class="articles">
      <div class="column is-10 is-offset-1">
        <!-- START ARTICLE -->
        <div class="columns">
          <div class="column is-8">
            <div class="card article">
              <div class="card-content">
                <div class="media">
                  <div class="media-center">
                    <img src="../static/daria.jpg" class="author-image" alt="Placeholder image">
                  </div>
                  <div v-if="!isLoading" class="media-content has-text-centered">
                    <p class="title article-title">{{ currentPost.fields.title }} 🔱</p>
                    <p class="subtitle is-6 article-subtitle">
                      <a href="#">
                        by @{{ currentPost.fields.name
                        }}
                      </a>
                      on {{ (new Date(currentPost.sys.updatedAt)).toDateString() }}
                    </p>
                  </div>
                </div>
                <div class="content article-body has-text-justified" v-html="$md.render(currentPost.fields.content)"></div>
              </div>
            </div>
          </div>
<!-- start of relatedPosts column -->
          <div class="column is-4">
            <div class="card article">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title article-title">Other Articles</p>
                    <nuxt-link
                      v-for="(post, index) in relatedPosts"
                      :key="index"
                      :to="post.fields.slug"
                    >
                      <li>{{ post.fields.title }}</li>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End of relatedPosts column -->          
        </div>
        <!-- END ARTICLE -->
      </div>
    </section>
    <!-- END ARTICLE FEED -->
  </div>
</template>

<script>
export default {
  computed: {
    currentPost() {
      return this.$store.state.post.currentPost;
    },
    isLoading() {
      return this.$store.state.post.isLoading;
    },
    relatedPosts() {
      return this.$store.state.relatedPosts.relatedPosts;
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("post/getPostBySlug", params.slug);
    await store.dispatch("relatedPosts/getPosts", params.slug);
  }
};
</script>


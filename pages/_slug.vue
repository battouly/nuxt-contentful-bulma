<template>
  <div>
    <section class="hero is-info is-medium is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <br>
            <!-- {{ currentPost.fields.title }} -->
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
                  <div v-if="!isLoading" class="media-content has-text-centered">
                    <p class="title article-title">{{ currentPost.fields.title }} 🔱</p>
                    <p class="subtitle is-6 article-subtitle">
                      <!-- <a href="#">
                        by @{{ currentPost.fields.name
                        }}
                      </a>-->
                      {{ (new Date(currentPost.sys.updatedAt)).toDateString() }}
                    </p>
                    <!-- <p class="subtitle is-8 article-subtitle">
                      <a href="#">Tags:</a>
                      {{ (currentPost.fields.tags).toString() }}
                                 <p>{{ currentPost.fields.file.fields.file.url }}</p>         
                    </p>-->
                  </div>
                </div>
                <div
                  class="content article-body has-text-justified"
                  v-html="$md.render(currentPost.fields.content)"
                ></div>
                <div class="content has-text-centered">
                  <div class="soc">
                    <social-sharing
                      url="https://kblog-kidocode.netlify.com/"
                      title="The kidocode Blog"
                      description="Read about science and technology from the yougest in the field coached by expert in the field."
                      quote="Kidocode is the itech house for yougsters."
                      hashtags="robotic,javascript,coding"
                      twitter-user="kidocode"
                      inline-template
                    >
                      <div>
                        <network network="facebook">
                          <i class="fa fa-facebook fa-2x" aria-hidden="true"></i>
                        </network>
                        <network network="twitter">
                          <i class="fa fa-twitter fa-2x" aria-hidden="true"></i>
                        </network>
                        <network network="linkedin">
                          <i class="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                        </network>
                        <network network="whatsapp">
                          <i class="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                        </network>
                        <!-- and the others networs tag pasted from the readm.md -->
                      </div>
                    </social-sharing>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- start of relatedPosts column -->
          <div class="column is-4">
            <div class="card article">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title article-title">Related Articles</p>
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
    if (store.state.post.currentPost.slug !== params.slug) {
      await store.dispatch("relatedPosts/getRelatedPosts", params.slug);
    }
  }
};
</script>


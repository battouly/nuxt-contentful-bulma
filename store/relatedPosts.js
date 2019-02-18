import client from '../plugins/contentful';

export const state = () => ({
    relatedPosts: []
})

export const mutations = {
  setPosts(state, payload) {
    state.relatedPosts = payload;
  }
}

export const actions = {
  async getPosts({
    commit
  }) {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt'
    });
    if (response.items.length > 0) {
      commit('setPosts', response.items);
    }
  }
}

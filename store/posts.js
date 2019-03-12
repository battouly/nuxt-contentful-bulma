import client from '../plugins/contentful';

export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload;
  }
}

export const actions = {
  async getPosts({
    commit
  }) {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
      skip: 0,
      //limit: 3 
    });
    if (response.items.length > 0) {
      commit('setPosts', response.items);
    }
  }
}

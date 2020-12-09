<template>
  <div class="example">
    <search-input
      @search="search"
    />
    <result-item
      v-if="currentResult"
      :result="currentResult"
      @search="search"
    />
    <panel
      @search="search"
      :usernames="usernames"
    />
    <history
      :history="history"
      @search="search"
    />
  </div>
</template>

<script>
import axios from 'axios'
import SearchInput from './SearchInput.vue'
import ResultItem from './ResultItem.vue'
import History from './History.vue'
import Panel from './Panel.vue'

const API_BASE = location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : location.origin

export default {
  name: 'Example',

  components: {
    SearchInput,
    ResultItem,
    History,
    Panel,
  },

  props: {
  },

  data: () => ({
    history: [],
    currentResult: null,
    usernames: [
      'rajaraodv',
    ],
  }),

  methods: {
    async search (username) {
      if (this.currentResult) {
        this.history.unshift(this.currentResult)
      }

      this.currentResult = await this.getRepoCount(username)
    },
    async getRepoCount (username) {
      try {
        const apiResp = await axios.get(`${API_BASE}/repos/${username}`)
        const responseTime = apiResp.headers['x-response-time']
        const data = apiResp.data
        return {
          responseTime,
          ...data,
        }
      } catch (err) {
        // catch err
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.example {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

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
    <div class="note">
      Note: After you search for a github account, click "Search again" to see Redis caching in action.
    </div>
    <div class="how-it-works">
      <div class="how-it-works__header">
        How it works
      </div>
      <div class="how-it-works__content">
        This app returns the number of repositories a Github account has. When you first search for an account, the server calls Github's API to return the response. This can take 100s of milliseconds. The server then adds the details of this slow response to Redis for future requests. When you search again, the next response comes directly from Redis cache instead of calling Github. The responses are usually usually in a millisecond or so making it blazing fast.
      </div>
    </div>
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
      'microsoft',
      'google',
      'redislabs',
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
  max-width: 800px;
  margin: 0 auto;
}

.note {
  margin-top: 5rem;
  font-weight: bold;
  background: #fceca9;
  padding: 0.5rem 1rem;
  text-align: center;
}

.how-it-works {
  margin-top: 2rem;
}

.how-it-works .how-it-works__header {
  font-weight: bold;
  font-size: 20px;
}

.how-it-works .how-it-works__content {
  font-size: 20px;
  text-align: left;
}
</style>

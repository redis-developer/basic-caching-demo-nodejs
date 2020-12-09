<template>
  <div
    class="history mt-5"
    v-if="history.length > 0"
  >
    <h5>History:</h5>

    <div
      v-for="(item, index) in history"
      :key="index"
      class="history-list"
    >
      <result-item
        :result="item"
        @search="username => $emit('search', username)"
      />
    </div>
  </div>
</template>

<script>
import ResultItem from './ResultItem'
export default {
  name: 'History',

  components: {
    ResultItem,
  },

  props: {
    history: {
      type: Array,
      required: true,
    },
  },

  computed: {
  },
}
</script>

<style scoped>
.history-list {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<template>
  <div class="result-item">
    <div>
      "{{ result.username }}" has {{ result.repos }} repos.
    </div>
    <div>
      <span
        :style="{
          color: !result.cached ? '#c72b40' : '#29967c'
        }"
      >
        Took {{ result.responseTime }} (Cache {{ result.cached ? 'hit' : 'missed' }}{{ timesLiteral }})
      </span>
      <a
        href="#"
        class="ml-3 mr-1"
        @click="$emit('search', result.username)"
      >search again</a>
      <i class="fa fa-search" style="font-size: 1.2rem"></i>
    </div>
  </div>
</template>

<script>
import { calcTimes } from '@/storage'

export default {
  name: 'ResultItem',

  components: {
  },

  props: {
    result: {
      type: Object,
      required: true,
    },
  },

  computed: {
    timesLiteral () {
      if (this.result.cached) {
        const str = calcTimes(this.result.username, this.result.responseTime)
        return str ? `, ${str}X faster` : ''
      } else {
        return ''
      }
    },
  }
}
</script>

<style scoped>
.result-item {
  margin: 20px;
}
</style>

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
        Took {{ result.responseTime }} (Cache {{ result.cached ? 'hit' : 'missed' }})
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
}
</script>

<style scoped>
.result-item {
  margin: 20px;
}
</style>

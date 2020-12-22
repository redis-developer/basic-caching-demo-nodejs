<template>
  <div class="input-group search-input mt-3">
    <input
      type="text"
      v-model="username"
      placeholder="Github username"
      @keydown.enter="search"
      class="form-control py-2 border-right-0 border"
    />
    <span class="input-group-append">
      <div class="input-group-text bg-transparent">
        <i class="fa fa-search"></i>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    username: '',
  }),

  methods: {
    search () {
      if (this.username) {
        this.$emit('search', this.username.trim())
        this.username = ''
      }
    },
  },
}
</script>

<style scoped>
.search-input {
  max-width: 300px;
  font-size: 1.2rem;
}
.input-group-text .fa-search {
  font-size: 1.2rem;
}
</style>

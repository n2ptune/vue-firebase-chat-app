<template>
  <header
    class="flex relative items-center w-full h-16 px-4 py-6 border-gray-300 border"
  >
    <div class="text-xl">
      {{ name }}
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$route.name === 'Home' ? 'Home' : '채팅방'
    }
  }
}
</script>

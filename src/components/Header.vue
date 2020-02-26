<template>
  <header
    class="flex relative items-center bg-orange-800 w-full h-16 px-4 py-6"
  >
    <div class="text-white text-xl">
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

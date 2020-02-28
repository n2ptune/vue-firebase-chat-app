<template>
  <div
    class="max-w-md px-6 py-1 bg-gray-400 rounded-lg text-gray-700 text-center"
  >
    <div class="text-xs text-gray-600">
      {{ date }}
    </div>
    <div class="text-sm">
      {{ message.content }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'date']
}
</script>

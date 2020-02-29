<template>
  <div
    class="max-w-md px-4 py-1 rounded-lg bg-gray-400 text-gray-700 text-center"
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

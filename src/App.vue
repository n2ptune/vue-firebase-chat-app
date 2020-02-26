<template>
  <div class="root h-screen">
    <Layout>
      <router-view class="container h-full" />
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

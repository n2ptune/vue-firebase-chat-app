<template>
  <section class="flex flex-col mx-auto max-w-2xl h-screen bg-white">
    <Header />
    <slot />
    <Footer />
  </section>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<template>
  <div id="app" class="flexible-content">
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './components/Header'
  export default {
    name: "App",
    components: {
      Header,
    },
    mounted() {
      
    },
  }
</script>
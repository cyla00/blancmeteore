<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
  }
})
</script>


<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<style>
body{
    margin: 0;
    padding: 0;
    background: gray;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  text-align: center;
  color: #2c3e50;
}
</style>

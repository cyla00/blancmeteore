<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Header'
})
</script>

<template> 
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Connection</router-link>
        <router-link to="/registration">Registration</router-link>
    </nav> 
</template>

<style scoped>

</style>
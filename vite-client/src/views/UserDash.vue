<script lang="ts">
import { defineComponent } from 'vue'
import ContinueOrder from '../components/userdash/ContinueOrder.vue'

export default defineComponent({
    name: 'UserDash',
    components: {
        ContinueOrder,
    }
})
</script>

<template>
    <section>
        <ContinueOrder/>
    </section>
</template>

<style scoped>

</style>
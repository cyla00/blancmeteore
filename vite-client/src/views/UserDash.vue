<script lang="ts">
import { defineComponent } from 'vue'
import ContinueOrder from '../components/userdash/ContinueOrder.vue'
import ContinueGraphOrder from '../components/userdash/ContinueGraphOrder.vue'

export default defineComponent({
    name: 'UserDash',
    components: {
        ContinueOrder,
        ContinueGraphOrder,
    }
})
</script>

<template>
    <section>
        <ContinueOrder/>
        <ContinueGraphOrder/>
    </section>
</template>

<style scoped>

</style>
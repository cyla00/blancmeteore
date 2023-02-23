<script lang="ts">
import { defineComponent } from 'vue'
import ContinueOrder from '../components/userdash/ContinueOrder.vue'
import ContinueGraphOrder from '../components/userdash/ContinueGraphOrder.vue'
import ContinueSiteVitr from '../components/userdash/ContinueSiteVitr.vue'

export default defineComponent({
    name: 'UserDash',
    components: {
        ContinueOrder,
        ContinueGraphOrder,
        ContinueSiteVitr,
    }
})
</script>

<template>
    <section>
        <ContinueOrder/>
        <ContinueGraphOrder/>
        <ContinueSiteVitr/>
    </section>
</template>

<style scoped>

</style>
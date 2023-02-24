<script lang="ts">
import { defineComponent } from 'vue'
import ContinueOrder from '../components/userdash/ContinueOrder.vue'
import ContinueGraphOrder from '../components/userdash/ContinueGraphOrder.vue'
import ContinueSiteVitr from '../components/userdash/ContinueSiteVitr.vue'
import ContinueSiteMesure from '../components/userdash/ContinueSiteMesure.vue'

export default defineComponent({
    name: 'UserDash',
    components: {
        ContinueOrder,
        ContinueGraphOrder,
        ContinueSiteVitr,
        ContinueSiteMesure,
    }
})
</script>

<template>
    <section>
        <ContinueOrder/>
        <ContinueGraphOrder/>
        <ContinueSiteVitr/>
        <ContinueSiteMesure/>
    </section>
</template>

<style scoped>

</style>
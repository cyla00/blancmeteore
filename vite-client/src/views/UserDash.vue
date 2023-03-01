<script lang="ts">
import { defineComponent } from 'vue'
import ContinueOrder from '../components/userdash/ContinueOrder.vue'
import ContinueGraphOrder from '../components/userdash/ContinueGraphOrder.vue'
import ContinueSiteVitr from '../components/userdash/ContinueSiteVitr.vue'
import ContinueSiteMesure from '../components/userdash/ContinueSiteMesure.vue'
import ContinueSiteEcom from '../components/userdash/ContinueSiteEcom.vue'

export default defineComponent({
    name: 'UserDash',
    components: {
        ContinueOrder,
        ContinueGraphOrder,
        ContinueSiteVitr,
        ContinueSiteMesure,
        ContinueSiteEcom,
    }
})
</script>

<template>
    <section>
        <ContinueOrder/>
        <ContinueGraphOrder/>
        <ContinueSiteVitr/>
        <ContinueSiteMesure/>
        <ContinueSiteEcom/>
    </section>
</template>

<style scoped>

</style>
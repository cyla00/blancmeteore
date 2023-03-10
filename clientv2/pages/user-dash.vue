<script setup lang="ts">
import ContinueOrder from '@/components/userDash/ContinueOrder.vue'
import ContinueGraph from '@/components/userDash/ContinueGraph.vue'
import ContinueVitr from '@/components/userDash/ContinueVitr.vue'
import ContinueEcom from '@/components/userDash/ContinueEcom.vue'
import ContinueMesure from '@/components/userDash/ContinueMesure.vue'

definePageMeta({
  middleware: ["user"]
})

</script>

<template>
    <main>
        <ContinueOrder/>
        <ContinueGraph/>
        <ContinueVitr/>
        <ContinueEcom/>
        <ContinueMesure/>
        usr
    </main>
</template>
 
<style scoped>

</style>
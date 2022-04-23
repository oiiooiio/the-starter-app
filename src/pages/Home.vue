<template>
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold underline">Home</h1>
        <p>hello</p>
        <p>the count in home {{ store.count }}</p>
        <Count></Count>
        <Ajax></Ajax>
        <Ajax2></Ajax2>    
    </div>
</template>

<script setup lang="ts">
import { useDemoStore } from '../stores/demo-store'
import Count from '../components/Count.vue'
import Ajax from '../components/Ajax.vue'
import Ajax2 from '../components/Ajax2.vue'

const store = useDemoStore()


</script>

<style scoped>
</style>
<template>
    <div class="my-5"></div>
    <p>count in component {{ store.count }}</p>
    <el-button @click="add">
        增加
    </el-button>
</template>

<script setup lang="ts">
import { useDemoStore } from '../stores/demo-store'

const store = useDemoStore()

const add = () => {
    store.add()
}


</script>


<style scoped>
</style>

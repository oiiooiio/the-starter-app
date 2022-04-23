<template>
    <div class="my-5"></div>
    <p>useFecth 请求演示</p>
    <el-button @click="request">
        直接请求
    </el-button>
    <p class="my-2" v-if="isFinished">
        {{ mydata.origin }}
    </p>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { ref } from 'vue'

const { execute, data, onFetchError, onFetchResponse, isFinished } = useFetch('https://httpbin.org/get', {
    immediate: false
}).get().json()

interface JsonData {
    args: any,
    headers: any,
    origin: string,
    url: string
}

let mydata = ref<JsonData>({
    args: null,
    headers: null,
    origin: '',
    url: ''
})

onFetchResponse(() => {
    mydata.value = data.value
})

const request = () => {
    execute()
}

</script>


<style scoped>
</style>

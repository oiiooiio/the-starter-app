<template>
    <div class="my-5"></div>
    <p>useFecth 请求演示</p>
    <el-button @click="request">
        实例请求
    </el-button>
    <div class="my-3" v-loading="isFetching">
        <p>
            {{ data?.origin }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { createMyFetch } from '../network'

interface JsonData {
    args: any,
    headers: any,
    origin: string,
    url: string
}

const useMyFetch = createMyFetch()

const { execute, data, onFetchError, onFetchResponse, isFetching } = useMyFetch('https://httpbin.org/get').get().json<JsonData>()

const request = () => {
    execute()
}

</script>


<style scoped>
</style>

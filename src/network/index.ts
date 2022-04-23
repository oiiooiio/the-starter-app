import { createFetch, useFetch } from '@vueuse/core'

export const createMyFetch = () => {

    const theFetch = createFetch({
        baseUrl: import.meta.env.the_cors_url,
        options: {
            immediate: false
        }
    })

    return theFetch
}
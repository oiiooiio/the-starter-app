import { createEventHook, createFetch, MaybeRef, useFetch, UseFetchOptions, UseFetchReturn } from '@vueuse/core'
import { Ref, ref } from 'vue'


export const createMyFetch = () => {

    const theFetch = createFetch({
        baseUrl: import.meta.env.the_cors_url,
        options: {
            immediate: false
        }
    })

    return theFetch
}

export const useMyFetch = <T>(url: MaybeRef<string>):
    UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> => {

    const theFetch = createFetch({
        baseUrl: import.meta.env.the_cors_url,
        options: {
            immediate: false,
        }
    })

    return theFetch<T>(url)
}

interface ResponseResult {
    success: boolean
    message: string
}

interface DataResult {
    success: boolean
    data: any
}

export const useFetchResult = <T>(shell: UseFetchReturn<any>) => {

    const failedMessage = ref<string>();
    const successResultEvent = createEventHook<T>()
    const failedResultEvent = createEventHook<string>()
    const errorResultEvent = createEventHook<{ status: number; error: any }>()


    const trigger = (responseData: any) => {

        const result = responseData as ResponseResult

        if (result.success) {
            const successResult = (responseData as DataResult)

            successResultEvent.trigger(successResult.data)

            shell.data.value = successResult.data

        } else {

            failedMessage.value = result.message

            failedResultEvent.trigger(result.message)
        }
    }

    shell.onFetchResponse(_ => {
        trigger(shell.data.value)
    })


    shell.onFetchError(error => {

        //依据需求，更改成合适的全局处理
        //例如，401，或者403错误
        if (shell.response.value) {
            const statusCode = shell.response.value.status

            errorResultEvent.trigger({
                status: statusCode,
                error
            })

        }

        errorResultEvent.trigger({
            status: -1,
            error
        })
    })

    return {
        data: shell.data as Ref<T | null>,
        failedMessage,
        eror: shell.error,
        isFetching: shell.isFetching,
        isFinished: shell.isFinished,
        execute: shell.execute,
        onSuccess: successResultEvent.on,
        onFailed: failedResultEvent.on,
        onError: errorResultEvent.on
    }
}


export const useSimpleFetchResult = (shell: UseFetchReturn<any>) => {

    const failedMessage = ref<string>();
    const successResultEvent = createEventHook<any>()
    const failedResultEvent = createEventHook<string>()


    const trigger = (responseData: any) => {

        const result = responseData as ResponseResult

        if (result.success) {
            const successResult = (responseData as DataResult)

            successResultEvent.trigger(null)

        } else {

            failedMessage.value = result.message

            failedResultEvent.trigger(result.message)
        }
    }

    shell.onFetchResponse(_ => {
        trigger(shell.data.value)
    })



    return {
        failedMessage,
        eror: shell.error,
        isFetching: shell.isFetching,
        isFinished: shell.isFinished,
        execute: shell.execute,
        onSuccess: successResultEvent.on,
        onFailed: failedResultEvent.on,
        onError: shell.onFetchError
    }
}
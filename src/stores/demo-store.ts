import { defineStore } from 'pinia'

export const useDemoStore = defineStore('the-demo', {
    state: () => {
        return {
            count: 0,
            name: 'anyone'
        }
    },
    actions: {
        add() {
            this.count++
        }
    }
})
<script setup lang="ts">
import StatsComponent from '@/component/StatsComponent.vue'
import ChartsComponent from '@/component/ChartsComponent.vue'
import { type StatsRes } from '@/api'
import { useRequest } from 'vue-request'
import { fetchStat } from '@/api'
import { ref } from 'vue'
import { watch } from 'vue'

const { data } = useRequest((): Promise<StatsRes> => fetchStat(), { pollingInterval: 100000 })

const stats = ref<StatsRes | null>(null)

watch(
    () => data.value,
    (newData) => {
        if (!newData) {
            stats.value = null
            return
        }
        stats.value = newData
    }
)
</script>

<template>
    <h1>主页</h1>
    <StatsComponent :data="stats" />
    <ChartsComponent :data="stats" />
</template>

<style scoped>
h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

@media screen and (max-width: 720px) {
    h1 {
        font-size: 30px;
    }
}
</style>

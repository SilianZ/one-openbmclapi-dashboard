<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsRes } from '@/api';
import { computed, ref } from 'vue';
import { useRequest } from 'vue-request';
import { fetchStat } from '@/api';

const { data } = useRequest((): Promise<StatsRes> => fetchStat(), { pollingInterval: 10000 })

const startTime = computed(() => {
    if (data !== undefined) return data.value.startTime
    return null
}).value
const nowTime = ref(new Date())

console.log(nowTime.value.getTime())

const hours = computed(() => {
    return startTime !== null ? (((nowTime.value.getTime() - startTime) / (60 * 60 * 1000)).toFixed(2).toString()) : 'NaN'
})

const currentTime = ref({
    hour: nowTime.value.getHours(),
    date: nowTime.value.getDate(),
    year: nowTime.value.getFullYear()
})

const formatHours = (i: number) => {
    if (i < 0) i = 24 + i
    return `${i >= 10 ? i.toString() : `0${i.toString()}`}:00`
}

</script>

<template>
<h3><i>服务器已运行 {{ hours }} 小时。</i></h3>

<!-- hours -->
<HitsChart
    v-if="data"
    id="hits"
    :data="data.stats.hours"
    :oldData="data.prevStats.hours"
    :current="currentTime.hour"
    :max="21"
    :offset="20"
    :formatX="formatHours"
/>
<!-- <Skeleton v-else height="13rem" width="45rem" /> -->
</template>

<style scoped>
#hits {
    height: 13rem;
    width: 45rem;
}
</style>
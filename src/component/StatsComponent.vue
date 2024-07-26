<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsRes } from '@/api'
import { computed,  ref } from 'vue'
import { useRequest } from 'vue-request'
import { fetchStat } from '@/api'
import Skeleton from 'primevue/skeleton'

const { data } = useRequest((): Promise<StatsRes> => fetchStat(), { pollingInterval: 10000 })

const startTime = computed(() => data.value?.startTime ?? null)
const nowTime = ref(new Date())

const hours = computed(() => {
    return startTime.value !== null
        ? ((nowTime.value.getTime() - startTime.value) / (60 * 60 * 1000)).toFixed(2).toString()
        : 'NaN'
})

const currentTime = ref({
    hour: nowTime.value.getHours(),
    day: nowTime.value.getDate(),
    month: nowTime.value.getMonth(),
    year: nowTime.value.getFullYear()
})

console.log(currentTime)

const formatHours = (i: number) => {
    if (!data.value) {
		return ''
	}
    if (i < 0) i = 24 + i
    if (i >= 24) i = i - 24 
    return `${i >= 10 ? i.toString() : `0${i.toString()}`}:00`
}

const formatDays = (day: number) => {
    if (!data.value) {
		return ''
	}
	const date = new Date(Date.UTC(currentTime.value.year, currentTime.value.month, day))
	return `${date.getMonth() + 1} 月 ${date.getDate()} 日`
}

const formatMonths = (month: number) => {
	if (!data.value) {
		return ''
	}
	const date = new Date(Date.UTC(currentTime.value.year, month + 1, 1))
	return `${date.getFullYear()} 年 ${(date.getMonth() + 1).toString().padStart(2, '0')} 月`
}

</script>

<template>
    <p>
        <i><b>服务器已运行 {{ hours }} 小时。</b></i>
    </p>
    
    <HitsChart
        v-if="data"
        id="hits"
        :data="data.stats.hours"
        :oldData="data.prevStats.hours"
        :current="currentTime.hour"
        :max="25"
        :offset="20"
        :formatX="formatHours"
    />
    <Skeleton v-else height="13rem" width="45rem" />
    <HitsChart
        v-if="data"
        id="hits"
        :data="data.stats.days"
        :oldData="data.prevStats.days"
        :current="currentTime.day"
        :max="31"
        :offset="25"
        :formatX="formatDays"
    />
    <HitsChart
        v-if="data"
        id="hits"
        :data="data.stats.months"
        :oldData="data.prevStats.months"
        :current="currentTime.month"
        :max="13"
        :offset="10"
        :formatX="formatMonths"
    />
</template>

<style scoped>
#hits {
    height: 13rem;
    width: 45rem;
    margin: 30px;
}
</style>

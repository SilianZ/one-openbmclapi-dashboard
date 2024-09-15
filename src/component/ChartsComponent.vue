<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsRes } from '@/api'
import { computed, ref } from 'vue'
import Skeleton from 'primevue/skeleton'
import UAChart from '@/component/charts/UAChart.vue'

const props = defineProps<{
    data?: StatsRes | null
}>()

const data = computed(() => {
    if (!props.data) return null
    return props.data
})

const nowTime = ref(new Date())

console.log(nowTime.value.getMonth())

const currentTime = ref({
    hour: nowTime.value.getHours(),
    day: nowTime.value.getDate(),
    month: nowTime.value.getMonth(),
    year: nowTime.value.getFullYear()
})


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
    const date = new Date(Date.UTC(currentTime.value.year, currentTime.value.month + 1, day))
    return `${date.getMonth() + 1} 月 ${date.getDate()} 日`
}

const formatMonths = (month: number) => {
    if (!data.value) {
        return ''
    }
    const date = new Date(Date.UTC(currentTime.value.year, month - 1, 1))
    return `${date.getFullYear()} 年 ${(date.getMonth()).toString().padStart(2, '0')} 月`
}
</script>

<template>
    <div class="flex flex-wrap rounded-xl p-4 justify-center m-2" id="charts-container">
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当日请求</div>
            <HitsChart
                id="hits"
                v-if="data"
                :data="data.stats.hours"
                :oldData="data.prevStats.hours"
                :current="currentTime.hour"
                :max="25"
                :offset="22"
                :formatX="formatHours"
            />
            <Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当月请求</div>
            <HitsChart
                id="hits"
                v-if="data"
                :data="data.stats.days"
                :oldData="data.prevStats.days"
                :current="currentTime.day"
                :max="31"
                :offset="27"
                :formatX="formatDays"
            />
            <Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当年请求</div>
            <HitsChart
                id="hits"
                v-if="data"
                :data="data.stats.months"
                :oldData="data.prevStats.months"
                :current="currentTime.month + 1"
                :max="13"
                :offset="11"
                :formatX="formatMonths"
            />
            <Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">用户分布</div>
            <UAChart
                class="flex items-center justify-center"
                v-if="data"
                id="uas"
                :data="data.accesses"
            />
            <Skeleton v-else id="uas"/>
        </div>
    </div>
</template>

<style scoped>
#hits {
    min-width: 37rem;
    min-height: 13rem;
}
#chart {
    min-width: 37rem;
    min-height: 17rem;
}
.charts-title {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}
#charts-container {
    margin-top: 2rem;
    padding-bottom: 1.5rem;
    border: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
}
#uas {
    min-width: 32rem;
    min-height: 32rem;
}

@media screen and (max-width: 720px) {
    #hits {
        min-width: 12rem;
        min-height: 13rem;
    }
    #chart {
        min-width: auto;
        min-height: 17rem;
    }
    #uas {
        min-width: 17rem;
        min-height: 17rem;
    }
}
</style>

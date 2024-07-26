<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import HitsChart from './charts/HitsChart.vue'
import { computed, ref, type Ref } from 'vue'
import { type StatsData, type StatsRes } from '@/api'
import { fetchStat } from '@/api'
import { useRequest } from 'vue-request'
import StatsComponent from './StatsComponent.vue'

const { data } = useRequest((): Promise<StatsRes> => fetchStat(), { pollingInterval: 10000 })
</script>

<template>
    <h1>Python OpenBMCLAPI 仪表盘</h1>
    <StatsComponent :stats="data?.startTime"></StatsComponent>
</template>
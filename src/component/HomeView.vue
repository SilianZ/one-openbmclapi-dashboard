<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import HitsChart from './charts/HitsChart.vue'
import { ref, type Ref } from 'vue'
import { type StatsData, type StatsRes } from '@/api'
import { fetchStat } from '@/api'
import { useRequest } from 'vue-request'
import type { Stats } from 'fs'

const { data, loading, error } = useRequest((): Promise<StatsRes> => fetchStat())
</script>

<template>
    <h1>Python OpenBMCLAPI 仪表盘</h1>
</template>
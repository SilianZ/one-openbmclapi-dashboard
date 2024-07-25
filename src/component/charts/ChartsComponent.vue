<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsData, type StatsRes } from '@/api';

const props = defineProps<{
    stats: StatsRes
}>()

const data = props.stats.stats
const oldData = props.stats.prevStats
const startTime = new Date(props.stats.startTime)
const nowTime = new Date()

</script>

<template>

</template>
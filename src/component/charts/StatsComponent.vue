<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsData, type StatsRes } from '@/api';
import { ref } from 'vue';

const props = defineProps<{
    stats: StatsRes
}>()

const data = props.stats.stats
const oldData = props.stats.prevStats
const startTime = props.stats.startTime
const nowTime = ref(new Date())

const hours = (nowTime.value.getTime() - startTime) / (60 * 60 * 1000)
</script>

<template>
<h2>{{ hours }}</h2>
</template>
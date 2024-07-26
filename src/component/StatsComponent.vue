<script setup lang="ts">
import HitsChart from '@/component/charts/HitsChart.vue'
import { type StatsRes } from '@/api';
import { computed, ref } from 'vue';

const props = defineProps<{
    stats: StatsRes
}>()

console.log(props.stats.startTime)

const stats = computed(() => {
    return !props.stats ? null : props.stats
})

const startTime = props.stats.startTime
const nowTime = ref(new Date())

const hours = computed(() => {
    return startTime !== null ? ((nowTime.value.getTime() - startTime) / (60 * 60 * 1000)).toFixed(2).toString : 'NaN'
})
</script>

<template>
<h2><i>服务器已运行 {{ hours }} 小时。</i></h2>
</template>
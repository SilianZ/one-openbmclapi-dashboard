<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Chart from 'primevue/chart'
import { type UserAgent } from '@/api';

const props = defineProps<{
    data: UserAgent
}>()

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
    const data = computed(() =>
        Object.entries(props.data)
            .map(([ua, count]) => ({ ua: ua, count: count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 7)
    )

    const labels = data.value.map(({ ua }) => ua)
    const counts = data.value.map(({ count }) => count)

    const color = ['#767681', '#dd426a', '#87d5bb', '#37a97d', '#f8ab9b', '#7e789c', '#db9361']

    return {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: color,
                hoverOffset: 5
            }
        ]
    }
}

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--p-text-color')

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    }
}

onMounted(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
})
</script>

<template>
    <Chart type="pie" :data="chartData" :options="chartOptions" />
</template>

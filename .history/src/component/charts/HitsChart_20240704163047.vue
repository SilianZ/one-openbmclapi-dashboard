<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref } from 'vue'
import { type StatsData } from '../utils'
const chartData = ref()
const chartOptions = ref()
const props = defineProps<{
    data: StatsData[],
    oldData: StatsData[],
    current: number,
    offset: number, // offset >= 0
    max: number,
}>()

const setChartData = () => {
    const max = props.max
    const hits = Array(maxn)
    const bytes = Array(maxn)
    let i = 0
    const updateData = () => {
        const offset = Math.floor(props.current - props.offset) // offset <= 0
        const oldData = props.oldData; // 旧版数据
        const data = props.data; // 新版数据

        for (; i + offset < 0; i++) { // 根据偏移量 offset 处理旧数据
            const j = i + offset + oldData.length; 
            hits[i] = oldData[j].hits;
            bytes[i] = oldData[j].bytes;
        }

        for (; i + offset < data.length; i++) { // 根据偏移量 offset 处理当前数据
            hits[i] = data[i + offset].hits;
            bytes[i] = data[i + offset].bytes
        }

        for (; i < max; i++) { // 补全数值为 0 的数据

        }
    }

}
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
			x: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
				},
			},
        }
    }
}

onMounted(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
})

</script>

<template>
    <Chart type="line" :data="chartData" :options="chartOptions" />
</template>
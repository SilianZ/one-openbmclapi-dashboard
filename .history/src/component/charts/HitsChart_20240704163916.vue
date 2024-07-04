<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref, watch } from 'vue'
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
    const hits = Array(max)
    const bytes = Array(max)
    let i = 0
    const updateData = () => {
	    const documentStyle = getComputedStyle(document.documentElement)
        const offset = Math.floor(props.current - props.offset) // offset <= 0
        const oldData = props.oldData; // 旧版数据
        const data = props.data; // 新版数据

        for (; i + offset < 0; i++) { // 根据偏移量 offset 处理旧数据
            const j = i + offset + oldData.length
            hits[i] = oldData[j].hits
            bytes[i] = oldData[j].bytes
        }

        for (; i + offset < data.length; i++) { // 根据偏移量 offset 处理当前数据
            hits[i] = data[i + offset].hits
            bytes[i] = data[i + offset].bytes
        }

        for (; i < max; i++) { // 补全数值为 0 （暂时还未有值）的数据
            hits[i] = 0;
            bytes[i] = 0;
        }
        
    }

    updateData()
    watch(() => [props.data, props.current], updateData)
    return {
        datasets: [
            {
				label: computed(() => tr('title.hits')),
				fill: true,
				borderColor: documentStyle.getPropertyValue('--blue-500'),
				yAxisID: 'y',
				tension: 0.3,
				data: hits,
			},
			{
				label: computed(() => tr('title.bytes')),
				fill: true,
				borderColor: documentStyle.getPropertyValue('--green-500'),
				yAxisID: 'y1',
				tension: 0.4,
				data: bytes,
			},
        ],
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
                    color: textColor,
                },
            },
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
        },
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
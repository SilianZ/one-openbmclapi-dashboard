<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref, watch } from 'vue'
import { type StatsData, formatBytes, formatNumber } from '../utils'
const chartData = ref()
const chartObj = ref()
const chartOptions = ref()
const props = defineProps<{
    data: StatsData[],
    oldData: StatsData[],
    current: number,
    offset: number, // offset >= 0
    max: number,
    formatX: (i: number) => string,
}>()

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const max = props.max
    const hits = Array(max)
    const bytes = Array(max)
    const label = Array(max)
    let i = 0
    const updateData = () => {
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

        for (let i = 0; i < max; i++) {
            label[i] = props.formatX(i + offset + 1)
        }
        
    }
    console.log(hits, bytes)
    updateData()
    watch(() => [props.data, props.current], () => {
        updateData()
        chartObj.value.refresh()
    })
    return {
        labels: label,
        datasets: [
            {
				label: '访问量',
				fill: true,
				borderColor: documentStyle.getPropertyValue('--blue-500'),
				yAxisID: 'y1',
				tension: 0.3,
				data: hits,
			},
			{
				label: '流量',
				fill: true,
				borderColor: documentStyle.getPropertyValue('--green-500'),
				yAxisID: 'y2',
				tension: 0.3,
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
            stacked: false,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                labels: {
                    color: textColor,
                },
            },
            tooltip: {
				callbacks: {
					label: (context: any) => {
						switch (context.dataset.yAxisID) {
							case 'y1':
								context.formattedValue = formatNumber(context.raw)
								break
							case 'y2':
								context.formattedValue = formatBytes(context.raw)
								break
						}
					},
                    title: (context: any) => {
						const i = context[0].dataIndex
						return `${props.formatXLabel(xOffset + i)} ~ ${props.formatXLabel(xOffset + i + 1)}`
					},
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
            y1: {
                type: 'linear',
				display: true,
                position: 'left',
                ticks: {
					color: textColorSecondary,
					callback: formatNumber,
				},
            },
            y2: {
                type: 'linear',
				display: true,
                position: 'right',
                ticks: {
					color: textColorSecondary,
					callback: formatBytes,
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
    <Chart ref="chartObj" type="line" :data="chartData" :options="chartOptions" />
</template>
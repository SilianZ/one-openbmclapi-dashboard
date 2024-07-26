<script setup lang="ts">
import Chart from 'primevue/chart'
import { onMounted, ref, watch } from 'vue'
import { formatBytes, formatNumber } from '../utils'
import { type StatsData } from '@/api'
import { $dt } from '@primevue/themes'
const chartData = ref()
const chartObj = ref()
const chartOptions = ref()
const props = defineProps<{
    data: StatsData[]
    oldData: StatsData[]
    current: number
    offset: number // offset >= 0
    max: number
    formatX: (i: number) => string // 格式化 x 轴单位
}>()
const chartCurrentLineX = ref(-1)

const setChartData = () => {
    const max = props.max
    const offset = Math.floor(props.current - props.offset) // offset <= 0
    const hits = Array(max)
    const bytes = Array(max)
    const label = Array(max)
    let i = 0
    const updateData = () => {
        const oldData = props.oldData // 旧版数据
        const data = props.data // 新版数据

        for (; i + offset < 0; i++) {
            // 根据偏移量 offset 处理旧数据
            const j = i + offset + oldData.length
            hits[i] = oldData[j].hits
            bytes[i] = oldData[j].bytes
        }

        for (; i + offset < data.length; i++) {
            // 根据偏移量 offset 处理当前数据
            hits[i] = data[i + offset].hits
            bytes[i] = data[i + offset].bytes
        }

        for (; i < max; i++) {
            // 补全数值为 0 （暂时还未有值）的数据
            hits[i] = 0
            bytes[i] = 0
        }

        for (let i = 0; i < max; i++) {
            label[i] = props.formatX(i + offset + 1)
        }
        chartCurrentLineX.value = props.current - offset - 1
    }
    console.log(hits, bytes)
    updateData()
    watch(
        () => [props.data, props.current],
        () => {
            updateData()
            chartObj.value.refresh()
        }
    )
    console.log($dt('indigo.300').value)
    return {
        labels: label,
        datasets: [
            {
                label: '访问量',
                fill: true,
                borderColor: $dt('blue.500').value,
                yAxisID: 'y1',
                tension: 0.3,
                data: hits
            },
            {
                label: '流量',
                fill: true,
                borderColor: $dt('teal.500').value,
                yAxisID: 'y2',
                tension: 0.3,
                data: bytes
            }
        ]
    }
}
const setChartOptions = () => {
    const offset = Math.floor(props.current - props.offset) // offset <= 0

    return {
        stacked: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
        maintainAspectRatio: false,
        plugins: {
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
                        return `${props.formatX(offset + i)} ~ ${props.formatX(offset + i + 1)}`
                    }
                }
            },
            'custom-vertical-line': {
                lineX: chartCurrentLineX
            }
        },
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    callback: formatNumber
                }
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    callback: formatBytes
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
    <Chart ref="chartObj" type="line" :data="chartData" :options="chartOptions" />
</template>

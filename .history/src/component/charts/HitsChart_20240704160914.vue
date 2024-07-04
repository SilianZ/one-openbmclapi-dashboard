<script setup lang="ts">
import Chart from 'primevue/chart';
import { onMounted, ref } from 'vue';
import { type StatsData } from '../utils';
const chartData = ref()
const chartOptions = ref()
const props = defineProps<{
    data: StatsData[],
    oldData: StatsData[],
    current: number,
    offset: number,
    max: number,
}>()

const setChartData = () => {
    const maxn = 10010;
    const hits = Array(maxn);
    const bytes = Array(maxn);
    const old = props.oldData;
    let i = 0;
    const updateData = () for (; )

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
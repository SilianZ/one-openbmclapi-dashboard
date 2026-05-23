<script setup lang="ts">
import { ref as Silian_ref, onMounted as Silian_onMounted, computed as Silian_computed } from 'vue';
import Silian_Chart from 'primevue/chart';
import { type UserAgent as Silian_UserAgent } from '@/api';
const Silian_props = defineProps<{
    data: Silian_UserAgent;
}>();
const Silian_chartData = Silian_ref();
const Silian_chartOptions = Silian_ref();
const Silian_setChartData = () => {
    const Silian_data = Silian_computed(() => Object.entries(Silian_props.data)
        .map(([Silian_ua, Silian_count]) => ({ ua: Silian_ua, count: Silian_count }))
        .sort((Silian_a, Silian_b) => Silian_b.count - Silian_a.count)
        .slice(0, 7));
    const Silian_labels = Silian_data.value.map(({ ua: Silian_ua }) => Silian_ua);
    const Silian_counts = Silian_data.value.map(({ count: Silian_count }) => Silian_count);
    const Silian_color = ['#767681', '#dd426a', '#87d5bb', '#37a97d', '#f8ab9b', '#7e789c', '#db9361'];
    return {
        labels: Silian_labels,
        datasets: [
            {
                data: Silian_counts,
                backgroundColor: Silian_color,
                hoverOffset: 5
            }
        ]
    };
};
const Silian_setChartOptions = () => {
    const Silian_documentStyle = getComputedStyle(document.documentElement);
    const Silian_textColor = Silian_documentStyle.getPropertyValue('--p-text-color');
    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: Silian_textColor
                }
            }
        }
    };
};
Silian_onMounted(() => {
    Silian_chartData.value = Silian_setChartData();
    Silian_chartOptions.value = Silian_setChartOptions();
});</script>

<template>
    <Silian_Chart type="pie" :data="Silian_chartData" :options="Silian_chartOptions" />
</template>

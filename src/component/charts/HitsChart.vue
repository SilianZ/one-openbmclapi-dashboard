<script setup lang="ts">
import Silian_Chart from 'primevue/chart';
import { onMounted as Silian_onMounted, ref as Silian_ref, watch as Silian_watch } from 'vue';
import { formatBytes as Silian_formatBytes, formatNumber as Silian_formatNumber } from '../../utils';
import { type StatsData as Silian_StatsData } from '@/api';
const Silian_chartData = Silian_ref();
const Silian_chartObj = Silian_ref();
const Silian_chartOptions = Silian_ref();
const Silian_props = defineProps<{
    data: Silian_StatsData[];
    oldData: Silian_StatsData[];
    current: number;
    offset: number; // offset >= 0
    max: number;
    formatX: (Silian_i: number) => string; // 格式化 x 轴单位
}>();
const Silian_chartCurrentLineX = Silian_ref(-1);
const Silian_setChartData = () => {
    const Silian_max = Silian_props.max;
    const Silian_offset = Math.floor(Silian_props.current - Silian_props.offset); // offset <= 0
    const Silian_hits = Array(Silian_max);
    const Silian_bytes = Array(Silian_max);
    const Silian_label = Array(Silian_max);
    let Silian_i = 0;
    const Silian_updateData = () => {
        const Silian_oldData = Silian_props.oldData; // 旧版数据
        const Silian_data = Silian_props.data; // 新版数据
        for (; Silian_i + Silian_offset < 0; Silian_i++) {
            // 根据偏移量 offset 处理旧数据
            const Silian_j = Silian_i + Silian_offset + Silian_oldData.length;
            Silian_hits[Silian_i] = Silian_oldData[Silian_j].hits;
            Silian_bytes[Silian_i] = Silian_oldData[Silian_j].bytes;
        }
        for (; Silian_i + Silian_offset < Silian_data.length; Silian_i++) {
            // 根据偏移量 offset 处理当前数据
            Silian_hits[Silian_i] = Silian_data[Silian_i + Silian_offset].hits;
            Silian_bytes[Silian_i] = Silian_data[Silian_i + Silian_offset].bytes;
        }
        for (; Silian_i < Silian_max; Silian_i++) {
            // 补全数值为 0 （暂时还未有值）的数据
            Silian_hits[Silian_i] = 0;
            Silian_bytes[Silian_i] = 0;
        }
        for (let Silian_i = 0; Silian_i < Silian_max; Silian_i++) {
            Silian_label[Silian_i] = Silian_props.formatX(Silian_i + Silian_offset + 1);
        }
        Silian_chartCurrentLineX.value = Silian_props.current - Silian_offset - 1;
    };
    Silian_updateData();
    Silian_watch(() => [Silian_props.data, Silian_props.current], () => {
        Silian_updateData();
        Silian_chartObj.value.refresh();
    });
    return {
        labels: Silian_label,
        datasets: [
            {
                label: '访问量',
                fill: true,
                borderColor: '#f8ab9b',
                yAxisID: 'y1',
                tension: 0.3,
                data: Silian_hits
            },
            {
                label: '流量',
                fill: true,
                borderColor: '#37a97d',
                yAxisID: 'y2',
                tension: 0.3,
                data: Silian_bytes
            }
        ]
    };
};
const Silian_setChartOptions = () => {
    const Silian_offset = Math.floor(Silian_props.current - Silian_props.offset); // offset <= 0
    const Silian_documentStyle = getComputedStyle(document.documentElement);
    const Silian_textColor = Silian_documentStyle.getPropertyValue('--p-text-color');
    const Silian_textColorSecondary = Silian_documentStyle.getPropertyValue('--p-text-muted-color');
    const Silian_surfaceBorder = Silian_documentStyle.getPropertyValue('--p-content-border-color');
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
                    label: (Silian_context: any) => {
                        switch (Silian_context.dataset.yAxisID) {
                            case 'y1':
                                Silian_context.formattedValue = Silian_formatNumber(Silian_context.raw);
                                break;
                            case 'y2':
                                Silian_context.formattedValue = Silian_formatBytes(Silian_context.raw);
                                break;
                        }
                    },
                    title: (Silian_context: any) => {
                        const Silian_i = Silian_context[0].dataIndex;
                        return `${Silian_props.formatX(Silian_offset + Silian_i)} ~ ${Silian_props.formatX(Silian_offset + Silian_i + 1)}`;
                    }
                }
            },
            'custom-vertical-line': {
                lineX: Silian_chartCurrentLineX
            },
            legend: {
                labels: {
                    color: Silian_textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: Silian_textColorSecondary
                },
                grid: {
                    color: Silian_surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    callback: Silian_formatBytes,
                    color: Silian_textColorSecondary
                },
                grid: {
                    color: Silian_surfaceBorder
                }
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    callback: Silian_formatBytes,
                    color: Silian_textColorSecondary
                },
                grid: {
                    color: Silian_surfaceBorder
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
    <Silian_Chart ref="Silian_chartObj" type="line" :data="Silian_chartData" :options="Silian_chartOptions" />
</template>

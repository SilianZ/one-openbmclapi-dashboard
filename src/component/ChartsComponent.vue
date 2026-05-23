<script setup lang="ts">
import Silian_HitsChart from '@/component/charts/HitsChart.vue';
import { type StatsRes as Silian_StatsRes } from '@/api';
import { computed as Silian_computed, ref as Silian_ref } from 'vue';
import Silian_Skeleton from 'primevue/skeleton';
import Silian_UAChart from '@/component/charts/UAChart.vue';
const Silian_props = defineProps<{
    data?: Silian_StatsRes | null;
}>();
const Silian_data = Silian_computed(() => {
    if (!Silian_props.data)
        return null;
    return Silian_props.data;
});
const Silian_nowTime = Silian_ref(new Date());
console.log(Silian_nowTime.value.getMonth());
const Silian_currentTime = Silian_ref({
    hour: Silian_nowTime.value.getHours(),
    day: Silian_nowTime.value.getDate(),
    month: Silian_nowTime.value.getMonth(),
    year: Silian_nowTime.value.getFullYear()
});
const Silian_formatHours = (Silian_i: number) => {
    if (!Silian_data.value) {
        return '';
    }
    if (Silian_i < 0)
        Silian_i = 24 + Silian_i;
    if (Silian_i >= 24)
        Silian_i = Silian_i - 24;
    return `${Silian_i >= 10 ? Silian_i.toString() : `0${Silian_i.toString()}`}:00`;
};
const Silian_formatDays = (Silian_day: number) => {
    if (!Silian_data.value) {
        return '';
    }
    const Silian_date = new Date(Date.UTC(Silian_currentTime.value.year, Silian_currentTime.value.month + 1, Silian_day));
    return `${Silian_date.getMonth()} 月 ${Silian_date.getDate()} 日`;
};
const Silian_formatMonths = (Silian_month: number) => {
    if (!Silian_data.value) {
        return '';
    }
    const Silian_date = new Date(Date.UTC(Silian_currentTime.value.year, Silian_month - 1, 1));
    return `${Silian_date.getFullYear()} 年 ${(Silian_date.getMonth() + 1).toString().padStart(2, '0')} 月`;
};</script>

<template>
    <div class="flex flex-wrap rounded-xl p-4 justify-center m-2" id="charts-container">
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当日请求</div>
            <Silian_HitsChart
                id="hits"
                v-if="Silian_data"
                :data="Silian_data.stats.hours"
                :oldData="Silian_data.prevStats.hours"
                :current="Silian_currentTime.hour"
                :max="25"
                :offset="22"
                :formatX="Silian_formatHours"
            />
            <Silian_Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当月请求</div>
            <Silian_HitsChart
                id="hits"
                v-if="Silian_data"
                :data="Silian_data.stats.days"
                :oldData="Silian_data.prevStats.days"
                :current="Silian_currentTime.day"
                :max="31"
                :offset="27"
                :formatX="Silian_formatDays"
            />
            <Silian_Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">当年请求</div>
            <Silian_HitsChart
                id="hits"
                v-if="Silian_data"
                :data="Silian_data.stats.months"
                :oldData="Silian_data.prevStats.months"
                :current="Silian_currentTime.month + 1"
                :max="13"
                :offset="11"
                :formatX="Silian_formatMonths"
            />
            <Silian_Skeleton v-else id="hits"/>
        </div>
        <div class="flex m-2 flex-col" id="chart">
            <div class="charts-title">用户分布</div>
            <Silian_UAChart
                class="flex items-center justify-center"
                v-if="Silian_data"
                id="uas"
                :data="Silian_data.accesses"
            />
            <Silian_Skeleton v-else id="uas"/>
        </div>
    </div>
</template>

<style scoped>
#hits {
    min-width: 37rem;
    min-height: 13rem;
    border-radius: 0.75rem;
}
#chart {
    min-width: 37rem;
    min-height: 17rem;
}
.charts-title {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}
#charts-container {
    margin-top: 2rem;
    padding-bottom: 1.5rem;
    border: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
}
#uas {
    min-width: 32rem;
    min-height: 32rem;
}

@media screen and (max-width: 720px) {
    #hits {
        min-width: 17rem;
        min-height: 13rem;
    }
    #chart {
        min-width: auto;
        min-height: 17rem;
    }
    #uas {
        min-width: 17rem;
        min-height: 17rem;
    }
}
</style>

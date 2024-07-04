<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import HitsChart from './charts/HitsChart.vue';
import { ref } from 'vue';
import { type StatsData } from './utils';

const data: StatsData[] = ref([
    {
        hits: 114382,
        bytes: 338507637190
    },
    {
        hits: 168456,
        bytes: 460793080789
    },
    {
        hits: 235454,
        bytes: 508189307311
    },
   
])

const oldData: StatsData[] = ref([
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 0,
        "bytes": 0
    },
    {
        "hits": 11819,
        "bytes": 33919698926
    },
    {
        "hits": 196392,
        "bytes": 433948946387
    },
    {
        "hits": 318588,
        "bytes": 863696258018
    },
    {
        "hits": 334621,
        "bytes": 870673850332
    },
    {
        "hits": 271674,
        "bytes": 570457422421
    },
    {
        "hits": 230218,
        "bytes": 856442801525
    },
    {
        "hits": 279387,
        "bytes": 1059301812601
    },
    {
        "hits": 207444,
        "bytes": 531388671176
    },
    {
        "hits": 137219,
        "bytes": 381584391100
    },
    {
        "hits": 148764,
        "bytes": 392846675628
    },
    {
        "hits": 82549,
        "bytes": 248132146089
    },
    {
        "hits": 49951,
        "bytes": 132148864838
    },
    {
        "hits": 30448,
        "bytes": 71888898090
    },
    {
        "hits": 22752,
        "bytes": 53978203919
    },
    {
        "hits": 20013,
        "bytes": 48416081221
    },
    {
        "hits": 29320,
        "bytes": 68648407482
    },
    {
        "hits": 57014,
        "bytes": 151468079048
    }
])
const current = ref(12)
const offset = ref(8)
const max = ref(24)
</script>

<template>
    <h1>Python OpenBMCLAPI 仪表盘</h1>
    <HitsChart
        v-if="data"
        :oldData="oldData"
        :data="data"
        :current="current"
        :offset="offset"
        :max="max"
    />
    <Skeleton v-else height="13rem" width="45rem" />
</template>
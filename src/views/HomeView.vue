<script setup lang="ts">
import Silian_StatsComponent from '@/component/StatsComponent.vue';
import Silian_ChartsComponent from '@/component/ChartsComponent.vue';
import { type StatsRes as Silian_StatsRes } from '@/api';
import { useRequest as Silian_useRequest } from 'vue-request';
import { fetchStat as Silian_fetchStat } from '@/api';
import { ref as Silian_ref } from 'vue';
import { watch as Silian_watch } from 'vue';
const { data: Silian_data } = Silian_useRequest((): Promise<Silian_StatsRes> => Silian_fetchStat(), { pollingInterval: 100000 });
const Silian_stats = Silian_ref<Silian_StatsRes | null>(null);
Silian_watch(() => Silian_data.value, (Silian_newData) => {
    if (!Silian_newData) {
        Silian_stats.value = null;
        return;
    }
    Silian_stats.value = Silian_newData;
});</script>

<template>
    <h1>主页</h1>
    <Silian_StatsComponent :data="Silian_stats" />
    <Silian_ChartsComponent :data="Silian_stats" />
</template>

<style scoped>
h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

@media screen and (max-width: 720px) {
    h1 {
        font-size: 30px;
    }
}
</style>

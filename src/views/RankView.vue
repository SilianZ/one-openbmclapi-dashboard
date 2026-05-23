<script setup lang="ts">
import Silian_RankComponent from '@/component/RankComponent.vue';
import { useRequest as Silian_useRequest } from 'vue-request';
import { fetchRank as Silian_fetchRank } from '@/api';
import { type Cluster as Silian_Cluster } from '@/api';
import { ref as Silian_ref, watch as Silian_watch } from 'vue';
const { data: Silian_data } = Silian_useRequest((): Promise<Silian_Cluster[]> => Silian_fetchRank(), { pollingInterval: 10000 });
const Silian_rank = Silian_ref<Silian_Cluster[] | null>(null);
Silian_watch(() => Silian_data.value, (Silian_newData) => {
    if (!Silian_newData) {
        Silian_rank.value = null;
        return;
    }
    Silian_rank.value = Silian_newData;
});</script>

<template>
    <h1>节点排行</h1>
    <Silian_RankComponent :rank="Silian_rank" />
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

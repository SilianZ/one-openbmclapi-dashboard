<script setup lang="ts">
import RankComponent from '@/component/RankComponent.vue';
import { useRequest } from 'vue-request';
import { fetchRank } from '@/api';
import { type Cluster } from '@/api';
import { ref, watch} from 'vue';

const { data } = useRequest((): Promise<Cluster[]> => fetchRank(), { pollingInterval: 10000 })

const rank = ref<Cluster[] | null>(null)

watch(
    () => data.value,
    (newData) => {
        if (!newData) {
            rank.value = null
            return
        }
        rank.value = newData
    }
)

</script>

<template>
    <h1>节点排行</h1>
    <RankComponent :rank="rank" />
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

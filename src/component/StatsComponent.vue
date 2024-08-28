<script setup lang="ts">
import { type StatsRes } from '@/api'
import { computed, ref } from 'vue'
import { formatBytes } from '@/utils';

const props = defineProps<{
    data?: StatsRes | null
}>()

const data = computed(() => {
    if (!props.data) return null
    return props.data
})
const startTime = computed(() => data.value?.startTime ?? null)
const nowTime = ref(new Date())

const hours = computed(() => {
    return startTime.value !== null
        ? ((nowTime.value.getTime() - startTime.value) / (60 * 60 * 1000)).toFixed(2).toString()
        : 'NaN'
})

const status = computed(() => {
    const status = data.value?.status as number
    const a = ['同步中', '运行中']
    return a[status]
})
</script>

<template>
    <div class="flex flex-wrap m-1 justify-between" id="stats-container">
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">运行时间</div>
            <div v-if="data" class="stats-data">{{ hours }} 小时</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">服务器状态</div>
            <div v-if="data" class="stats-data">{{ status }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">连接数</div>
            <div v-if="data" class="stats-data">{{ data.connections }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">内存情况</div>
            <div v-if="data" class="stats-data">{{ formatBytes(data.memory) }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">CPU 情况</div>
            <div v-if="data" class="stats-data">{{ data.cpu }}%</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
    </div>
</template>

<style scoped>
#stats-container {
    margin-top: 2rem;
}
#stats-card {
    border: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1.35rem;
    padding-bottom: 1.35rem;
    width: calc(25% - 0.5rem);
}
.stats-title {
    display: block;
    font-size: 1.17em;
    margin-block-start: 0.5em;
    margin-block-end: 0.35em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}
.stats-data {
    display: block;
    font-size: 1.58em;
    font-weight: 700;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}
@media screen and (max-width: 720px) {
    #stats-card {
        width: 100%;
    }
}
</style>

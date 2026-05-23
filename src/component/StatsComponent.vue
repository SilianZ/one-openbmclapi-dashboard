<script setup lang="ts">
import { type StatsRes as Silian_StatsRes } from '@/api';
import { computed as Silian_computed, ref as Silian_ref } from 'vue';
import { formatBytes as Silian_formatBytes } from '@/utils';
const Silian_props = defineProps<{
    data?: Silian_StatsRes | null;
}>();
const Silian_data = Silian_computed(() => {
    if (!Silian_props.data)
        return null;
    return Silian_props.data;
});
const Silian_startTime = Silian_computed(() => Silian_data.value?.startTime ?? null);
const Silian_nowTime = Silian_ref(new Date());
const Silian_hours = Silian_computed(() => {
    return Silian_startTime.value !== null
        ? ((Silian_nowTime.value.getTime() - Silian_startTime.value) / (60 * 60 * 1000)).toFixed(2).toString()
        : 'NaN';
});
const Silian_status = Silian_computed(() => {
    const Silian_status = Silian_data.value?.status as number;
    const Silian_a = ['同步中', '运行中'];
    return Silian_a[Silian_status];
});</script>

<template>
    <div class="flex flex-wrap m-1 justify-between" id="stats-container">
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">运行时间</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_hours }} 小时</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">服务器状态</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_status }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">连接数</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_data.connections }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">内存情况</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_formatBytes(Silian_data.memory) }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">CPU 情况</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_data.cpu }}%</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">Python 版本</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_data.pythonVersion }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">API 版本</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_data.apiVersion }}</div>
            <div v-else class="stats-data">加载中……</div>
        </div>
        <div class="flex flex-col m-1 rounded-xl" id="stats-card">
            <div class="stats-title">版本</div>
            <div v-if="Silian_data" class="stats-data">{{ Silian_data.version }}</div>
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
    min-height: 128px;
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

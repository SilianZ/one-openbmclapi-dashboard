<script setup lang="ts">
import Button from 'primevue/button'
import { type StatsRes } from '@/api'
import { computed, ref } from 'vue'

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
</script>

<template>
    <div class="flex items-center" id="stats-container">
        <Button id="status-button" disabled>
            <div v-if="data">
                <div v-if="data.status == 1">
                    <p><b>运行中</b></p>
                </div>
            </div>
            <!-- prettier-ignore -->
            <p v-else><b>加载中……</b></p>
        </Button>
        <!-- prettier-ignore -->
        <p class="p-4" v-if="data"><i><b>服务器已运行 {{ hours }} 小时</b></i></p>
    </div>
</template>

<style scoped>
#status-button {
    background: var(--p-teal-500);
    border: var(--p-teal-500);
}
</style>

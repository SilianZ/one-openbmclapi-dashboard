<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
import { computed, onMounted, ref, watch } from 'vue'
import { type Cluster } from '@/api'
import { formatBytes, formatNumber } from '@/utils'

const props = defineProps<{
    rank?: Cluster[] | null
}>()

const data = computed(() => {
    if (!props.rank) return null
    return props.rank
})


const setData = () => {
    const stats: {i: number, name: string, status: string, hits: string}[]= []
    const updateData = () => {
        if (data.value) {
            for (let i = 0; i < data.value.length; i++) {
                console.log(i, data.value[i].metric?.bytes.toString())
                stats.push({
                    i: i + 1,
                    name: data.value[i].name,
                    status: data.value[i].isEnabled ? 'online' : 'offline',
                    hits: `${formatBytes(data.value[i].metric?.bytes || 0)} / ${formatNumber(data.value[i].metric?.hits || 0)}`
                })
            }
        }
    }
    watch(
        () => [props.rank],
        () => {
            updateData()
        }
    )
    return stats
}

const stats = ref()

onMounted(
    () => {
        stats.value = setData()
    }
)

const getSeverity = (data: string) => (data == 'online' ? 'success' : 'danger')
const getStatus = (data: string) => (data == 'online' ? '在线' : '离线')
</script>

<template>
    <div v-if="data" class="rounded-xl p-6 m-2" id="table-container">
        <DataTable :value="stats" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]">
            <Column field="i" header="排名" />
            <Column field="name" header="节点名称" />
            <Column header="状态">
                <template #body="slotProps">
                    <Tag
                        :value="getStatus(slotProps.data.status)"
                        :severity="getSeverity(slotProps.data.status)"
                    />
                </template>
            </Column>
            <Column field="hits" header="流量 / 访问量" />
        </DataTable>
    </div>
    <Skeleton v-else height="300px" class="m-2" style="border-radius: 0.75rem; margin-top: 2rem;"></Skeleton>
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
#table-container {
    margin-top: 2rem;
    border: 1px solid var(--p-content-border-color);
    background: var(--p-content-background);
}

@media screen and (max-width: 720px) {
    h1 {
        font-size: 30px;
    }
}
</style>

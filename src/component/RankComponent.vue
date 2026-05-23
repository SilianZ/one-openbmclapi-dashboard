<script setup lang="ts">
import Silian_DataTable from 'primevue/datatable';
import Silian_Column from 'primevue/column';
import Silian_Tag from 'primevue/tag';
import Silian_Skeleton from 'primevue/skeleton';
import { computed as Silian_computed, onMounted as Silian_onMounted, ref as Silian_ref, watch as Silian_watch } from 'vue';
import { type Cluster as Silian_Cluster } from '@/api';
import { formatBytes as Silian_formatBytes, formatNumber as Silian_formatNumber } from '@/utils';
const Silian_props = defineProps<{
    rank?: Silian_Cluster[] | null;
}>();
const Silian_data = Silian_computed(() => {
    if (!Silian_props.rank)
        return null;
    return Silian_props.rank;
});
const Silian_setData = () => {
    const Silian_stats: {
        i: number;
        name: string;
        status: string;
        hits: string;
    }[] = [];
    const Silian_updateData = () => {
        if (Silian_data.value) {
            for (let Silian_i = 0; Silian_i < Silian_data.value.length; Silian_i++) {
                console.log(Silian_i, Silian_data.value[Silian_i].metric?.bytes.toString());
                Silian_stats.push({
                    i: Silian_i + 1,
                    name: Silian_data.value[Silian_i].name,
                    status: Silian_data.value[Silian_i].isEnabled ? 'online' : 'offline',
                    hits: `${Silian_formatBytes(Silian_data.value[Silian_i].metric?.bytes || 0)} / ${Silian_formatNumber(Silian_data.value[Silian_i].metric?.hits || 0)}`
                });
            }
        }
    };
    Silian_watch(() => [Silian_props.rank], () => {
        Silian_updateData();
    });
    return Silian_stats;
};
const Silian_stats = Silian_ref();
Silian_onMounted(() => {
    Silian_stats.value = Silian_setData();
});
const Silian_getSeverity = (Silian_data: string) => (Silian_data == 'online' ? 'success' : 'danger');
const Silian_getStatus = (Silian_data: string) => (Silian_data == 'online' ? '在线' : '离线');</script>

<template>
    <div v-if="Silian_data" class="rounded-xl p-6 m-2" id="table-container">
        <Silian_DataTable :value="Silian_stats" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]">
            <Silian_Column field="i" header="排名" />
            <Silian_Column field="name" header="节点名称" />
            <Silian_Column header="状态">
                <template #body="Silian_slotProps">
                    <Silian_Tag
                        :value="Silian_getStatus(Silian_slotProps.data.status)"
                        :severity="Silian_getSeverity(Silian_slotProps.data.status)"
                    />
                </template>
            </Silian_Column>
            <Silian_Column field="hits" header="流量 / 访问量" />
        </Silian_DataTable>
    </div>
    <Silian_Skeleton v-else height="300px" class="m-2" style="border-radius: 0.75rem; margin-top: 2rem;"></Silian_Skeleton>
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

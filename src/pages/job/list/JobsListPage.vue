<template>
  <q-page id="page-jobs-list" class="flex flex-center">
    Jobs List
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useJobsStore } from 'stores/jobs';
import { storeToRefs } from 'pinia';
import { useColumns } from 'src/composables/jobs';

export default defineComponent({
  name: 'JobsListPage',
  setup() {
    const store = useJobsStore();
    const { query } = store;
    const { jobs, count } = storeToRefs(store);
    const { columns, pagination } = useColumns()
    
    async function queryJobs () {
      const orderBy = JSON.stringify({
        [pagination.value.sortBy]: pagination.value.descending ? ' desc' : 'asc'
      })
      const select = JSON.stringify({ jobId: true, name: true, updatedAt: true })
      const take = pagination.value.rowsPerPage
      const skip = (pagination.value.page - 1) * take
      await query(take, skip, undefined, undefined, orderBy,select);
    }

    onMounted(queryJobs)
    return {
      jobs,
      count,
      columns,
      pagination
    };
  },
});
</script>

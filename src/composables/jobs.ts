import { useJobsStore } from 'src/stores/jobs';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export function useColumns() {
  const store = useJobsStore();
  const router = useRouter();
  const route = useRoute();
  const i18n = useI18n();
  const columns = computed(() => {
    return [
      { name: 'name', label: i18n.t('fields.name'), field: 'name', },
      { name: 'updatedAt', label: i18n.t('fields.updatedAt'), field: 'updatedAt', },
      { name: 'actions', field: 'jobId', }
    ]
  });
  
  const _defaults = {
    sort: 'name',
    desc: false,
    page: 1,
    rows: 10,
  }

  const pagination = ref({
    sortBy: route.query.sort && typeof route.query.sort === 'string' ? route.query.sort : _defaults.sort,
    descending: route.query.desc && typeof route.query.desc === 'string' ? route.query.desc === 'true' : _defaults.desc,
    page: route.query.page && typeof route.query.page === 'string' ? parseInt(route.query.page) : _defaults.page,
    rowsPerPage: route.query.rows && typeof route.query.rows === 'string' ? parseInt(route.query.rows) : _defaults.rows,
    rowsNumber: store.count
  });

  const query = computed(() => {
    const query: Partial<typeof _defaults> = {}
    if (pagination.value.sortBy !== _defaults.sort)
      query.sort = pagination.value.sortBy;
    if (pagination.value.descending !== _defaults.desc)
      query.desc = pagination.value.descending;
    if (pagination.value.page !== _defaults.page)
      query.page = pagination.value.page;
    if (pagination.value.rowsPerPage !== _defaults.rows)
      query.rows = pagination.value.rowsPerPage;
    return query;
  })

  watch(() => query.value, () => {
    router.push({
      path: route.path,
      params: {
        query: query.value as never
      }
    })
  })
  return {
    columns,
    pagination
  }
}
import { defineStore } from 'pinia';
import { Job, JobApi, JobQueryResponseDto } from 'api';

export const loginPageStoreName = 'jobsList';

type QueryParams = Parameters<JobApi['query']>

const useLoginPageStore = defineStore(loginPageStoreName, {
  state: () => ({
    data: [],
    count: 0
  } as JobQueryResponseDto),
  actions: {
    async query(...args: QueryParams) {
      const { data: { data, count } } = await this.$jobApi.query(...args);
      this.data = data;
      this.count = count; 
    },
  },
});

export type LoginPageStore = ReturnType<typeof useLoginPageStore>;
export default useLoginPageStore;

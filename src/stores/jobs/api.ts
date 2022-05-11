import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { companiesStoreName, CreateParams, DeleteParams, FindParams, JobsState, QueryParams, UpdateParams } from './types';

export const useJobsApiStore = defineStore(companiesStoreName, {
  state: () => ({
    jobs: [],
    count: 0
  } as JobsState),
  actions: {
    async query (...args: QueryParams) {
      if (args[7] === undefined)
        args[7]= true;
      const { data: res } = await this.$jobApi.query(...args);
      this.jobs = res.data;
      this.count = res.count;
    },
    async find (...args: FindParams) {
      const { data: res } = await this.$jobApi.find(...args);
      this.job = res;
    },
    async create (...args: CreateParams) {
      const [request, options] = args
      if (!request.jobId) {
        request.jobId = uid();
      }
      await this.$jobApi.create(request, options);
    },
    async update (...args: UpdateParams) {
      await this.$jobApi.update(...args);
    },
    async delete (...args: DeleteParams) {
      await this.$jobApi._delete(...args);
    }
  }
})

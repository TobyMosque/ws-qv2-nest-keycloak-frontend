import { defineStore } from 'pinia';
import { companiesStoreName, CreateParams, DeleteParams, FindParams, JobsState, QueryParams, UpdateParams } from './types';

export const useJobsRtdbStore = defineStore(companiesStoreName, {
  state: () => ({
    jobs: [],
    count: 0
  } as JobsState),
  actions: {
    async query (...args: QueryParams) {
      await Promise.resolve(args);
    },
    async find (...args: FindParams) {
      await Promise.resolve(args);
    },
    async create (...args: CreateParams) {
      await Promise.resolve(args);
    },
    async update (...args: UpdateParams) {
      await Promise.resolve(args);
    },
    async delete (...args: DeleteParams) {
      await Promise.resolve(args);
    }
  }
})

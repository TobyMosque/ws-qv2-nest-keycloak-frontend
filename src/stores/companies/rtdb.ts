import { defineStore } from 'pinia';
import { companiesStoreName, CreateParams, DeleteParams, FindParams, CompaniesState, QueryParams, UpdateParams } from './types';

export const useCompaniesRtdbStore = defineStore(companiesStoreName, {
  state: () => ({
    companies: [],
    count: 0
  } as CompaniesState),
  actions: {
    async query (...args: QueryParams) {
      await Promise.resolve(args);
    },
    async find (...args: FindParams) {
      const { data: res } = await this.$companyApi.find(...args);
      this.company = res;
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

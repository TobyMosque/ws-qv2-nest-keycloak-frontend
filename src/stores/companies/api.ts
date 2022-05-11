import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { companiesStoreName, CreateParams, DeleteParams, FindParams, CompaniesState, QueryParams, UpdateParams } from './types';

export const useCompaniesApiStore = defineStore(companiesStoreName, {
  state: () => ({
    companies: [],
    count: 0
  } as CompaniesState),
  actions: {
    async query (...args: QueryParams) {
      if (args[7] === undefined)
        args[7]= true;
      const { data: res } = await this.$companyApi.query(...args);
      this.companies = res.data;
      this.count = res.count;
    },
    async find (...args: FindParams) {
      const { data: res } = await this.$companyApi.find(...args);
      this.company = res;
    },
    async create (...args: CreateParams) {
      const [request, options] = args
      if (!request.companyId) {
        request.companyId = uid();
      }
      await this.$companyApi.create(request, options);
    },
    async update (...args: UpdateParams) {
      await this.$companyApi.update(...args);
    },
    async delete (...args: DeleteParams) {
      await this.$companyApi._delete(...args);
    }
  }
})

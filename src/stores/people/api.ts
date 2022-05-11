import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { peopleStoreName, CreateParams, DeleteParams, FindParams, PeopleState, QueryParams, UpdateParams } from './types';

export const usePeopleApiStore = defineStore(peopleStoreName, {
  state: () => ({
    people: [],
    count: 0
  } as PeopleState),
  actions: {
    async query (...args: QueryParams) {
      if (args[7] === undefined)
        args[7]= true;
      const { data: res } = await this.$personApi.query(...args);
      this.people = res.data;
      this.count = res.count;
    },
    async find (...args: FindParams) {
      const { data: res } = await this.$personApi.find(...args);
      this.person = res;
    },
    async create (...args: CreateParams) {
      const [request, options] = args
      if (!request.personId) {
        request.personId = uid();
      }
      await this.$personApi.create(request, options);
    },
    async update (...args: UpdateParams) {
      await this.$personApi.update(...args);
    },
    async delete (...args: DeleteParams) {
      await this.$personApi._delete(...args);
    }
  }
})

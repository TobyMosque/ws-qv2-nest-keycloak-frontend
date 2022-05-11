import { defineStore } from 'pinia';
import { peopleStoreName, CreateParams, DeleteParams, FindParams, PeopleState, QueryParams, UpdateParams } from './types';

export const usePeopleRtdbStore = defineStore(peopleStoreName, {
  state: () => ({
    people: [],
    count: 0
  } as PeopleState),
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

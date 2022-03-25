import { defineStore } from 'pinia';
import { components } from 'api/swagger.json';

const { schemas } = components;
schemas.CreateJobPeopleRelationInputDto;

export const appStoreName = 'app';
const useAppStore = defineStore(appStoreName, {
  state: () => ({
    scheme: {} as Record<string, unknown>
  }),
  actions: {
    getScheme () {

    }
  }
});

export type AppStore = ReturnType<typeof defineStore>;
export default useAppStore;

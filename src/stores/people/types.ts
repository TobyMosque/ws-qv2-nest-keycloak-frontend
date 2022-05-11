import { Person, PersonApi } from 'api';

export const peopleStoreName = 'people';
export type QueryParams = Parameters<PersonApi['query']>
export type FindParams = Parameters<PersonApi['find']>
export type CreateParams = Parameters<PersonApi['create']>
export type UpdateParams = Parameters<PersonApi['update']>
export type DeleteParams = Parameters<PersonApi['_delete']>
export interface PeopleState {
  person?: Person
  people: Person[];
  count?: number;
}

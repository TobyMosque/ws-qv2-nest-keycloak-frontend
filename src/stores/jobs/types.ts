import { Job, JobApi } from 'api';

export const companiesStoreName = 'companies';
export type QueryParams = Parameters<JobApi['query']>
export type FindParams = Parameters<JobApi['find']>
export type CreateParams = Parameters<JobApi['create']>
export type UpdateParams = Parameters<JobApi['update']>
export type DeleteParams = Parameters<JobApi['_delete']>
export interface JobsState {
  job?: Job
  jobs: Job[];
  count?: number;
}

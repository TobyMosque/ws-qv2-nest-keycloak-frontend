import { Company, CompanyApi } from 'api';

export const companiesStoreName = 'companies';
export type QueryParams = Parameters<CompanyApi['query']>
export type FindParams = Parameters<CompanyApi['find']>
export type CreateParams = Parameters<CompanyApi['create']>
export type UpdateParams = Parameters<CompanyApi['update']>
export type DeleteParams = Parameters<CompanyApi['_delete']>
export interface CompaniesState {
  company?: Company
  companies: Company[];
  count?: number;
}

import { BaseResponse, Organization, Terminal, UUID } from './types';

export class IikoClient {
  public constructor(options: { apiLogin: string, baseUrl?: string });

  public get apiToken(): string;

  public getAuthToken(options?: { timeout?: number }): Promise<string>;

  public getOrganizations(options: {
    organizationIds?: UUID[],
    returnAdditionalInfo: boolean,
    includeDisabled?: boolean,
    returnExternalData?: string[],
    timeout?: number
  }): Promise<BaseResponse<{ organizations: Organization[] }>>;

  public getTerminals(options: {
    timeout?: number,
    organizationIds: UUID[],
    includeDisabled?: boolean,
    returnExternalData?: boolean,
  }): Promise<BaseResponse<{
    terminalGroups: { organizationId: UUID; items: Terminal[] }[],
    terminalGroupsInSleep: { organizationId: UUID; items: Terminal[] }[]
  }>>;
}
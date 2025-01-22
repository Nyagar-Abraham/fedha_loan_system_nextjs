export interface CreateBankParams {
  params: {
    name: string;
    branchCode: string;
    headquarters: string;
    establishedYear: string;
    services: string[];
    contactEmail: string;
    contactPhone: string;
    website: string;
    logo?: string | undefined;
  };
  path: string;
}
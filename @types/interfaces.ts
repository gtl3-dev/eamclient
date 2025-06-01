export interface GrpListDatatype {
  assetgrpsid: number;
  companyidkey: string;
  shortname: string;
  longname: string;
  assetgrpscustom1: string;
  assetgrpscustom2: string;
  assetgrpscustom3: string;
  assetgrpscustom4: string;
  assetgrpscustom5: string;
}

export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
  };

export type SessionPayload = {
    userId: string;
    expiresAt: Date;
  };
     
interface AddrType {
      Id: string;
      Line1: string;
      City: string;
      CountrySubDivisionCode: string;
      PostalCode: string;
      Lat: string;
      Long: string;
    }
export interface CompanyInfo {
      CompanyName: string;
      LegalName: string;
      CompanyAddr: [AddrType];
      CustomerCommunicationAddr: [AddrType]
      LegalAddr: [AddrType];
      CustomerCommunicationEmailAddr: [ { Address: string; }];
      PrimaryPhone?: {};
      CompanyStartDate: string;
      FiscalYearStartMonth: string;
      Country: string;
      Email: [ { Address: string; } ];
      WebAddr?: {};
      SupportedLanguages: string;
      DefaultTimeZone:  string;
      domain: string;
      sparse: boolean;
      Id: string;
      SyncToken: string;
      MetaData: [{
      CreateTime:  string;
      LastUpdatedTime:  string;
    }];
    };


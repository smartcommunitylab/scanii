export enum LabelType {
  DEFAULT = 'DEFAULT',
  ORGANISATION = 'ORGANISATION',
  FULL_NAME = 'FULL_NAME',
}
export class ClaimantCountryIdGenerator {
  private index: number;

  constructor(index: number) {
    this.index = index;
  }

  public get claimantCountryId(): string {
    return 'parties[' + this.index + '].dynformSCB1ClaimantCountry';
  }

  public get claimantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCB1ClaimantRepresentativeCountry'
    );
  }
}
export class DefendantCountryIdGenerator {
  private index: number;

  constructor(index: number) {
    this.index = index;
  }

  public get defendantCountryId(): string {
    return 'parties[' + this.index + '].dynformSCB1DefendantCountry';
  }

  public get defendantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCB1DefendantRepresentativeCountry'
    );
  }
}
export const courtCountrySelectId = 'dynformSCB1CountryCourt';

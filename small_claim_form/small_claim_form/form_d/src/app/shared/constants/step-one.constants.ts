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
    return 'parties[' + this.index + '].dynformSCD1ClaimantCountry';
  }

  public get claimantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCD1ClaimantRepresentativeCountry'
    );
  }
}
export class DefendantCountryIdGenerator {
  private index: number;

  constructor(index: number) {
    this.index = index;
  }

  public get defendantCountryId(): string {
    return 'parties[' + this.index + '].dynformSCD1DefendantCountry';
  }

  public get defendantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCD1DefendantRepresentativeCountry'
    );
  }
}
export const courtCountrySelectId = 'dynformSCD1CountryCourt';

export enum LabelType {
  DEFAULT = 'DEFAULT',
  ORGANISATION = 'ORGANISATION',
  FULL_NAME = 'FULL_NAME',
}
export class CountryIdGenerator {
  private index: number;

  constructor(index: number) {
    this.index = index;
  }

  public get claimantCountryId(): string {
    return 'parties[' + this.index + '].dynformSCA2ClaimantCountry';
  }

  public get claimantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCA2ClaimantRepresentativeCountry'
    );
  }
}

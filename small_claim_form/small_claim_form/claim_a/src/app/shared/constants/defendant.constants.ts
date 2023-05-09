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

  public get defendantCountryId(): string {
    return 'parties[' + this.index + '].dynformSCA2DefendantCountry';
  }

  public get defendantRepresentativeCountryId(): string {
    return (
      'parties[' + this.index + '].dynformSCA2DefendantRepresentativeCountry'
    );
  }
}

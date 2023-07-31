export class StepOne {
  _expiryDate: string;
  _languages?: string[];
  _languagesNames?: string[];
  _statement?: string;
  _doneAt: string;
  _date: string;

  constructor(
    expiryDate: string,
    doneAt: string,
    date: string,
    language?: string[],
    languagesNames?: string[],
    statement?: string
  ) {
    this._expiryDate = expiryDate;
    this._doneAt = doneAt;
    this._date = date;
    if (language) this._languages = language;
    if (languagesNames) this._languagesNames = languagesNames;
    if (statement) this._statement = statement;
  }

  get expiryDate(): string {
    return this._expiryDate;
  }

  get languages(): string[] | undefined {
    return this._languages;
  }

  get languagesNames(): string[] | undefined {
    return this._languagesNames;
  }

  get statement(): string | undefined {
    return this._statement;
  }

  get doneAt(): string {
    return this._doneAt;
  }

  get date(): string {
    return this._date;
  }
}

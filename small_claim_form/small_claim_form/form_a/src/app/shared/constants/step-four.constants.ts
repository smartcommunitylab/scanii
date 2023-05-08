export const crossBorderNatureShowHideFields = {
  claimantCountryOther: {
    triggeringFormControlName: 'claimantCountry',
    triggeringValue: 'other',
    triggeringFieldId: 'dynformSCA5claimantResidence',
  },
  defendantCountryOther: {
    triggeringFormControlName: 'defendantCountry',
    triggeringValue: 'other',
    triggeringFieldId: 'dynformSCA5defendantResidence',
  },
};

export const bankDetailsShowHideFields = {
  bankTransfer: {
    triggeringFieldId: 'dynformSCA5PaymentMethodBankTransfer',
  },
  creditCard: {
    triggeringValue: true,
    triggeringFieldId: 'dynformSCA5PaymentMethodCreditCard',
  },
  directDebit: {
    triggeringValue: true,
    triggeringFieldId: 'dynformSCA5PaymentMethodDirect',
  },
  other: {
    triggeringValue: true,
    triggeringFieldId: 'dynformSCA5PaymentMethodOther',
  },
};

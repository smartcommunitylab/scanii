//each key of this object is equal both to the valu of the HTML element whose id is the value associated with the key "triggeringFieldId" and the name of the corresponding formControl
export const crossBorderNatureShowHideFields = {
  claimantCountryOther: {
    triggeringFormControlName: "claimantCountry",
    triggeringValue: "other",
    triggeringFieldId: "dynformSCA5claimantResidence",
  },
  defendantCountryOther: {
    triggeringFormControlName: "defendantCountry",
    triggeringValue: "other",
    triggeringFieldId: "dynformSCA5defendantResidence",
  },
  courtCountryOther: {
    triggeringFormControlName: "courtCountry",
    triggeringValue: "other",
    triggeringFieldId: "dynformSCA5countryCourt",
  },
};

export const bankDetailsShowHideFields = {
  //bankTransfer does not have the field "triggeringValue" because there is no a section to expand when the user clicks on this radio button
  bankTransfer: {
    triggeringFieldId: "dynformSCA5PaymentMethodBankTransfer",
  },
  creditCard: {
    triggeringValue: true,
    triggeringFieldId: "dynformSCA5PaymentMethodCreditCard",
  },
  directDebit: {
    triggeringValue: true,
    triggeringFieldId: "dynformSCA5PaymentMethodDirect",
  },
  other: {
    triggeringValue: true,
    triggeringFieldId: "dynformSCA5PaymentMethodOther",
  },
};

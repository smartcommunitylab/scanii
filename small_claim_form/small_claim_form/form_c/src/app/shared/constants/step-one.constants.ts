export const stepOneShowHideFields = {
  negativePartialApproval: {
    triggeringFormControlName: "claimApproval",
    triggeringValues: ["yes", "no", "partial"],
    triggeringFieldIds: ["dynforms_Yes_First_Capital", "dynforms_No_First_Capital", "dynforms_Partially"],
  },
  outsideScopeText: {
    triggeringFormControlName: "outsideScope",
    triggeringValue: "yes",
    triggeringFieldId: "yesOutsideScope",
  },
  otherText: {
    triggeringFormControlName: "other",
    triggeringValue: "yes",
    triggeringFieldId: "yesOther",
  },
  writtenEvidenceText: {
    triggeringFormControlName: "writtenEvidence",
    triggeringValue: "yes",
    triggeringFieldId: "yesWrittenEvidence",
  },
  witnessesText: {
    triggeringFormControlName: "witnesses",
    triggeringValue: "yes",
    triggeringFieldId: "yesWitness",
  },
  otherEvidenceText: {
    triggeringFormControlName: "otherEvidence",
    triggeringValue: "yes",
    triggeringFieldId: "yesEvidOther",
  },
  oralHearingReasons: {
    triggeringFormControlName: "oralHearingRequest",
    triggeringValue: "yes",
    triggeringFieldId: "yesWantOralHearing",
  },
  oralHearingPhysicallyPresenceReasons: {
    triggeringFormControlName: "oralHearingPhysicallyPresence",
    triggeringValue: "yes",
    triggeringFieldId: "yesHoldOralHearing",
  },
  proceedingsCostClaimText: {
    triggeringFormControlName: "proceedingsCostClaim",
    triggeringValue: "yes",
    triggeringFieldId: "yesCostsClaiming",
  },
  counterclaim: {
    triggeringFormControlName: "counterclaim",
    triggeringValue: "yes",
    triggeringFieldId: "yesMakeCounterclaim",
  },
};

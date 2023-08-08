export class Claim {
    type: string;
    claimant: string;
    defendant: string;
    amount: string;
    description: string;
    details: {
      documents: number[];
    };
  
    constructor(
      claimant: string,
      defendant: string,
      amount: string,
      description: string,
      documents: number[]
    ) {
      this.type = "claim";
      this.claimant = claimant;
      this.defendant = defendant;
      this.amount = amount;
      this.description = description;
      this.details = {
        documents: documents,
      };
    }
  }
  
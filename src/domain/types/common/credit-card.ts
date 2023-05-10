export interface CreditCard {
  cardNumber: string;
  CVV: string;
  expDate: string;
  brand: string;
  address: Address;
  cardholderName: string;
}

export interface Address {
  city: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  state: string;
}

export enum CreditCardBrand {
  PINDebit = "PIN Debit",
  Visa = "Visa",
  EBT = "EBT",
  MasterCard = "MasterCard",
  Discover = "Discover",
  Amex = "American Express",
  DinersClub = "Diners Club",
  JCB = "JCB",
  VisaDebit = "Visa (debit)"
}

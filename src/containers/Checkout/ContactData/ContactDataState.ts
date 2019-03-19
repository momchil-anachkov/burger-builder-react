export interface ContactDataAddress {
  street: string,
  postalCode: string,
}

export interface ContactDataState {
  name: string;
  email: string;
  address: ContactDataAddress,
}

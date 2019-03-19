export interface ContactDataAddress {
  street: string,
  postalCode: string,
}

export interface ContactDataState {
  loading: boolean;
  name: string;
  email: string;
  address: ContactDataAddress,
}

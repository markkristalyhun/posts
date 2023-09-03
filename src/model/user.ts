export interface UserCompanyModel {
  readonly name: string;
  readonly catchPhrase: string;
  readonly bs: string;
}

export interface UserAddressModel {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: {
    readonly lat: number;
    readonly lng: number;
  };
}

export interface UserModel {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;

  readonly address: UserAddressModel;
  readonly phone: string;
  readonly website: string;
  readonly company: UserCompanyModel;
}

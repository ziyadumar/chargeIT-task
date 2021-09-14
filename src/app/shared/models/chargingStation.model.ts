export interface ChargingStation {
  address: Address;
  location: Location;
  connectors: Connector[];
  priceInfo: string;
  operatorName: string;
  available: boolean;
}

export interface Connector {
  number: string;
  type: string;
  maxPowerInKW: string;
}

export interface Address {
  street: string;
  zip: string;
  town: string;
  countryCode: string
}

export interface Location {
  lat: number;
  lon: number;
}

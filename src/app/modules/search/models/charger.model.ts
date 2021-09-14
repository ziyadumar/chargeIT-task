
export interface SearchParams {
  distance: number;
  chargerTypes: Charger[]
}

export interface Charger {
  id: number,
  name: string;
  isSelected: boolean;
}

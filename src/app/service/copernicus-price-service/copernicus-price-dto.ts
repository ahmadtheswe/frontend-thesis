export interface CopernicusPriceDto {
  id?: string;
  name?: string;
  price?: number;
  updatedAt?: string;
  isUpdating?: boolean;
}

export interface CopernicusPriceUpdateDto {
  id?: string;
  price?: number;
}

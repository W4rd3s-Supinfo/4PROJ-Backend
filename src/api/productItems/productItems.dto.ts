export interface CreateProductItemDto {
  destroy?: boolean,
  totalCarbon: number,
  expirationDate: Date,
  marketPrice: number,
  detailId: string
}

export interface PutProductItemDto {
  destroy: boolean,
  totalCarbon: number,
  expirationDate: Date,
  marketPrice: number,
  detailId: string
}

export interface PatchProductItemDto extends Partial<PutProductItemDto> {}

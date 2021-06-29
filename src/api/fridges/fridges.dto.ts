export interface CreateFridgeDto {
  name: string,
  ownedId: string,
  productList?: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PutFridgeDto {
  name: string,
  ownedId: string,
  productList: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PatchFridgeDto extends Partial<PutFridgeDto> {}

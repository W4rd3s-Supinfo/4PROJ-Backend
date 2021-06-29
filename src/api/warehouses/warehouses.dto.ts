export interface CreateWarehouseDto {
  name: string,
  ownedId: string,
  gpsCord: string,
  maxCapacity: number,
  productList?: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PutWarehouseDto {
  name: string,
  ownedId: string,
  gpsCord: string,
  maxCapacity: number,
  productList: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PatchWarehouseDto extends Partial<PutWarehouseDto> {}

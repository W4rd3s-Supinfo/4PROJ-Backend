export interface CreateOrderDto {
  clientId: string,
  supplier: string,
  transportTypeId: string,
  statusCode?: number,
  orderDetail?: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PutOrderDto {
  clientId: string,
  supplier: string,
  transportTypeId: string,
  statusCode: number,
  orderDetail: Array<{
    productId: string,
    quantity: number,
  }>
}

export interface PatchOrderDto extends Partial<PutOrderDto> {}

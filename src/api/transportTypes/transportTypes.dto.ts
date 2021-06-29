export interface CreateTransportTypeDto {
  name: string,
  carbon: number,
  price: number,
}

export interface PutTransportTypeDto {
  name: string,
  carbon: number,
  price: number,
}

export interface PatchTransportTypeDto extends Partial<PutTransportTypeDto> {}

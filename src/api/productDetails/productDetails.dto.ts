export interface CreateProductDetailDto {
  name: string,
  baseCarbon: number,
  producerId: string,
  producerPrice: number,
  composition?: string
}

export interface PutProductDetailDto {
  name: string,
  baseCarbon: number,
  producerId: string,
  producerPrice: number,
  composition: string
}

export interface PatchProductDetailDto extends Partial<PutProductDetailDto> {}

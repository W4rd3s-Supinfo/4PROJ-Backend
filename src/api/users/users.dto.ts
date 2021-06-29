export interface CreateUserDto {
  fullName?: string,
  email: string,
  password: string,
  phone?: string,
  address?: string,
  zipCode?: string,
  city?: string,
  permissionFlag: number,
}

export interface PutUserDto {
  fullName: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  zipCode: string,
  city: string,
  permissionFlag: number,
}

export interface PatchUserDto extends Partial<PutUserDto> {}

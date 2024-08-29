import { Expose } from 'class-transformer';
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  cpf: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

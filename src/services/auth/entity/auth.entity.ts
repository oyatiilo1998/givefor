//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class VerifyCodeEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

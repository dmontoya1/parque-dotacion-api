import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };

  constructor(success: boolean, message: string, data?: T, meta?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

export class PaginatedResponseDto<T> extends BaseResponseDto<T[]> {
  constructor(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success',
  ) {
    const totalPages = Math.ceil(total / limit);
    super(true, message, data, {
      total,
      page,
      limit,
      totalPages,
    });
  }
}
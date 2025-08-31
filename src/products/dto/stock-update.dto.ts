import { IsString, IsNumber, Min } from 'class-validator';

export class StockUpdateDto {
  @IsString()
  product_id: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}

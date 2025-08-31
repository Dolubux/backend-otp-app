import { IsString, IsOptional, IsBoolean, IsHexColor, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nom de la catégorie', example: 'Électronique' })
  @IsString()
  @MaxLength(100, { message: 'Le nom ne peut pas dépasser 100 caractères' })
  name: string;

  @ApiProperty({ description: 'Description de la catégorie', required: false, example: 'Produits électroniques et gadgets' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La description ne peut pas dépasser 500 caractères' })
  description?: string;

  @ApiProperty({ description: 'Couleur associée à la catégorie (format hex)', required: false, example: '#FF5733' })
  @IsOptional()
  @IsHexColor({ message: 'La couleur doit être au format hexadécimal (ex: #FF5733)' })
  color?: string;

  @ApiProperty({ description: 'Statut actif de la catégorie', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

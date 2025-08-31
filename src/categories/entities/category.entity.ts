import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ description: 'ID unique de la catégorie' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nom de la catégorie' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Description de la catégorie', required: false })
  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ApiProperty({ description: 'Couleur associée à la catégorie (hex)', required: false })
  @Column({ nullable: true, length: 7 })
  color?: string;

  @ApiProperty({ description: 'Statut de la catégorie' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @ApiProperty({ description: 'Date de suppression', required: false })
  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date | null;
}

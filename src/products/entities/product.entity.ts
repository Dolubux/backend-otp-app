import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Media } from '../../media/entities/media.entity';
import { OrderProduct } from '../../orders/entities/order-product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  // Relation avec Media (remplace le champ image)
  @OneToMany(() => Media, media => media.product, { cascade: true })
  medias: Media[];

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];

  @Column()
  category: string;

  @Column({ default: true })
  inStock: boolean;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  rating?: number;

  @Column({ nullable: true, default: 0 })
  stock?: number;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date | null;
}

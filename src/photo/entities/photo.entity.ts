import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  url: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  location: string;

  @ManyToOne(() => Category, category => category.photos)
  category: Category

  @ManyToMany(type => Tag, tag => tag.photos)
  @JoinTable({ name: 'photo_tag' })
  tags: Tag[];
}
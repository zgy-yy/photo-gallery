import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { PhotoMetadata } from './photoMeta.entity';

@Entity()
export class Photo {


  constructor(title?: string, url?: string) {
    if (title)
      this.title = title
    if (url)
      this.url = url
    this.createdAt = new Date()
  }


  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  url: string;

  @Column('int', { default: 0 })
  views: number;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Category, category => category.photos)
  category: Category

  @ManyToMany(type => Tag, tag => tag.photos)
  @JoinTable({ name: 'photo_tag' })
  tags: Tag[];

  @OneToOne(() => PhotoMetadata, (metaData) => metaData.photo)
  @JoinColumn({ name: 'metaId' })
  metaData: PhotoMetadata
}
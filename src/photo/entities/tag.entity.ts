import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Photo, (photo) => photo.tags)
  photos: Photo[];
}

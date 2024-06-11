import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column('int')
  resolution: number;

  @Column()
  shutterSpeed: string;//快门

  @Column()
  aperture: string;//光圈

  @Column('int')
  iso: number;

  @Column()
  shootingMode: string;

  @Column()
  gps: string;

  @Column()
  creativeAppearance: string;//创意外观

  @Column('timestamp')
  shootingTime: Date;

  @Column()
  focalLength: string;

  @OneToOne(() => Photo, photo => photo.metaData)
  photo: Photo;
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';

@Module({ imports:[TypeOrmModule.forFeature([Photo,Category,Tag])]})
export class PhotoModule {}

import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { PhotoMetadata } from './entities/photoMeta.entity';
import { Photo } from './entities/photo.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Photo,Category,Tag,PhotoMetadata])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}

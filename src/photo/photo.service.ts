import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {

  constructor(@InjectRepository(Photo) private readonly photoRepository: Repository<Photo>) { }

  create(photo: Photo) {

    return this.photoRepository.save(photo)
  }

  baseFind() {
    return this.photoRepository.createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metaData', 'meta')
      .leftJoinAndSelect('photo.category', 'category')
      .leftJoinAndSelect('photo.tags', 'tag')
  }

  async findAll() {
    const data = await this.photoRepository.createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metaData', 'meta')
      .getMany()
    return data
  }

  // 基础分页查询
  async findAllPage(limit: number, offset: number) {
    const data = await this.photoRepository.createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metaData', 'meta')
      .limit(limit)
      .offset(offset)
      .getMany()
    return data
  }
  // by Id查询
  async findOneById(id: number) {
    const data = this.baseFind().where('photo.id=:id', { id: id }).getOne()
    return data
  }
  // by 地点
  findByLocation(loca: string) {
    const data = this.baseFind().where('photo.location=:local', { local: loca }).getMany()
    return data
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}

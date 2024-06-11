import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { PhotoService } from './photo.service';

import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PhotoPageDto } from './dto/query-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse, join } from "path"
import { Photo } from './entities/photo.entity';
import { writeFile } from "fs/promises"
import ExifReader from "exifreader"

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImg(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'image/*' })//文件类型验证器
    ]
  })) file: Express.Multer.File) {
    console.log("🚀 ~ PhotoController ~ file:", file)
    const originalname = parse(file.originalname).name.replace(/\s/g, ''); //原始图片名
    const filename: string = Date.now() + originalname + parse(file.originalname).ext;//加时间戳的文件名

    const tags = ExifReader.load(file.buffer)
    console.log("🚀 ~ PhotoController ~ tags:", tags)


    console.log("🚀 ~ PhotoController ~ filename:", filename)
    await writeFile('./uploads/' + filename, file.buffer)
    const imageUrl: string = join(process.cwd(), 'uploads', filename);
    const photo = new Photo(originalname, imageUrl)
    this.photoService.create(photo);
    return tags
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get('page') //分页查询
  @UsePipes(new ValidationPipe({ transform: true }))
  getPhotoPage(@Query() query: PhotoPageDto) {
    console.log("🚀 ~ PhotoController ~ getPhotoPage ~ query:", typeof query.limit)
    let limit = query.limit
    let offset = query.page * limit
    return this.photoService.findAllPage(limit, offset)
  }

  @Get(':id')
  getPhotoById(@Param('id', ParseIntPipe) id: number) {
    return this.photoService.findOneById(id);
  }

  @Get('/location/:loca')
  getPhotoBylocaltion(@Param('loca') location: string) {
    console.log("🚀 ~ PhotoController ~ getPhotoBylocaltion ~ location:", location)
    return this.photoService.findByLocation(location)
  }

  // 更新
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}

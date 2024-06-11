import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/entities/photo.entity';
import { Category } from './photo/entities/category.entity';
import { Tag } from './photo/entities/tag.entity';
import { PhotoMetadata } from './photo/entities/photoMeta.entity';
import { Role } from './user/entities/role.entity';
import {ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration], // load方法
  }),
  TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'admin',
    database:'photo_gallery_db',
    synchronize:true,
    logging:['query','error'],
    entities:[User,Role,Photo,Category,Tag,PhotoMetadata]
  }), 
  ServeStaticModule.forRoot({
    rootPath:join(__dirname,'..','uploads')
  }),
  UserModule, PhotoModule, 
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SkinController} from "./skin.controller";
import {SkinService} from "./skin.service";


@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [SkinController],
    providers: [SkinService],
})
export class SkinModule {}

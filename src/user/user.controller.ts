import {Controller, Post, Body, Session, Get, Query} from '@nestjs/common';
import { UserService } from './user.service';
import {SkinDto} from "./dto/skin.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('update-skin')
    async updateSkin(@Body() skinDto: SkinDto): Promise<void> {
        const {
            steamid,
            weapon_defindex,
            weapon_paint_id,
            weapon_wear,
            weapon_seed,
            weapon_nametag,
            weapon_stattrak,
            weapon_stattrak_count,
            weapon_sticker_0,
            weapon_sticker_1,
            weapon_sticker_2,
            weapon_sticker_3,
            weapon_sticker_4,
            weapon_keychain,
        } = skinDto;

        // Вызовем метод сервиса для обновления или вставки скина
        await this.userService.updateOrInsertSkin(
            steamid,
            weapon_defindex,
            weapon_paint_id,
            weapon_wear,
            weapon_seed,
            weapon_nametag,
            weapon_stattrak,
            weapon_stattrak_count,
            weapon_sticker_0,
            weapon_sticker_1,
            weapon_sticker_2,
            weapon_sticker_3,
            weapon_sticker_4,
            weapon_keychain,
        );
    }

    @Get('get-skins')
    async getSkins(@Query() query) {
        const data = await this.userService.getSkin(query.steamid, query.weaponDefindex)

        return data
    }

    @Get('get-all-skins')
    async getAllSkins(@Query() query) {
        return await this.userService.getAllSkins()
    }

    @Get('get-skins-from-array')
    async getFromArray(@Query() query) {
        return await this.userService.getFromArray()
    }
}

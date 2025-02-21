import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {skinsFromJson} from "../utils/skins-from-json.util";
import {UserService} from "../user/user.service";
import {SkinService} from "./skin.service";
import {RequestUpdateSkinDto} from "./dto/update-skin.dto";


@Controller('skin')
export class SkinController {

    constructor(private readonly skinService: SkinService) {}

    @Get('/weapons/')
    getWeapons() {
        return this.skinService.getWeapons()
    }

    @Post('/weapons/')
    getDefIndexSkin(@Body() data: RequestUpdateSkinDto) {
        return this.skinService.updateWeapon(data)
    }

    @Get('/:defindex/:variant')
    getVariantSkin(@Param() params: { defindex: string, variant: string }) {

    }

}
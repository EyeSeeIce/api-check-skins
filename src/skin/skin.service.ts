import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import * as async_hooks from "node:async_hooks";
import {getWeaponsFromArray} from "../utils/skins-from-json.util";
import {RequestUpdateSkinDto} from "./dto/update-skin.dto";


@Injectable()
export class SkinService {
    constructor(private readonly dataSource: DataSource) {

    }


    async getWeapons() {
        return await getWeaponsFromArray()
    }

    async updateWeapon(data: RequestUpdateSkinDto) {
        const { steamid, weapon_defindex, weapon_paint_id, weapon_wear, weapon_nametag, weapon_seed, type, weapon_name } = data
        const skin = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('wp_player_skins', 's')
            .where('s.steamid = :steamid AND s.weapon_defindex = :weapon_defindex', { steamid, weapon_defindex })
            .getRawOne();

        const knife = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('wp_player_knife', 's')
            .where('s.steamid = :steamid', { steamid })
            .getRawOne();

        const glove = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('wp_player_gloves', 's')
            .where('s.steamid = :steamid', { steamid })
            .getRawOne();


        if (type === 'knife') {
            if (knife) {
                await this.dataSource
                    .createQueryBuilder()
                    .update('wp_player_knife')
                    .set({ knife: weapon_name })
                    .where('steamid = :steamid', { steamid })
                    .execute();
            } else {
                await this.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into('wp_player_knife')
                    .values({
                        steamid: steamid,
                        knife: weapon_name,
                        weapon_team: 2,
                    })
                    .execute()
            }
        }

        if (type === 'gloves') {

            if (glove) {
                await this.dataSource
                    .createQueryBuilder()
                    .update('wp_player_gloves')
                    .set({ weapon_defindex: weapon_defindex })
                    .where('steamid = :steamid', { steamid })
                    .execute();
            } else {
                await this.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into('wp_player_gloves')
                    .values({
                        steamid: steamid,
                        weapon_defindex,
                        weapon_team: 2,
                    })
                    .execute()
            }
        }


        if (skin) {
            await this.dataSource
                .createQueryBuilder()
                .update('wp_player_skins')
                .set({ weapon_seed, weapon_paint_id, weapon_wear, weapon_nametag })
                .where('steamid = :steamid AND weapon_defindex = :weapon_defindex', { steamid, weapon_defindex })
                .execute();
        } else {
            await this.dataSource
                .createQueryBuilder()
                .insert()
                .into('wp_player_skins')
                .values({
                    steamid,
                    weapon_defindex,
                    weapon_paint_id,
                    weapon_wear,
                    weapon_seed,
                    weapon_nametag,
                    weapon_stattrak: 0,
                    weapon_stattrak_count: 0,
                    weapon_sticker_0: '0;0;0;0;0;0;0',
                    weapon_sticker_1: '0;0;0;0;0;0;0',
                    weapon_sticker_2: '0;0;0;0;0;0;0',
                    weapon_sticker_3: '0;0;0;0;0;0;0',
                    weapon_sticker_4: '0;0;0;0;0;0;0',
                    weapon_keychain: '0;0;0;0;0',
                    weapon_team: 2,
                })
                .execute();
        }
    }

}
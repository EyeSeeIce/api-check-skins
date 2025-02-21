import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {getWeaponsFromArray, skinsFromJson} from "../utils/skins-from-json.util";

@Injectable()
export class UserService {
    constructor(private readonly dataSource: DataSource) {}

    async updateOrInsertSkin(
        steamid: string,
        weapon_defindex: number,
        weapon_paint_id: number,
        weapon_wear: number,
        weapon_seed: number,
        weapon_nametag: string | null,
        weapon_stattrak: number,
        weapon_stattrak_count: number,
        weapon_sticker_0: string,
        weapon_sticker_1: string,
        weapon_sticker_2: string,
        weapon_sticker_3: string,
        weapon_sticker_4: string,
        weapon_keychain: string,
    ): Promise<void> {

        const skin = await this.dataSource
            .createQueryBuilder()
            .select('*')
            .from('wp_player_skins', 's')
            .where('s.steamid = :steamid AND s.weapon_defindex = :weapon_defindex', { steamid, weapon_defindex })
            .getRawOne();

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
                    weapon_stattrak,
                    weapon_stattrak_count,
                    weapon_sticker_0,
                    weapon_sticker_1,
                    weapon_sticker_2,
                    weapon_sticker_3,
                    weapon_sticker_4,
                    weapon_keychain,
                    weapon_team: 2,
                })
                .execute();
        }

        /*if (skin) {
            skin.weapon_seed = weapon_seed
            skin.weapon_paint_id = weapon_paint_id
            skin.weapon_wear = weapon_wear
            skin.weapon_nametag = weapon_nametag
            await this.skinRepository.save(skin)
        } else {
            await this.skinRepository.insert({
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
                weapon_team: 3, // Пример, можно заменить на переменную
            });
        }*/
    }

    async getSkin(steamid: string, weaponDefindex: number): Promise<any> {
       /* return await this.skinRepository.find({
            where: {
                steamid
            }
        })*/
    }

    async getAllSkins() {
        return await skinsFromJson()
    }

    async getFromArray() {
        return await getWeaponsFromArray()
    }

}

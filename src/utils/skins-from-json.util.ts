import * as path from "node:path";
import * as fs from "node:fs";

const SKINS_LANG = 'skins_en'
const GLOVES_LANG = 'gloves_en'

const pistolsKey = [1, 2, 3, 4, 30, 36, 61, 63, 64, 32]
const riflesKey = [7, 8, 13, 39, 60, 16]
const snipersKey = [9, 11, 38, 40]
const smgKey = [17, 19, 23, 24, 26, 33, 34]
const heavyKey = [14, 25, 27, 28, 29, 35]
const knifes = [500, 503, 505, 506, 507, 508, 509, 512, 514, 515, 516, 517, 519, 520, 521, 522, 523, 525, 526]

const matchGloveIdToName = {
    4725: 'Broken Fang Gloves',
    5027: 'Bloodhound Gloves',
    5030: 'Sport Gloves',
    5031: 'Driver Gloves',
    5032: 'Hand Wraps',
    5033: 'Moto Gloves',
    5034: 'Specialist Gloves',
    5035: 'Hydra Gloves',
}

const loadSKins = () => {
    const skinFilePath = path.join(__dirname, `../../data/${SKINS_LANG}.json`);
    const gloveFilePath = path.join(__dirname, `../../data/${GLOVES_LANG}.json`);
    const skinRawData = fs.readFileSync(skinFilePath, 'utf-8');
    const gloveRawData = fs.readFileSync(gloveFilePath, 'utf-8');
    return {
        skins: JSON.parse(skinRawData),
        gloves: JSON.parse(gloveRawData),
    }
}

export const skinsFromJson = async () => {
    const skins = {};
    const json = loadSKins();

    json.skins.forEach((skin) => {
        const weaponDefindex = parseInt(skin.weapon_defindex, 10);
        const paintId = parseInt(skin.paint, 10);

        if (!skins[weaponDefindex]) {
            skins[weaponDefindex] = {};
        }

        skins[weaponDefindex][paintId] = {
            weapon_name: skin.weapon_name,
            paint_name: skin.paint_name,
            image_url: skin.image,
        };
    });

    return skins;
}

export const glvoesFromJson = async () => {
    const skins = {}
    const json = loadSKins()



    json.gloves.forEach((skin) => {
        const weaponDefindex = parseInt(skin.weapon_defindex, 10)
        const paintId = parseInt(skin.paint, 10);

        if (weaponDefindex !== 0) {
            if (!skins[weaponDefindex]) {
                skins[weaponDefindex] = {};
            }


            skins[weaponDefindex][paintId] = {
                paint_name: skin.paint_name,
                paint: skin.paint,
                image_url: skin.image,
            };
        }
    })

    return skins

}

export const getWeaponsFromArray = async (): Promise<Record<number, {
    weapon_name: string,
    paint_name: string,
    image_url: string
}>> => {
    const weapons = {};
    const skins = await skinsFromJson();
    const gloves = await glvoesFromJson()

    const object = {
        gloves: [],
        knifes: [],
        rifles: [],
        pistols: [],
        snipers: [],
        smg: [],
        heavy: []
    }


    for (const [key, value] of Object.entries(gloves)) {

        object.gloves.push({
            skin_key: key,
            paint: value[0]?.paint,
            paint_name: matchGloveIdToName[key],
            image_url: value[0]?.image,
            variants: gloves[key]
        })
    }

    for (const [key, value] of Object.entries(skins)) {
        if (pistolsKey.includes(+key)) {
            object.pistols.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }
        if (riflesKey.includes(+key)) {
            object.rifles.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }
        if (snipersKey.includes(+key)) {
            object.snipers.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }
        if (smgKey.includes(+key)) {
            object.smg.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }
        if (heavyKey.includes(+key)) {
            object.heavy.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }

        if (knifes.includes(+key)) {
            object.knifes.push({
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            })
        }
        if (!weapons[key]) {

            weapons[key] = {
                skin_key: key,
                weapon_name: value[0].weapon_name,
                paint_name: value[0].paint_name,
                image_url: value[0].image_url,
                variants: skins[key]
            };
        }

    }

    return object;
}

export const getSelectedSkins = (selectedWeapons: any[]): Record<number, {
    weapon_paint_id: number,
    weapon_seed: number,
    weapon_wear: number
}> => {
    const selected = {};

    selectedWeapons.forEach((weapon) => {
        selected[weapon.weapon_defindex] = {
            weapon_paint_id: weapon.weapon_paint_id,
            weapon_seed: weapon.weapon_seed,
            weapon_wear: weapon.weapon_wear,
        };
    });

    return selected;
}
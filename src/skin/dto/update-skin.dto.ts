export type RequestUpdateSkinDto = {
    type: 'weapon' | 'gloves' | 'knife',
    weapon_name: string,
    steamid: number,
    weapon_defindex: number,
    weapon_paint_id: number,
    weapon_wear: number,
    weapon_seed: number,
    weapon_nametag: string,

}
import { IsString, IsInt, IsOptional, IsNumber, Max, Min } from 'class-validator';

export class SkinDto {
  @IsString()
  steamid: string;

  @IsInt()
  weapon_defindex: number;

  @IsInt()
  weapon_paint_id: number;

  @IsNumber()
  @Min(0.0)
  @Max(1.0)
  weapon_wear: number;

  @IsInt()
  weapon_seed: number;

  @IsOptional()
  @IsString()
  weapon_nametag: string | null;

  @IsInt()
  weapon_stattrak: number;

  @IsInt()
  weapon_stattrak_count: number;

  @IsString()
  weapon_sticker_0: string;

  @IsString()
  weapon_sticker_1: string;

  @IsString()
  weapon_sticker_2: string;

  @IsString()
  weapon_sticker_3: string;

  @IsString()
  weapon_sticker_4: string;

  @IsString()
  weapon_keychain: string;
}
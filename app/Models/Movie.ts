import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  beforeSave,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: String;

  @column()
  public description: String;

  @column()
  public short_description: String;

  @column()
  public director: String;

  @column()
  public year: Number;

  @column()
  public image: String;

  @column()
  public slug: String;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static createSlug(Movie: Movie) {
    Movie.slug =
      Movie.slug.trim().toLowerCase().replace(" ", "-") + "-" + Movie.id;
  }
}

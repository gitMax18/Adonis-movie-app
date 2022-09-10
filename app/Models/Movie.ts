import { DateTime } from "luxon";
import { BaseModel, column, beforeSave } from "@ioc:Adonis/Lucid/Orm";

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public short_description: string;

  @column()
  public director: string;

  @column()
  public year: number;

  @column()
  public image: string;

  @column()
  public slug: string;

  // @hasOne(() => User)
  @column()
  public user: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static createSlug(Movie: Movie) {
    // Movie.slug = Movie.slug.toLowerCase().replace(" ", "-") + "-" + Movie.id;
    Movie.slug = Movie.slug;
  }
}

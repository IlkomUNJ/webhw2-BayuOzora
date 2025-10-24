import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Wishlist from './Wishlist'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sellerId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'sellerId',
  })
  public seller: BelongsTo<typeof User>

  @hasMany(() => Wishlist, {
    foreignKey: 'productId',
  })
  public wishlists: HasMany<typeof Wishlist>
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import OrderItem from './OrderItem'
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public price!: number

  @column()
  public quantity!: number

  @hasMany(() => OrderItem)
  public orderItems!: HasMany<typeof OrderItem>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}

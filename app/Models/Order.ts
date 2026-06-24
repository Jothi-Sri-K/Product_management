import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

import OrderItem from './OrderItem'

import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public customerId!: number

  @column()
  public status!: string

  @column()
  public totalAmount!: number

  @belongsTo(() => Customer)
  public customer!: BelongsTo<typeof Customer>

  @hasMany(() => OrderItem)
  public orderItems!: HasMany<typeof OrderItem>

  @column.dateTime({
    autoCreate: true,
  })
  public createdAt!: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt!: DateTime
}

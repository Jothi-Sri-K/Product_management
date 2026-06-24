import { DateTime } from 'luxon'

import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Order from './Order'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public email!: string

  @column()
  public phone!: string

  @column.dateTime({
    autoCreate: true,
  })
  public createdAt!: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt!: DateTime

  @hasMany(() => Order)
  public orders!: HasMany<typeof Order>
}

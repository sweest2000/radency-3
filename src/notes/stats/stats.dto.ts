import { Model, Column, Table } from 'sequelize-typescript';

@Table({ tableName: 'stats', timestamps: false })
export class Stats extends Model {
  @Column
  icon: string;

  @Column({
    primaryKey: true
  })
  name: string;

  @Column
  active: string;

  @Column
  archived: string;
}

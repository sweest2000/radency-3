import { Model, Column, Table } from 'sequelize-typescript';

@Table({ tableName: 'notes', timestamps: false })
export class Notes extends Model {
  @Column({
    primaryKey: true
  })
  id: string;

  @Column
  icon: string;

  @Column
  name: string;

  @Column
  created: string;

  @Column
  category: string;

  @Column
  content: string;

  @Column
  dates: string;
}

// database/sequelize.module.ts
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import sequelizeConfig from '../../sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig)],
  exports: [SequelizeModule]
})
export class SequelizeDbModule {}

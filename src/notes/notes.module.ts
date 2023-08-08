import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Notes } from './notes.dto';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stats } from './stats/stats.dto';

@Module({
  imports: [SequelizeModule.forFeature([Notes, Stats])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}

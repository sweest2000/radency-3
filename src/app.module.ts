import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeDbModule } from './database/sequelize.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [SequelizeDbModule, NotesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

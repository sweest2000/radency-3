import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesDto } from './notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAll() {
    return this.notesService.getAll();
  }

  @Get('stats')
  async getStats() {
    return this.notesService.getStats();
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return this.notesService.getNote(id);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  async addNote(@Body() dto: NotesDto) {
    return this.notesService.addNote(dto);
  }

  @Patch(':id')
  async changeNote(@Param('id') id: string, @Body() dto: NotesDto) {
    return this.notesService.changeNote(id, dto);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}

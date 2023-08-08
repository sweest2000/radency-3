import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import * as crypto from 'crypto';

import { InjectModel } from '@nestjs/sequelize';
import { Notes } from './notes.dto';
import { Stats } from './stats/stats.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes)
    private noteModel: typeof Notes,

    @InjectModel(Stats)
    private statsModel: typeof Stats
  ) {}

  async getAll(): Promise<Notes[]> {
    const notes = await this.noteModel.findAll();
    return notes.map((note) => ({
      id: note.id,
      icon: note.icon,
      name: note.name,
      created: note.created,
      category: note.category,
      content: note.content,
      dates: note.dates
    })) as Notes[];
  }

  async getStats(): Promise<Stats[]> {
    const stats = await this.statsModel.findAll();
    return stats.map((stat) => ({
      icon: stat.icon,
      name: stat.name,
      active: stat.active,
      archived: stat.archived
    })) as Stats[];
  }

  async getNote(id: string): Promise<Notes> {
    const note = await this.noteModel.findByPk(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    return note;
  }

  async deleteNote(id: string): Promise<Notes> {
    const deletedNote = await this.noteModel.findByPk(id);

    if (!deletedNote) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }
    await this.noteModel.destroy({
      where: { id }
    });
    return deletedNote;
  }

  async addNote(noteData: Partial<Notes>): Promise<Notes> {
    try {
      const columns = await this.noteModel.describe();
      const allowedFields = Object.keys(columns);

      const unknownColumns = Object.keys(noteData).filter(
        (key) => !allowedFields.includes(key)
      );

      if (unknownColumns.length > 0) {
        throw new BadRequestException(
          `Unknown columns: ${unknownColumns.join(', ')}`
        );
      }

      const newNote = await this.noteModel.create({
        id: crypto.randomUUID(),
        ...noteData
      });
      return newNote;
    } catch (e) {
      throw new BadRequestException('Null value in request');
    }
  }

  async changeNote(id: string, noteData: Partial<Notes>): Promise<Notes> {
    const note = await this.noteModel.findByPk(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }

    const columns = await this.noteModel.describe();
    const allowedFields = Object.keys(columns);

    const unknownColumns = Object.keys(noteData).filter(
      (key) => !allowedFields.includes(key)
    );

    if (unknownColumns.length > 0) {
      throw new BadRequestException(
        `Unknown columns: ${unknownColumns.join(', ')}`
      );
    }

    const updatedNote = await note.update(noteData);

    return updatedNote;
  }
}

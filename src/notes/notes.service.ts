import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { validate } from 'class-validator';
import * as crypto from 'crypto';
import { NotesDto } from './notes.dto';
import { Client } from 'pg';

@Injectable()
export class NotesService {
  notes: NotesDto[];
  stats: any[];

  constructor() {
    this.notes = [
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/cart-fill.svg',
        name: 'Shopping list',
        created: 'April 20, 2021',
        category: 'Task',
        content: 'Tomatoes, bread',
        dates: '-'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/brain-fill.svg',
        name: 'The theory of evolution',
        created: 'April 27, 2021',
        category: 'Random Thought',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        dates: '-'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/lightbulb-fill.svg',
        name: 'New Feature',
        created: 'May 05, 2021',
        category: 'Idea',
        content: 'Implement new things on 3/5/2021 and 5/5/2021',
        dates: '3/5/2021, 5/5/2021'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/cart-fill.svg',
        name: 'Books',
        created: 'May 15, 2021',
        category: 'Task',
        content: 'The Lean Startup',
        dates: '-'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/brain-fill.svg',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        created: 'April 27, 2021',
        category: 'Random Thought',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        dates: '-'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/lightbulb-fill.svg',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        created: 'April 27, 2021',
        category: 'Idea',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        dates: '-'
      },
      {
        id: crypto.randomUUID(),
        icon: 'src/assets/brain-fill.svg',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        created: 'April 27, 2021',
        category: 'Random Thought',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies.',
        dates: '-'
      }
    ];
    this.stats = [
      {
        icon: 'src/assets/cart-fill.svg',
        name: 'Task',
        active: '2',
        archived: '0'
      },
      {
        icon: 'src/assets/lightbulb-fill.svg',
        name: 'Idea',
        active: '2',
        archived: '0'
      },
      {
        icon: 'src/assets/brain-fill.svg',
        name: 'Random Thought',
        active: '3',
        archived: '0'
      }
    ];
  }

  async getAll() {
    // return this.notes;
    const connectionString = 'postgres://admin:admin@postgres:5432/notes_db';
    const client = new Client({ connectionString });
    try {
      await client.connect();
      const result = await client.query(`SELECT notes FROM public.notes`);

      if (result.rowCount === 0) {
        return 'No data found in the notes table.';
      } else {
        const notes = result.rows.map((item) => item);
        return notes;
      }
    } catch (err) {
      console.error('Error querying the database:', err);
      throw err;
    } finally {
      await client.end();
    }
  }

  async getNote(id: string) {
    const note = this.notes.find((item) => item.id === id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async getStats() {
    return this.stats;
  }

  async deleteNote(id: string) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new NotFoundException('Note not found');
    }
    this.notes.splice(index, 1);
    return { message: 'Note deleted' };
  }

  async addNote(dto: NotesDto) {
    const newNote: NotesDto = {
      id: crypto.randomUUID(),
      ...dto
    };

    const errors = await validate(newNote);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.notes.push(newNote);
    return newNote;
  }

  async changeNote(id: string, dto: NotesDto) {
    const note = this.notes.find((item) => item.id === id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found.`);
    }

    const allowedFields = Object.keys(note);
    const invalidFields = Object.keys(dto).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        `Invalid fields: ${invalidFields.join(', ')}`
      );
    }

    Object.assign(note, dto);

    const errors = await validate(note);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return note;
  }
}

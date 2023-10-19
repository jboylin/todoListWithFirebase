import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  constructor(private service: NotesService) {}

  notes: any = [];

  filteredNotes: any = [];

  refreshNotes(sort?: boolean) {
    this.service.getNotes().subscribe((res: any) => {
      let response = res;
      let sortedResponse;
      if (!sort) {
        sortedResponse = response.sort((a: any, b: any) => a.isDone - b.isDone);
      } else {
        sortedResponse = response.sort((a: any, b: any) => b.isDone - a.isDone);
      }
      this.notes = sortedResponse;
      this.filteredNotes = sortedResponse;
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addNotes(newNote: HTMLInputElement) {
    if (newNote.value) {
      this.service.addNote(newNote.value).then((res) => {
        newNote.value = '';
        this.refreshNotes();
      });
    }
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id).then((res) => {
      this.refreshNotes();
    });
  }

  completeAllTasks(notes: Note[]) {
    notes.forEach((note: Note) => {
      const updatedNote = {
        id: note.id,
        title: note.title,
        isDone: true,
      };

      this.service.updateNote(updatedNote);
    });
    alert('Well done! You completed all of your tasks!');
  }

  deleteAllCompletedTasks(notes: Note[]) {
    notes.forEach((note: Note) => {
      if (note.isDone) {
        this.service.deleteNote(note.id);
      }
    });
  }

  updateNote(note: Note) {
    this.service.updateNote(note).then(() => {
      if (note.isDone) {
        alert(`Well done you completed your task!`);
      }
    });
  }

  searchResults(text: string) {
    if (!text) {
      this.filteredNotes = this.notes;
    }

    this.filteredNotes = this.notes.filter((note: Note) =>
      note?.title.toLowerCase().includes(text.toLowerCase())
    );
  }

  filterNotes(filter: string) {
    if (filter == 'all') {
      return (this.filteredNotes = this.notes);
    } else if (filter == 'checked') {
      this.filteredNotes = this.notes.filter((note: Note) => {
        return note.isDone;
      });
    } else if (filter == 'unchecked') {
      this.filteredNotes = this.notes.filter((note: Note) => {
        return !note.isDone;
      });
    }
  }
}

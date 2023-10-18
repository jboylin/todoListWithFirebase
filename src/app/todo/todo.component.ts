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

  refreshNotes() {
    this.service.getNotes().subscribe((res) => {
      let response = res;
      const sortedResponse = response.sort(
        (a: any, b: any) => a.isDone - b.isDone
      );
      this.notes = sortedResponse;
      this.filteredNotes = sortedResponse;
      console.log(res);
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
      console.log(res);
      this.refreshNotes();
    });
  }

  completeAllTasks(notes: Note[]) {
    notes.forEach((note: Note) => {
      const updatedNote = {
        id: note.id,
        title: note.title,
        isDone: true,
        description: note.description ?? '',
      };

      this.service.updateNote(updatedNote);
    });
    alert('Well done! You completed all of your tasks!');
  }

  updateNote(note: Note) {
    this.service.updateNote(note).then(() => {
      if (note.isDone) {
        alert('Well done!');
      }
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredNotes = this.notes;
    }

    this.filteredNotes = this.notes.filter((note: Note) =>
      note?.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}

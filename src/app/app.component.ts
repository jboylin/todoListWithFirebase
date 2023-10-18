import { Component } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TodoListWithAngularAndFirestore';

  constructor(private service: NotesService) {}

  notes: Note[] = [];

  refreshNotes() {
    this.service.getNotes().subscribe((res: any) => {
      const response = res as Note[];

      this.notes = response.sort((a: any, b: any) => a.isDone - b.isDone);
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addNotes(newNote: string) {
    this.service.addNote(newNote).then((res) => {
      console.log(res);
      this.refreshNotes();
    });
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id).then((res) => {
      console.log(res);
      this.refreshNotes();
    });
  }
}

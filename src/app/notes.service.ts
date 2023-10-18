import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private fs: Firestore) {}

  getNotes() {
    let notes = collection(this.fs, 'notes');
    return collectionData(notes, { idField: 'id' });
  }

  addNote(note: string) {
    let data = { title: note, isDone: false };
    let notes = collection(this.fs, 'notes');
    return addDoc(notes, data);
  }

  deleteNote(id: string) {
    let docRef = doc(this.fs, 'notes/' + id);
    return deleteDoc(docRef);
  }

  updateNote(note: Note) {
    let docRef = doc(this.fs, 'notes/' + note.id);
    return updateDoc(docRef, { title: note.title, isDone: note.isDone });
  }
}

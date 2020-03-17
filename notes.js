#!/usr/bin/env node

'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const notes = require('./models/notes/notes-collection.js');

function dbConnect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(process.env.MONGODB_URI, options);
}

function processNote() {

  const command = process.argv[2];
  const payload = process.argv.slice(3).join(' ');

  switch (command) {
    case 'add':
      addNote(payload);
      break;
    case 'list':
      listNotes();
      break;
    case 'delete':
      deleteNote(payload);
      break;
    default:
      help();
      break;
  }

}

async function listNotes() {
  let list = await notes.get();
  list.forEach(note => {
    console.log(note.id + '\t' + note.note);
  });
  quit();
}

async function addNote(text) {
  let note = { note: text };
  let createdNote = await notes.create(note);
  console.log(`Note ${createdNote.id} added`);
  quit();
}

async function deleteNote(id) {
  let deletedNote = await notes.delete(id)
  console.log(`Note deleted`);
  quit();
}

function help() {
  console.log('You need some help?')
}

function quit() {
  process.exit();
}

dbConnect();
processNote();
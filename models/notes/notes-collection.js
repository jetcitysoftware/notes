'use strict';

const Collection = require('../collection.js');
const schema = require('./notes-schema.js');

class NotesCollection extends Collection { }

module.exports = new NotesCollection(schema);

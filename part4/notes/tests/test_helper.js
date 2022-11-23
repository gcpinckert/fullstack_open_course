const Note = require('../models/note');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    date: new Date(),
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' , date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
}

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
}

const initializeUsersDb = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  initializeUsersDb,
}
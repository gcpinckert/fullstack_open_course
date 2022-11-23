const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const User = require('../models/user');

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map(note => new Note(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned note', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(r => r.content);
    expect(contents).toContain('Browser can execute only JavaScript');
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('fails with status 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();
    console.log(validNonexistingId);

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404);
  });

  test('fails with status 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });
});

describe('addition of a new note', () => {
  let token;

  beforeEach(async () => {
    await helper.initializeUsersDb();

    const user = { username: 'root', password: 'sekret'}

    const response = await api
      .post('/api/login')
      .send(user)
    
    token = response.body.token;
  })

  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(n => n.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('fails with status 400 if invalid data', async () => {
    const newNote = { important: true };

    await api
      .post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
    
    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });

  test('fails with status 401 if invalid token', async () => {
    const newNote = {
      content: 'This should fail',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(401);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);
    
    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map(n => n.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await helper.initializeUsersDb();
  });

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    
    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
// Set up environment variables for testing BEFORE importing other modules
process.env.JWT_SECRET = 'testsecret';
process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import Task from '../src/models/taskModel.js';
import User from '../src/models/userModel.js';

let mongoServer;
let token;
let userId;

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ UserId: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await User.deleteMany();
  await Task.deleteMany();
  
  const user = await User.create({ email: 'taskuser@example.com', password: 'pass123' });
  userId = user._id;
  token = generateToken(user._id);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Task API', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test description',
        status: 'pending'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.task.title).toBe('Test Task');
  });
  
  it('should reject duplicate task title for same user', async () => {
    await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Duplicate Task',
        description: 'Original',
        status: 'pending'
      });
    
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Duplicate Task',
        description: 'Second attempt',
        status: 'pending'
      });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Task with this title already exists');
  });
  
  it('should not create task without title/status/description', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Title, description, and status are required');
  });
});
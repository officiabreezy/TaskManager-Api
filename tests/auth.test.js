// Set up environment variables for testing
process.env.JWT_SECRET = 'testsecret';
process.env.NODE_ENV = 'test';

// import mongoose from 'mongoose';
import request from 'supertest';
// import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import User from '../src/models/userModel.js';

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// afterEach(async () => {
//   await User.deleteMany();
// });

beforeEach(async () => {
  await User.deleteMany();
});


describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/v1/user/register').send({
      email: 'test@example.com',
      password: 'test123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not register duplicate user', async () => {
    await User.create({ email: 'test@example.com', password: 'test123' });

    const res = await request(app).post('/api/v1/user/register').send({
      email: 'test@example.com',
      password: 'test123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should log in successfully and return a token', async () => {
    await request(app).post('/api/v1/user/register').send({
      email: 'test@example.com',
      password: 'test123',
    });

    const res = await request(app).post('/api/v1/user/login').send({
      email: 'test@example.com',
      password: 'test123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with incorrect password', async () => {
    await User.create({ email: 'test@example.com', password: 'test123' });

    const res = await request(app).post('/api/v1/user/login').send({
      email: 'test@example.com',
      password: 'wrongpass',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid password');
  });
});
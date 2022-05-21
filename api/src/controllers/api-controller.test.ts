import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import createServer from '../app';
import { MentorModel } from '../Models/User';

const test_db = 'mongodb://localhost/vita-test';

const { app } = createServer();

describe('Mentor Routes', () => {
  before(async () => {
    // Cancel any existing connections
    mongoose.connection.close();

    // Connect to test database
    await mongoose.connect(test_db);

    // Clear test database
    await MentorModel.deleteMany({});

    // Insert a mentor
    await MentorModel.create({
      first_name: 'Test',
      last_name: 'Mentor',
      job_title: 'Test Mentor',
      expertise: 'Test Expertise',
      company: 'Test Company',
      description: 'Test Description',
    });
  });

  it('GET /get-mentors', async () => {
    const response = await request(app).get('/api/get-mentors');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
  });

  after(async () => {
    // Clear test database
    await MentorModel.deleteMany({});

    // Close connection
    await mongoose.connection.close();
  });
});

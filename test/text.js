process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Texts', () => {
  describe('/GET text', () => {
    it('it should return all texts', async () => {
      const response = await chai.request(app).get('/data');

      response.should.have.status(200);
      response.body.should.be.a('array');
    })
  })

  describe('/POST text', () => {
    it('it should create a new text', async () => {      
      const data = { text: 'Post test data' };
      const response = await chai.request(app).post('/data').query(data);

      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('message').eql('Added');
    })

    it('it should not create a new text without required field', async () => {      
      const data = {};
      const response = await chai.request(app).post('/data').query(data);

      response.should.have.status(400);
      response.body.should.be.a('object');
      response.body.should.have.property('error').eql('Data is empty');
    })
  })

  describe('/PUT text', () => {
    it('it should update an exist text', async () => {
      const data = { text: 'Put test data' };
      const postResp = await chai.request(app).post('/data').query(data);
      const putResp = await chai.request(app).put('/data').query({ id: postResp.body.text._id.toString(), text: 'Updated text' })

      putResp.should.have.status(201);
      putResp.body.should.be.a('object');
      putResp.body.should.have.property('message').eql('Updated');
    })

    it('it should not update an exist text without required field', async () => {
      const response = await chai.request(app).put('/data').query({ text: 'Updated text' })

      response.should.have.status(400);
      response.body.should.be.a('object');
      response.body.should.have.property('error').eql('Can\'t update without id');
    })
  })

  describe('/DELETE text', () => {
    it('it should delete an exist text', async () => {
      const data = { text: 'Delete test data' };
      const postResp = await chai.request(app).post('/data').query(data);
      const deleteResp = await chai.request(app).delete('/data').query({ id: postResp.body.text._id.toString() });

      deleteResp.should.have.status(201);
      deleteResp.body.should.be.a('object');
      deleteResp.body.should.have.property('message').eql('Removed');
    })

    it('it should not delete an exist text without required field', async () => {
      const response = await chai.request(app).delete('/data').query({});

      response.should.have.status(400);
      response.body.should.be.a('object');
      response.body.should.have.property('error').eql('Can\'t delete without id');
    })
  })

  after(done => {
    mongoose.connection.db.dropDatabase(_ => {
      done();
    });    
  })
});
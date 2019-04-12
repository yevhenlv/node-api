process.env.NODE_ENV = 'test';

const Text = require('../models/text');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Texts', () => {
  describe('/GET text', () => {
    it('it should GET all texts', async () => {
      const response = await chai.request(app).get('/data');

      response.should.have.status(200);
      response.body.should.be.a('array');
    })
  })

  describe('/POST text', () => {
    it('it should POST a new text', async () => {      
      const data = { text: 'First test text' };
      const response = await chai.request(app).post('/data').query(data);

      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('message').eql('Added');
    })

    it('it should not POST a new text', async () => {      
      const data = {};
      const response = await chai.request(app).post('/data').query(data);

      response.should.have.status(400);
      response.body.should.be.a('object');
      response.body.should.have.property('error').eql('Data is empty');
    })
  })

  describe('/PUT text', () => {
    it('it should UPDATE an exist text', async () => {
      const text = new Text({ text: 'Text for update' });

      await text.save(async (err, text) => {
        const response = await chai.request(app).put('/data').query({ id: text._id.toString(), text: 'Updated text' })

        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Updated');
      })
    })

    it('it should not UPDATE an exist text', () => {
      const text = new Text({ text: 'Text for update' });

      text.save(async () => {
        const response = await chai.request(app).put('/data').query({ text: 'Updated text' })

        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('error').eql('Can\'t update without id');
      })
    })
  })

  describe('/DELETE text', () => {
    it('it should DELETE an exist text', () => {
      const text = new Text({ text: 'Text for delete' });

      text.save(async (err, text) => {
        const response = await chai.request(app).delete('/data').query({ id: text._id.toString() });

        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Removed');
      })
    })

    it('it should not DELETE an exist text', () => {
      const text = new Text({ text: 'Text for delete' });

      text.save(async () => {
        const response = await chai.request(app).delete('/data').query({});

        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('error').eql('Can\'t delete without id');
      })
    })
  })

  after(done => {
    mongoose.connection.db.dropDatabase(_ => {
      done();
    });    
  })
});
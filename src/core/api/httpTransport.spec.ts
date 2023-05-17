/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import { HTTPTransport } from './httpTransport';
import app from "../../../test/server";

const baseUrl = 'http://localhost:5000';
let server: any;

describe('HTTP module ', () => {
  before(() => {
    server = app.listen(5000, () => {
      console.log('JSON Server is running on port 5000');
    });
  });

  after(() => {
    server.close();
  });

  /*it('do HTTP GET requests', async () => {
    const http = new HTTPTransport();

    const response = await http.get(`${baseUrl}/api/test`);
    expect(response).equal('Ok');
  });

  it('do HTTP POST requests', async () => {
    const http = new HTTPTransport();
    const text = 'test message text';
    const response = await http.post(`${baseUrl}/messages`, {
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    expect(JSON.parse(response)).to.have.property('text').and.equal(text);
  });*/
});

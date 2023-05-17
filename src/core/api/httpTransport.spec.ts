import { expect } from 'chai';
import { HTTPTransport } from './httpTransport';
import { API_TEST_PATH } from '@utils/constants';
import app from '../../../test/server';

const BASE_URL = 'http://localhost:5000';
let server: any;

describe('HTTP module ', () => {

  before((done) => {
    server = app.listen(5000, done);
  });

  after(() => {
    server.close();
  });

  it('GET request', async function () {
    const http = new HTTPTransport();
    const response = await http.get(`${API_TEST_PATH}/api/test`);
    const result = response.response;
    const status = result.status;
    expect(status).equal("OK")
  });

  it('POST request', async () => {
    const text = 'test message';
    const http = new HTTPTransport();
    const response = await http.post(`${API_TEST_PATH}/messages`, {
      data: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
    const result = response.response;
    expect(result).to.have.property('text').and.equal(text);
  });

});

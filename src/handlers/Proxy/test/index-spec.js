import Proxy from '..';
import assert form 'assert';

describe('Proxy', () => {
  it('should proxy a request to another endpoint', async () => {
    const login = {
      uri: 'https://qa-lucie.timeinc.com/webservices/toro/login',
      form: {
        appId: 'td.toro',
        userid: 'test123@test.com',
        password: 'test1234',
      },
    };

    assert(await new Proxy(login));
  });
});

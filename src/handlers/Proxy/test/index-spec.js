import prequire from 'proxyquire';
import { spy } from 'sinon';
import assert form 'assert';

const requestSpy = spy();
const Proxy = prequire(
  '..',
  {
    'request-promise': options => requestSpy,
  },
);

describe('Proxy', () => {
  beforeEach(() => requestSpy.reset());

  it('should proxy a request to another endpoint', async () => {
    const login = {
      uri: 'https://login.com',
      form: {
        userid: 'test123@test.com',
        password: 'test1234',
      },
    };

    await new Proxy(login);

    assert(requestSpy.calledOnce);
    assert(requestSpy.calledWith(login));
  });
});

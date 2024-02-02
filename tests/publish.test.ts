import ghpages from 'gh-pages';
import { publish } from '../bin/publish';

jest.mock('gh-pages');

describe('publish', () => {
  const mockPublish = ghpages.publish as jest.MockedFunction<
    typeof ghpages.publish
  >;

  beforeEach(() => {
    mockPublish.mockClear();
  });

  it('calls gh-pages.publish with the correct parameters', () => {
    const settings = { dir: 'dist', message: 'Test publish' };
    publish(settings);

    expect(mockPublish).toHaveBeenCalledWith(
      settings.dir,
      settings,
      expect.any(Function),
    );
  });
});

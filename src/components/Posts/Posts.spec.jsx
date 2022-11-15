import { Posts } from '.';

const { render } = require("@testing-library/react");

describe('<Posts />', () => {
  it('should render Posts', () => {
  const { debug } = render (<Posts />)
  debug();
    // expect(screen.getByRole('heading', { name: /posts/i })).toBeInTheDocument()

    
  });
});
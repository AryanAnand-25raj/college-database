import { render, screen } from '@testing-library/react';
import App from './App';

test('renders college database heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /college database/i });
  expect(heading).toBeInTheDocument();
});

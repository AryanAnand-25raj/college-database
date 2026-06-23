import { render, screen } from '@testing-library/react';
import App from './App';

test('renders college database heading', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /college database/i });
  expect(linkElement).toBeInTheDocument();
});

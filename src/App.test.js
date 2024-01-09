import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  render(<App />);  
});

test('render my city name',  () => {
  render(<App />);  
  const myCity = screen.getByTestId('myCityName');
  expect(myCity).toHaveTextContent('Seoul')
})
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Tests the NotFound page', () => {
  it('should have a h2 heading with the text About Pokédex', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('should contain an img with a specific src url', () => {
    renderWithRouter(<NotFound />);

    const pikachuImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(pikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

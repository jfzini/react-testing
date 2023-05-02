import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

describe('Tests the About page', () => {
  it('should have a h2 headfing with the text About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('should have two paragraphs about the pokedex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i
      );
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i
      );
    expect(secondParagraph).toBeInTheDocument();
  });

  it('should contain an img with a specific src url', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByRole('img', {name: /pokédex/i});
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
  });

  // it('should return to home page when click on Home', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const homeLink = screen.getByRole('link', { name: /favorite pokémon/i });

  //   userEvent.click(homeLink);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/favorites');
  // });
});

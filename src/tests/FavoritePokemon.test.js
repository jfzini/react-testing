import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Tests the Favorite Pokemon page', () => {
  it('should have a text with the text No favorite \'Pokémon found\'', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavText = screen.getByText(/no favorite pokémon found/i);
    expect(noFavText).toBeInTheDocument();
  });

  it('should display only the pokemon marked as favorites', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);

    const favoriteInput = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteInput).toBeInTheDocument();
    userEvent.click(favoriteInput);
    const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const pikachuSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuSprite).toBeInTheDocument();
  });
});

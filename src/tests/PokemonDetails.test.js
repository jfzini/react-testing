import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the Pokemon component', () => {
  it('should have the correct text elements when clicking on \'More details\'', () => {
    const { history } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();

    userEvent.click(detailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
    expect(document.body).not.toHaveTextContent(/more details/i);

    const pokeName = screen.getByRole('heading', { name: /pikachu details/i });
    const summaryH2 = screen.getByRole('heading', { name: /summary/i });
    const summaryText = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    const gameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const favLabel = screen.getByText(/pokémon favoritado\?/i);
    const testingElArr = [pokeName, summaryH2, summaryText, gameLocations, favLabel];
    testingElArr.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should have the correct game location imgs when clicking on \'More details\'', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);

    const gameLocationsImgs = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(gameLocationsImgs[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(gameLocationsImgs[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('should have the correct behaviour when adding a pokemon as favorite', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);

    const favInput = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favInput).not.toBeChecked();

    userEvent.click(favInput);
    const favIcon = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favIcon).toBeInTheDocument();
    expect(favInput).toBeChecked();

    userEvent.click(favInput);
    expect(favIcon).not.toBeInTheDocument();
    expect(favInput).not.toBeChecked();
  });
});

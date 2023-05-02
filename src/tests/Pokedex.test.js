import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the Pokedex page', () => {
  it('should have a h2 heading with the text Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render the next pokemon when \'Próximo Pokémon\' is clicked', () => {
    renderWithRouter(<App />);

    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const firstPoke = screen.getByText(/pikachu/i);
    expect(firstPoke).toBeInTheDocument();

    userEvent.click(nextPokeBtn);
    const secondPoke = screen.getByText(/charmander/i);
    expect(secondPoke).toBeInTheDocument();

    userEvent.click(nextPokeBtn);
    const thirdPoke = screen.getByText(/caterpie/i);
    expect(thirdPoke).toBeInTheDocument();
  });

  it('should have a unique button for each pokemon type', () => {
    renderWithRouter(<App />);

    const allPokeTypesBtns = screen.getAllByTestId('pokemon-type-button');
    const allPokeTypes = allPokeTypesBtns.map(({ innerHTML }) => innerHTML);

    expect(allPokeTypes).toEqual(['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']);
  });

  it('should render only the selected type pokemons, one at a time', () => {
    renderWithRouter(<App />);

    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    expect(screen.getAllByTestId('pokemon-name').length === 1);

    userEvent.click(fireBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    userEvent.click(nextPokeBtn);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    userEvent.click(nextPokeBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    userEvent.click(electricBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(nextPokeBtn).toBeDisabled();
    expect(allBtn).toBeInTheDocument();
  });

  it('should render all pokemons, one at a time, when \'All\' is selected ', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    expect(allBtn).toBeInTheDocument();
    expect(nextPokeBtn).toBeEnabled();

    userEvent.click(allBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(nextPokeBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(nextPokeBtn);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    // tests if the 'All' button keeps working after switching types
    userEvent.click(fireBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});

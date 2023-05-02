import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';
import App from '../App';

describe('Tests the Pokemon component', () => {
  it('should have a the correct pokemon data', () => {
    renderWithRouter(<App />);

    const firstPokeName = screen.getByText(/pikachu/i);
    expect(firstPokeName).toBeInTheDocument();
    const pokeData = document.querySelector('.pokemon-overview');
    const pokeDataParagraphs = [ ...pokeData.getElementsByTagName('p')];
    console.log(pokeDataParagraphs.map((element) => element.innerHTML));
  });
});

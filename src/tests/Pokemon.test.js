import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Tests the Pokemon component', () => {
  it('should have a the correct pokemon data', () => {
    renderWithRouter(<App />);
    const nextPokeBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    const firstPokeDataDiv = document.querySelector('.pokemon-overview');
    expect(firstPokeDataDiv).toBeInTheDocument();
    const firstPokeDataParagraphs = [ ...firstPokeDataDiv.getElementsByTagName('p')];
    const firstPokeData = firstPokeDataParagraphs.map(({innerHTML}) => innerHTML);
    const pikachuData = ['Pikachu', 'Electric', 'Average weight: 6.0 kg']
    expect(pikachuData).toEqual(firstPokeData)

    const firstPokeSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokeSprite.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(firstPokeSprite.alt).toBe(`${pikachuData[0]} sprite`)

    userEvent.click(nextPokeBtn);
    const secondPokeDataDiv = document.querySelector('.pokemon-overview');
    expect(secondPokeDataDiv).toBeInTheDocument();
    const secondPokeDataParagraphs = [ ...secondPokeDataDiv.getElementsByTagName('p')];
    const secondPokeData = secondPokeDataParagraphs.map(({innerHTML}) => innerHTML);
    const charmanderData = ['Charmander', 'Fire', 'Average weight: 8.5 kg']
    expect(charmanderData).toEqual(secondPokeData)

    const secondPokeSprite = screen.getByRole('img', { name: /charmander sprite/i });
    expect(secondPokeSprite.src).toBe('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
    expect(secondPokeSprite.alt).toBe(`${charmanderData[0]} sprite`)
  });

  it(`should have the correct behavior when clicking on 'More details'`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn.href).toBe('http://localhost/pokemon/25')

    userEvent.click(detailsBtn);
    const {pathname} = history.location;
    expect(pathname).toBe('/pokemon/25')

    const favBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favBtn);
    const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.alt).toBe('Pikachu is marked as favorite');
    expect(favIcon.src).toBe('http://localhost/star-icon.svg')
  })
});

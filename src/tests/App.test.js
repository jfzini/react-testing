import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Tests the component App.js', () => {
  it('should have a predetermined set of navigation links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should return to homepage when click on Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    // const homeHeading = screen.getByRole('heading', {
    //   name: /encountered pokémon/i
    // });
    // expect(homeHeading).toBeInTheDocument();
  });

  it('should return to about page when click on About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should return to home page when click on Home', () => {
    const {history} = renderWithRouter(<App />)
    const homeLink = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(homeLink)

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites')
  });
});

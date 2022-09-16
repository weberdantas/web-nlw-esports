import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

import { GameBanner, CreateAdBanner, CreateAdModal } from '../src/components';

import './styles/main.css';

import logo from './assets/logo.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    onGetGames();
  }, []);

  const onGetGames = () => {
    axios.get('http://localhost:3333/games').then((response) => {
      setGames(response.data);
    });
  };

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          Duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-4 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
};

export default App;

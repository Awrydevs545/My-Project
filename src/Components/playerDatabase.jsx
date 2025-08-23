// A simple database of players
import messiImg from '../assets/images/messi.png';
import ronaldoImg from '../assets/images/ronaldo.png';
import neymarImg from '../assets/images/neymar.png';
import suarezImg from '../assets/images/suarez.png';

export const players = {
  messi: {
    id: 'messi',
    name: 'Lionel Messi',
    age: 37,
    club: 'Inter Miami',
    nationality: 'Argentina',
    stats: { goals: 837, assists: 372, appearances: 1062 },
    image: messiImg,
  },
  ronaldo: {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    age: 39,
    club: 'Al Nassr',
    nationality: 'Portugal',
    stats: { goals: 895, assists: 251, appearances: 1226 },
    image: ronaldoImg,
  },
  neymar: {
    id: 'neymar',
    name: 'Neymar Jr',
    age: 32,
    club: 'Santos',
    nationality: 'Brazil',
    stats: { goals: 439, assists: 257, appearances: 717 },
    image: neymarImg,
  },
  suarez: {
    id: 'suarez',
    name: 'Luis Suarez',
    age: 39,
    club: 'Inter Miami',
    nationality: 'Uruguay',
    stats: { goals: 567, assists: 282, appearances: 819 },
    image: suarezImg,
  },
};

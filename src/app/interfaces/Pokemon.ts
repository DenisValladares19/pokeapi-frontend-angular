export interface Pokemon {
  id: number;
  name: string;
  types: { type: TypePokemon }[];
  typePokemon: string[];
  color: string;
  stats: Stat[];
  sprites: Sprites[];
}

export interface Stat {
  base_stat: number;
  name: string;
  stat: { url: string };
}

export interface Common {
  front_default: string;
}

export interface Other {
  home: Common;
}

export interface Sprites extends Common {
  other: Other;
}

export interface TypePokemon {
  name: string;
  url: string;
}

export interface Language {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Country {
  name: {
    common: string;
  };
  capital: string[];
  area: number;
  languages: {
    string: string;
  };
  flags: {
    svg: string;
  };
}

export interface Doacao {
  id: number;
  title: string;
  description: string;
  collectionDate: string;
  address: string;
  status: string;
  firstName: string;
}

export interface editarDoacao {
  status: number;
}
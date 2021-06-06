export interface Doacao {
        id: string;
        title: string;
        description: string;
        collectionDate: string;
        address: string;
        status: string;
        firstName: string;
}

export interface DoacaoCadastro {
        computer: {
                title: string;
                description: string;
        }
        collectionDate: String;
        address: string;
}
export interface GymBro_Usuario {
    Id: number;
    Usuario: string;
    Senha: string;
    Apelido: string;
    CEP: string;
    Bairro: string;
    Logradouro: string;
    Localidade: string;
 }
 
 export interface Publicacao {
    Id: number;
    Titulo: string;
    Descricao: string;
    Autor: GymBro_Usuario;
    Respostas: Resposta[];
 }
 
 export interface Resposta {
    Id: number;
    Descricao: string;
    Autor: GymBro_Usuario;
 }

 export interface Anotacao {
   Id: number;
   Titulo: string;
   Descricao: string;
   Autor: GymBro_Usuario;
}
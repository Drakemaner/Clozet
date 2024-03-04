import IRoupas from "./IRoupas";


export default interface IUser {
    id?: number,
    nomeCompleto?: string, 
    nomeUsuario?: string,
    email: string,
    senha: string,
    roupas? : IRoupas[]
}
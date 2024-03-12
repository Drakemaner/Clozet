import { IOutfits } from "./IOutfits";
import IRoupas from "./IRoupas";


export default interface IUser {
    id?: number,
    nomeCompleto?: string, 
    nomeUsuario?: string,
    email: string,
    senha: string,
    fotoPerfil? : string,
    roupas? : IRoupas[],
    outfits? : IOutfits[]
}
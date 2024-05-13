import IRoupas from "./IRoupas";

export interface IOutfits {
    id? : number,
    nome? : string,
    usuarioID: number,
    roupasId? : {id : number}[]
    roupasResponse? : IRoupas[]
}
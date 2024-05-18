import IRoupas from "./IRoupas";

export interface IOutfits {
    id? : number,
    nome? : string,
    usuarioID: number,
    roupasId? : {id : number}[]
    roupas? : IRoupas[]
    existente : boolean
}
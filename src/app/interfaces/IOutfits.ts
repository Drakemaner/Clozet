import IRoupas from "./IRoupas";

export interface IOutfits {
    id? : number,
    nome? : string,
    usuarioId: number,
    roupasRequest? : {id : number}[]
    roupasResponse? : IRoupas[]
}
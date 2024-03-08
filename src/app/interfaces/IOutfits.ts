import IRoupas from "./IRoupas";

export interface IOutfits {
    id? : number,
    nome? : string,
    usuarioId: number,
    roupas : IRoupas[]
}
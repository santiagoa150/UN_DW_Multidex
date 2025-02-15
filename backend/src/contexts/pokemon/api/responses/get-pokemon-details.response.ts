import { DefaultResponse } from "src/contexts/shared/api/responses/default.response";
import { HttpPokemonEntity } from "../model/http-pokemon-entity";
import { ApiProperty } from "@nestjs/swagger";
import { HttpPokemonMovementEntity } from "../model/http-pokemon-movement-entity";

export class GetPokemonDetailsResponse extends DefaultResponse {
    @ApiProperty({
        type: HttpPokemonEntity
    })
    pokemon: HttpPokemonEntity
    
    @ApiProperty({
        type: [HttpPokemonMovementEntity]
    })
    movements: HttpPokemonMovementEntity[]

    @ApiProperty({
        type: [HttpPokemonEntity]
    })
    evolutionChain: HttpPokemonEntity[]
}
import { UniverseTypeNameToPropertiesConstants } from "../../../domain/constants/universe-type-name-to-properties.constants";
import Charizard from "./Charizard.png"

export function Data(){
    return (
        <>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 justify-center">
            <div className="flex justify-center mb-4 md:mb-0">
                <img src={Charizard} className="w-full max-w-[400px] min-w-[20px] h-auto" />
            </div>
    
        <div className=" flex flex-col">
            <span className="mb-4">
                <span className="block text-end text-[24px] font-bold">Tipo</span>
                <p style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }} className="text-lg rounded-[2vw] flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2">av</p>
            </span>

            <span className="mb-4">
                <span className="block text-end text-[24px] font-bold">Hábitat</span>
                <p style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }} className="text-lg rounded-[2vw] flex font-semibold p-2 border-2 border-black w-full max-w-full h-[50px]">asdasdasd</p>
            </span>

            <span className="mb-4">
                <span className="block text-end text-[24px] font-bold">Descripción</span>
                <p style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }} className="text-lg rounded-[2vw] p-2 border-2 font-semibold border-black w-full max-w-full h-auto break-words ">
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdasd
                </p>
            </span>

            <span className="mb-4">
                <span className="block text-end text-[24px] font-bold">Modificar imagen</span>
                <p style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }} className="text-lg rounded-[2vw] flex border-2 h-[50px] font-semibold w-full max-w-full border-black"></p>
            </span>
        </div>
    </div>

        </>
    );
}
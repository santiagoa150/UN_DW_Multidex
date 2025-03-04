import { JSX, useState } from 'react';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { CgArrowLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { createPokemonApplication } from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';

/**
 * Create Pokémon Page
 */
export default function CreatePokemonPage(): JSX.Element {
    const { universeType } = useUniverse();
    const navigate = useNavigate();

    const [frontImageUrl, setFrontImageUrl] = useState<string | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [entityType1, setEntityType1] = useState<string | undefined>(undefined);
    const [entityType2, setEntityType2] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [height, setHeight] = useState<string | undefined>(undefined);
    const [weight, setWeight] = useState<string | undefined>(undefined);
    const [hp, setHp] = useState<string | undefined>(undefined);
    const [speed, setSpeed] = useState<string | undefined>(undefined);
    const [attack, setAttack] = useState<string | undefined>(undefined);
    const [defense, setDefense] = useState<string | undefined>(undefined);
    const [specialAttack, setSpecialAttack] = useState<string | undefined>(undefined);
    const [specialDefense, setSpecialDefense] = useState<string | undefined>(undefined);
    const [newMovement, setNewMovement] = useState<string | undefined>(undefined);
    const [movements, setMovements] = useState<string[]>([]);

    const handleSaveChanges = () => {
        if (canCreate()) {
            const types = [Number(entityType1!)];
            if (entityType2) types.push(Number(entityType2!));
            createPokemonApplication
                .exec(
                    name!,
                    frontImageUrl!,
                    description!,
                    Math.floor(Number(height!)),
                    Math.floor(Number(weight!)),
                    Math.floor(Number(attack!)),
                    Math.floor(Number(defense!)),
                    Math.floor(Number(hp!)),
                    Math.floor(Number(specialAttack!)),
                    Math.floor(Number(specialDefense!)),
                    Math.floor(Number(speed!)),
                    movements,
                    types,
                )
                .then(() => navigate(RoutesConstants.UNIVERSE_LIST));
        }
    };

    /**
     * Check if all the required fields are filled.
     */
    const canCreate = () => {
        return (
            !!frontImageUrl &&
            isImageLoaded &&
            !!name &&
            !!entityType1 &&
            entityType1 !== entityType2 &&
            !!description &&
            !!height &&
            Number(height) > 0 &&
            !!weight &&
            Number(weight) > 0 &&
            !!hp &&
            Number(hp) > 0 &&
            !!speed &&
            Number(speed) > 0 &&
            !!attack &&
            Number(attack) > 0 &&
            !!defense &&
            Number(defense) > 0 &&
            !!specialAttack &&
            Number(specialAttack) > 0 &&
            !!specialDefense &&
            Number(specialDefense) > 0
        );
    };

    return (
        <>
            <main className="grow w-full" style={{ backgroundColor: universeType?.tertiaryColor }}>
                <section>
                    <CgArrowLeft size="4rem" className="cursor-pointer m-4" onClick={() => navigate(-1)} />
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center box-border px-20 gap-x-16">
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0 min-h-[400px] w-full">
                        <img
                            src={frontImageUrl}
                            id="frontImageUrlInput"
                            alt=""
                            onError={() => setIsImageLoaded(false)}
                            onLoad={() => setIsImageLoaded(true)}
                            className="w-[400px] h-[400px] border border-black object-contain"
                        />
                        <div className="mb-4 w-full">
                            <span className="block text-[24px] font-bold">Imagen</span>
                            <input
                                name="frontImageUrl"
                                value={frontImageUrl}
                                onChange={(e) => {
                                    setIsImageLoaded(false);
                                    setFrontImageUrl(e.target.value);
                                }}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-x-4">
                            <div className="md:w-1/2">
                                <span className="block text-[24px] font-bold">Nuevo movimiento</span>
                                <input
                                    name="newMovement"
                                    value={newMovement}
                                    onChange={(e) => setNewMovement(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                                <button
                                    onClick={() => {
                                        movements.push(newMovement as string);
                                        setMovements(movements);
                                        setNewMovement('');
                                    }}
                                    style={{ backgroundColor: universeType?.mainColor }}
                                    disabled={!newMovement}
                                    className={`${newMovement ? 'hover:shadow-2xl transition duration-300 font-bold' : '!bg-gray-400'}  w-full px-4 py-2 rounded mt-4 mb-4`}
                                >
                                    Agregar
                                </button>
                            </div>
                            <div
                                className="p-4 md:w-1/2 grid grid-cols-1 gap-6 text-[20px] text-center
                                min-h-40 sm:min-h-auto max-h-auto overflow-auto rounded-lg mb-4"
                                key={movements.length}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                            >
                                {movements.map((move, i) => (
                                    <p
                                        key={i}
                                        className="w-full p-2 text-center cursor-pointer"
                                        onClick={() => {
                                            movements.splice(i, 1);
                                            setMovements([...movements]);
                                        }}
                                    >
                                        {move}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Nombre</span>
                            <input
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4 flex gap-x-4">
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Tipo 1</span>
                                <select
                                    name="entityType1"
                                    value={entityType1}
                                    onChange={(e) => setEntityType1(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                >
                                    <option value="0"></option>
                                    <option value="1">Normal</option>
                                    <option value="2">Fire</option>
                                    <option value="3">Water</option>
                                    <option value="4">Grass</option>
                                    <option value="5">Electric</option>
                                    <option value="6">Ice</option>
                                    <option value="7">Fighting</option>
                                    <option value="8">Poison</option>
                                    <option value="9">Ground</option>
                                    <option value="10">Flying</option>
                                    <option value="11">Psychic</option>
                                    <option value="12">Bug</option>
                                    <option value="13">Rock</option>
                                    <option value="14">Ghost</option>
                                    <option value="15">Dragon</option>
                                    <option value="16">Dark</option>
                                    <option value="17">Steel</option>
                                    <option value="18">Fairy</option>
                                    <option value="19">Stellar</option>
                                    <option value="20">Unknown</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Tipo 2</span>
                                <select
                                    name="entityType2"
                                    value={entityType2}
                                    onChange={(e) => setEntityType2(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                >
                                    <option value="0"></option>
                                    <option value="1">Normal</option>
                                    <option value="2">Fire</option>
                                    <option value="3">Water</option>
                                    <option value="4">Grass</option>
                                    <option value="5">Electric</option>
                                    <option value="6">Ice</option>
                                    <option value="7">Fighting</option>
                                    <option value="8">Poison</option>
                                    <option value="9">Ground</option>
                                    <option value="10">Flying</option>
                                    <option value="11">Psychic</option>
                                    <option value="12">Bug</option>
                                    <option value="13">Rock</option>
                                    <option value="14">Ghost</option>
                                    <option value="15">Dragon</option>
                                    <option value="16">Dark</option>
                                    <option value="17">Steel</option>
                                    <option value="18">Fairy</option>
                                    <option value="19">Stellar</option>
                                    <option value="20">Unknown</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4 flex gap-x-4">
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Altura</span>
                                <input
                                    name="height"
                                    value={height}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setHeight(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Peso</span>
                                <input
                                    name="weight"
                                    value={weight}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setWeight(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex gap-x-4">
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Vida</span>
                                <input
                                    name="hp"
                                    value={hp}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setHp(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Velocidad</span>
                                <input
                                    name="speed"
                                    value={speed}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setSpeed(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex gap-x-4">
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Ataque</span>
                                <input
                                    name="attack"
                                    value={attack}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setAttack(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Defensa</span>
                                <input
                                    name="defense"
                                    value={defense}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setDefense(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex gap-x-4">
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Ataque especial</span>
                                <input
                                    name="specialAttack"
                                    value={specialAttack}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setSpecialAttack(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                            <div className="w-1/2">
                                <span className="block text-[24px] font-bold">Defensa especial</span>
                                <input
                                    name="specialDefense"
                                    value={specialDefense}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setSpecialDefense(e.target.value)}
                                    style={{ backgroundColor: universeType?.secondaryColor }}
                                    className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Descripción</span>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <button
                                onClick={handleSaveChanges}
                                style={{ backgroundColor: universeType?.mainColor }}
                                disabled={!canCreate()}
                                className={`${canCreate() ? 'hover:shadow-2xl transition duration-300 font-bold' : '!bg-gray-400'}  w-3/6 px-4 py-2 rounded mt-4 mb-4`}
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

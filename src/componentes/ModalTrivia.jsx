import { useEffect, useState } from 'react';
import prueba from './prueba.json';

function ModalTrivia() {
    const [data, setData] = useState([]);
    const [indiceActivo, setIndiceActivo] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
    useEffect(() => {
        setData(prueba.preguntas);
    }, []);

    useEffect(() => {
        setIndiceActivo(0);
        setRespuestaSeleccionada(null);
        setRespuestaCorrecta(false);

        // Cambiar automáticamente la pregunta cada 15 segundos
        const interval = setInterval(() => {
            setIndiceActivo((prev) => (prev + 1) % data.length);
            setRespuestaSeleccionada(null);
            setRespuestaCorrecta(false);
        }, 15000);

        return () => clearInterval(interval);
    }, [data]);

    useEffect(() => {
        if (respuestaSeleccionada !== null) {
            // Verifica si la respuesta es correcta
            const correcta = data[indiceActivo].true;
            setRespuestaCorrecta(respuestaSeleccionada === correcta);
        }
    }, [respuestaSeleccionada, indiceActivo, data]);

    const manejarSeleccion = (respuesta) => {
        if (respuestaSeleccionada === null) {
            setRespuestaSeleccionada(respuesta);

            // Mostrar la respuesta correcta después de 10 segundos
            setTimeout(() => {
                setRespuestaSeleccionada(null);
                setRespuestaCorrecta(false);
            }, 15000);
        }
    };

    const opciones = [
        data[indiceActivo]?.true,
        ...(data[indiceActivo]?.false_1 ? [data[indiceActivo].false_1] : []),
        ...(data[indiceActivo]?.false_2 ? [data[indiceActivo].false_2] : []),
    ].sort(() => Math.random() - 0.5); // Mezcla las opciones

    return (
        <div>
            
            <div className=" flex items-center justify-center z-50  bg-opacity-95 mt-6 mb-2">
                <div className="bg-gray-100 m-4 p-6  border-red-500 rounded-xl ">
 
                    <p className="mb-4 font-bold">
                        {data[indiceActivo]?.pregunta}
                    </p>
                    {opciones.map((opcion, index) => (
                        <p
                            key={index}
                            className={`p-2  rounded-lg ${
                                respuestaSeleccionada === opcion &&
                                respuestaCorrecta
                                    ? 'bg-green-500 text-white'
                                    : respuestaSeleccionada === opcion &&
                                    !respuestaCorrecta
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-100'
                            }`}
                            onClick={() => manejarSeleccion(opcion)}
                        >
                            * {opcion}
                        </p>
                    ))}

                    {respuestaSeleccionada && (
                        <div className="mt-4 text-center">
                            {respuestaCorrecta ? (
                                <span className="text-green-600">
                                    Respuesta correcta!
                                </span>
                            ) : (
                                <span className="text-red-600">
                                    Respuesta incorrecta! La correcta era:{' '}
                                    {data[indiceActivo]?.true}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalTrivia;

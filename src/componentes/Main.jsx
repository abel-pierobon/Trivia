import { useState } from 'react';
import ModalTrivia from './ModalTrivia';


function Main() {
    const [activar, setActivar] = useState(false);
    return (
        <div className='flex flex-col justify-center mt-16 '>
            <h1 className='text-3xl font-bold text-center mb-10 font-mono text-shadow'>Trivia Manual del Buen Conductor</h1>
            <button onClick={() => setActivar(!activar)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl flex justify-center mx-auto'> {activar ? 'Finalizar Trivia' : 'Activar Trivia'}</button>
            {activar && <ModalTrivia />}
        </div>
    );
}
export default Main;

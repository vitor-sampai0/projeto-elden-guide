import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Turma: 2º Ano DS</h1>
                <h2 className="text-xl font-semibold mb-2 text-center">Escola: Senai Valinhos</h2>
                <p className="text-lg mb-4 text-center">Aluno: Vitor Sampaio</p>
                <div className="flex justify-center mb-4">
                </div>
                <blockquote className="italic text-center text-gray-700">
                    "O sucesso é a soma de pequenos esforços repetidos dia após dia." <br />
                    <span className="text-sm text-gray-500">– Robert Collier</span>
                </blockquote>
            </div>
        </div>
    );
}
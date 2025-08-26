"use client";

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function BossesPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://eldenring.fanapis.com/api/bosses?limit=200');
      const data = response.data;
      
      // A API do Elden Ring retorna um objeto com propriedade 'data' que contém o array
      if (data && data.data && Array.isArray(data.data)) {
        setUsuarios(data.data);
        console.table(data.data);
      } else {
        console.error('Estrutura de dados inesperada:', data);
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"> 
      <div className='max-w-6xl mx-auto px-4 py-8'>

        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>Bosses do Elden Ring</h1>

        <div className='mb-8 text-center'>
          <button onClick={buscarUsuarios} disabled={loading} className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Carregando...' : 'Buscar Bosses'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usuarios.map((boss) => {
            return (
              <div key={boss.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{boss.name}</h3>
                <p className="text-gray-600 mb-3 line-clamp-3">{boss.description || "Sem descrição."}</p>
                <p className="text-sm text-yellow-600 font-medium mb-3">📍 Local: {boss.location || "Desconhecido"}</p>
                {boss.image ? (
                  <Image
                    src={boss.image}
                    alt={boss.name}
                    width={400}
                    height={192}
                    className="mt-2 w-full h-48 object-cover rounded-md"
                  />
                ) : (
                  <div className="mt-2 w-full h-48 flex items-center justify-center bg-gray-100 rounded-md text-gray-400">
                    Imagem indisponível
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

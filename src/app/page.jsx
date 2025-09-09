import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-yellow-50 p-6 ">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border border-gray-200">
        <div className="mb-6">
          <Image
            src="https://fv5-4.files.fm/thumb_show.php?i=j3shw3pbm7&view&v=1&PHPSESSID=ee1f54081e5c9beff046edd02283759b9c54e573"
            alt="Foto"
            width={120}
            height={120}
            className="rounded-full border-4 border-indigo-300 shadow-lg object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center tracking-tight">
          Turma: <span className="text-gray-800">2º Ano DS</span>
        </h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-1 text-center">
          Escola: <span className="text-indigo-600">Senai Valinhos</span>
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center font-medium">
          Aluno: <span className="text-indigo-500">Vitor Sampaio</span>
        </p>
        <blockquote className="italic text-center text-gray-800 bg-indigo-50 rounded-xl px-6 py-4 shadow-inner">
          "O sucesso é a soma de pequenos esforços repetidos dia após dia."
          <br />
          <span className="text-sm text-gray-500">– Robert Collier</span>
        </blockquote>
      </div>
    </div>
  );
}

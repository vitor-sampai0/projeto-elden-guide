"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, Spin, Pagination } from "antd";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./bosses.module.css";

export default function BossesPage() {
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Função para buscar todos os usuários
  const fetchBosses = async () => {
    try {
      const response = await axios.get(
        "https://eldenring.fanapis.com/api/bosses?limit=200"
      );
      console.log(response.data); // Verifique a estrutura dos dados retornados
      setBosses(response.data.data || []); // Acesse o array de usuários corretamente
      toast.success("Usuários carregados com sucesso!", {
        toastId: "success-load", // ID único para evitar duplicatas
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao carregar usuários.", {
        toastId: "error-load",
      });
    } finally {
      setLoading(false);
    }
  };

  // Executa a busca quando o componente carrega
  useEffect(() => {
    fetchBosses();
  }, []);

  // Calcula quais usuários mostrar na página atual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBosses = bosses.slice(startIndex, endIndex);

  // Função para mudar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Função para mudar quantidade de itens por página
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Bosses</h1>

      {loading ? (
        // Tela de carregamento
        <div className={styles.loadingWrapper}>
          <Spin size="large" />
          <p className={styles.loadingText}>Carregando Bosses...</p>
        </div>
      ) : (
        <>
          {/* Controles de paginação */}
          <div className={styles.controlsWrapper}>
            <Pagination
              className={styles.pagination}
              total={bosses.length}
              showTotal={(total) => `Total ${total} usuários`}
              pageSize={pageSize}
              current={currentPage}
              showSizeChanger={true}
              pageSizeOptions={["5", "10", "20", "30"]}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
            />
          </div>

          {/* Lista de usuários em cards */}
          <div className={styles.cardsContainer}>
            {currentBosses.map((boss) => (
              <Link
                key={boss.id}
                href={`/bosses/${boss.id}`}
                className={styles.cardLink}
              >
                <Card className={styles.bossCard} hoverable>
                  <div className={styles.cardContent}>
                    {/* Imagem do usuário */}
                    {boss.image ? (
                      <Image
                        src={boss.image}
                        alt={boss.name}
                        width={400}
                        height={192}
                        className="mt-2 w-60 h-50 object-cover rounded-md"
                      />
                    ) : (
                      <div className="mt-2 w-60 h-50 flex items-center justify-center bg-gray-100 rounded-md text-gray-400">
                        Imagem não encontrada
                      </div>
                    )}

                    {/* Informações do usuário */}
                    <h3 className={styles.bossName}>{boss.name }</h3>
                    <h4 className={styles.bossLocation}>
                      <strong>📍Location:</strong> {boss.name}
                    </h4>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Container para mostrar as notificações toast */}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

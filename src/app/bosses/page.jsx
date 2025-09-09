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
  const [dataSource, setDataSource] = useState("");

  const lerSessionStorage = () => {
    console.log("📱 Lendo SessionStorage...");
    try {
      const data = sessionStorage.getItem("bosses");
      if (data) {
        const bosses = JSON.parse(data);
        setBosses(bosses);
        setDataSource("📱 SessionStorage");
        setLoading(false);
        toast.info("Dados carregados do SessionStorage!", {
          toastId: "session-load",
        });
        return true;
      } else {
        setBosses([]);
        setDataSource("📱 SessionStorage (vazio)");
        return false;
      }
    } catch (error) {
      console.error("❌ Erro ao ler SessionStorage:", error);
      return false;
    }
  };

  const salvarSessionStorage = (data) => {
    console.log("💾 Salvando no SessionStorage...");
    try {
      sessionStorage.setItem("bosses", JSON.stringify(data));
      console.log("✅ Dados salvos no SessionStorage");
    } catch (error) {
      console.error("❌ Erro ao salvar no SessionStorage:", error);
    }
  };

  // Função para buscar todos os bosses da API
  const fetchBosses = async () => {
    try {
      const response = await axios.get(
        "https://eldenring.fanapis.com/api/bosses?limit=200"
      );
      console.log(response.data); // Verifique a estrutura dos dados retornados
      const bossesData = response.data.data || [];
      setBosses(bossesData);
      setDataSource("🌐 API");
      
      // Salvar no SessionStorage
      salvarSessionStorage(bossesData);
      
      toast.success("Bosses carregados com sucesso!", {
        toastId: "success-load", // ID único para evitar duplicatas
      });
    } catch (error) {
      console.error("Erro ao buscar bosses:", error);
      toast.error("Erro ao carregar bosses.", {
        toastId: "error-load",
      });
    } finally {
      setLoading(false);
    }
  };

  // Executa a busca quando o componente carrega
  useEffect(() => {
    // Primeiro tenta ler do SessionStorage
    const hasSessionData = lerSessionStorage();
    
    // Se não houver dados no SessionStorage, busca da API
    if (!hasSessionData) {
      fetchBosses();
    }
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
      
      {/* Indicador da fonte dos dados e controles */}
      <div className={styles.dataControls}>
        <div className={styles.dataSource}>
          <span>Fonte dos dados: {dataSource}</span>
        </div>
        <div className={styles.actionButtons}>
          <button 
            className={styles.refreshBtn}
            onClick={() => {
              setLoading(true);
              fetchBosses();
            }}
            disabled={loading}
          >
            🔄 Atualizar da API
          </button>
          <button 
            className={styles.clearBtn}
            onClick={() => {
              sessionStorage.removeItem("bosses");
              setBosses([]);
              setDataSource("📱 SessionStorage (limpo)");
              toast.info("SessionStorage limpo!", {
                toastId: "clear-session",
              });
            }}
          >
            🗑️ Limpar Cache
          </button>
        </div>
      </div>

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
              showTotal={(total) => `Total ${total} bosses`}
              pageSize={pageSize}
              current={currentPage}
              showSizeChanger={true}
              pageSizeOptions={["5", "10", "20", "30"]}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
            />
          </div>

          {/* Lista de bosses em cards */}
          <div className={styles.cardsContainer}>
            {currentBosses.map((boss) => (
              <Link
                key={boss.id}
                href={`/bosses/${boss.id}`}
                className={styles.cardLink}
              >
                <Card className={styles.bossCard} hoverable>
                  <div className={styles.cardContent}>
                    {/* Imagem do boss */}
                    {boss.image ? (
                      <Image
                        src={boss.image}
                        alt={boss.name}
                        width={240}
                        height={200}
                        className={styles.bossImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>📷</span>
                        <p>Imagem não encontrada</p>
                      </div>
                    )}

                    {/* Informações do boss */}
                    <h3 className={styles.bossName}>{boss.name}</h3>
                    <div className={styles.bossLocation}>
                      <span className={styles.locationIcon}>Location:</span>
                      <span className={styles.locationText}>
                        {boss.location || boss.region || "Local não informado"}
                      </span>
                    </div>
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

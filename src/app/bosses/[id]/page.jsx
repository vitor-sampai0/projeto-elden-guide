"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import styles from "./[id].module.css";
import { Card, Spin, Button, Descriptions } from "antd";
import { ArrowLeftOutlined, EnvironmentOutlined } from "@ant-design/icons";

export default function BossDetailsPage({ params }) {
  const [boss, setBoss] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBoss = async (bossID) => {
    try {
      const response = await axios.get(
        `https://eldenring.fanapis.com/api/bosses/${bossID}`
      );
      setBoss(response.data.data); // Ajuste para acessar o campo correto
    } catch (error) {
      console.log("Erro ao buscar boss:", error);
      setBoss(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBoss(params.id);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingWrapper}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (!boss) {
    return (
      <div className={styles.container}>
        <div className={styles.errorWrapper}>
          <h3>Boss não encontrado</h3>
          <Link href="/bosses">
            <Button type="primary" icon={<ArrowLeftOutlined />}>
              Voltar para lista
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Cabeçalho com botão voltar */}
      <div className={styles.header}>
        <Link href="/bosses">
          <Button icon={<ArrowLeftOutlined />} className={styles.backButton}>
            Voltar
          </Button>
        </Link>
        <h2 className={styles.title}>Detalhes do Boss</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Card com foto e info principal */}
        <Card className={styles.mainCard}>
          <div className={styles.bossHeader}>
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
            <div className={styles.bossInfo}>
              <h3 className={styles.bossName}>{boss.name || "Desconhecido"}</h3>
            </div>
          </div>
        </Card>

        {/* Informações do Boss */}
        <Card
          title={
            <>
              <EnvironmentOutlined /> Informações do Boss
            </>
          }
          className={styles.detailCard}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Nome do Boss">
              {boss.name || "Desconhecido"}
            </Descriptions.Item>
            <Descriptions.Item label="Pontos de Vida">
              {boss.healthpoints || "Não disponível"}
            </Descriptions.Item>
            <Descriptions.Item label="Drops">
              {boss.drops && boss.drops.length > 0
                ? boss.drops.join(", ")
                : "Nenhum drop conhecido"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Localização do boss */}
        <Card
          title={
            <>
              <EnvironmentOutlined /> Localização do boss
            </>
          }
          className={styles.detailCard}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Região">
              {boss.region || "Região Desconhecida"}
            </Descriptions.Item>
            <Descriptions.Item label="Localização">
              {boss.location || "Localização Desconhecida"}
            </Descriptions.Item>
            <Descriptions.Item label="Descrição">
              {boss.description || "Descrição Desconhecida"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}

"use client";

import styles from "./api.module.css";

export default function ApiPage() {
return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Documentação da API</h1>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Nome da API</h2>
                <p className={styles.apiName}>Elden Ring API</p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Documentação Oficial</h2>
                <p>
                    <a 
                        href="https://eldenring.fanapis.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        https://eldenring.fanapis.com/
                    </a>
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>URL Base</h2>
                <code className={styles.code}>https://eldenring.fanapis.com/api</code>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Endpoint Escolhido</h2>
                <code className={styles.code}>/bosses</code>
                <p className={styles.description}>
                    Endpoint utilizado para buscar informações sobre os chefes (bosses) do jogo Elden Ring.
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Atributos da Resposta</h2>
                <div className={styles.attributesList}>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>id</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Identificador único do boss</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>name</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Nome do boss</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>image</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>URL da imagem do boss</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>region</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Região onde o boss se encontra</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>description</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Descrição detalhada do boss</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>location</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Localização específica do boss</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>drops</span>
                        <span className={styles.attributeType}>array</span>
                        <span className={styles.attributeDesc}>Lista de itens que o boss pode dropar</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>healthPoints</span>
                        <span className={styles.attributeType}>string</span>
                        <span className={styles.attributeDesc}>Pontos de vida do boss</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Possíveis uso de Rotas</h2>
                <div className={styles.attributesList}>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>GET</span>
                        <span className={styles.attributeType}>/bosses</span>
                        <span className={styles.attributeDesc}>Buscar todos os bosses com paginação</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>GET</span>
                        <span className={styles.attributeType}>/bosses/:<strong>id</strong></span>
                        <span className={styles.attributeDesc}>Buscar boss específico por ID</span>
                    </div>
                    <div className={styles.attribute}>
                        <span className={styles.attributeName}>GET</span>
                        <span className={styles.attributeType}>/bosses?limit="<strong>limit</strong>"</span>
                        <span className={styles.attributeDesc}>Limitar número de resultados</span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Descrição da API</h2>
                <p className={styles.description}>
                    A Elden Ring API é uma API pública e gratuita que fornece dados completos sobre o universo do jogo Elden Ring. 
                    Ela disponibiliza informações detalhadas sobre bosses, armas, armaduras, magias, itens, NPCs, classes e muito mais. 
                    Esta API é perfeita para desenvolvedores que desejam criar aplicações, guias ou ferramentas relacionadas ao jogo Elden Ring, 
                    oferecendo dados estruturados e atualizados sobre todos os elementos do jogo.
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Exemplo de Uso</h2>
                <div className={styles.codeBlock}>
                    <pre>
                        <code>
{`// Exemplo de requisição
const response = await axios.get(
'https://eldenring.fanapis.com/api/bosses?limit=10'
);

// Estrutura da resposta
{
"success": true,
"count": 10,
"total": 238,
"data": [
    {
        "id": "17f69c93c4b0l0i2mkqug...",
        "name": "Crucible Knight",
        "image": "https://eldenring.fanapis.com/images/bosses/...",
        "region": "Limgrave",
        "description": "A formidable knight...",
        "location": "Stormveil Castle",
        "drops": ["Crucible Axe Set"],
        "healthPoints": "2,597"
    }
]
}`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
);
}
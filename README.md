# Site — Instituto Saúde em Equilíbrio e Desenvolvimento Social

Site estático (HTML, CSS e JS puros, sem build). Basta publicar a pasta em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger etc.).

```
index.html                  página única (Início, Quem somos, O que fazemos, Dúvidas frequentes, Como ajudar, Nossa história, Transparência, Contato)
transparencia/index.html    /transparencia — documentos por ano e categoria, com filtros
privacidade/index.html      /privacidade — política de privacidade
assets/css/style.css        estilos (cores definidas em :root)
assets/js/main.js           menu, cópia do Pix, filtros, animações suaves
assets/img/                 logotipo otimizado e imagens provisórias
```

Para ver localmente: `python3 -m http.server` na pasta e abrir http://localhost:8000.

## Fontes do conteúdo

- Folheto `ISE _ A4 Institucional_2025.pdf`: descrição, serviços, equipe, localização e contatos.
- Portal https://transparenciasocial.com.br/instituto-iseds: CNPJ, fundação (21/09/1986), missão, público, formas de acesso, horário, Instagram e lista de documentos.

## Modo revisão

As marcações de pendência ficam **escondidas** para o visitante. Para vê-las, abra o site com `?revisao` no endereço (ex.: `http://localhost:4005/?revisao`). O modo vale para a sessão do navegador; `?revisao=0` desliga.

## Pendências (buscar por `pendente` no código)

Resolver antes de publicar:

1. **Fotos reais autorizadas.** As 4 fotos atuais (`assets/img/provisoria-*.webp`) saíram do folheto e são de banco de imagens. Substituir por fotos reais da instituição. A foto da abertura (`assets/img/abertura-*.jpg`, versão larga para computador e vertical para celular) é uma imagem ilustrativa gerada por IA; avaliar se fica ou se será trocada por foto real. A seção **Registros** (galeria) está desativada (comentada em `index.html`) até haver de 4 a 6 fotos reais autorizadas.
2. **Datas:** confirmar o ano de origem (1986) usado no número “Fundação 1986”. O texto de história já é o oficial.
3. **Números:** “Pessoas impactadas” (número e período) e o selo “40 anos” na colagem de fotos.
4. **Projetos:** validar nomes, descrições e públicos com a Núria.
   **Dúvidas frequentes:** validar as respostas, principalmente se todos os serviços são gratuitos e as formas de acesso (procura espontânea, rede pública, CREDAC, busca ativa).
5. **Pix:** chave e razão social oficial. Ao receber a chave, trocar “Em breve” em `.pix__valor` pela chave e preencher `data-copiar="CHAVE"` no botão “Copiar” (sem isso o botão fica desativado).
6. **Portal da Transparência da Prefeitura:** endereço exato (home e /transparencia).
7. **Documentos:** aprovação da lista e, se possível, links diretos para cada arquivo.
8. **Parceiros:** seção retirada desta versão. Incluir quando houver logotipos autorizados.
9. **Contatos oficiais:** confirmar WhatsApp (15) 97404-8615, telefone (15) 3326-5433, e-mail e Instagram.
10. **Sigla oficial:** ISE ou ISEDS (rodapé e dados estruturados).
11. **Domínio:** substituir `PENDENTE-DOMINIO` nas tags `canonical`; indicar a hospedagem na política de privacidade.
12. **Política de privacidade:** confirmar a data de publicação, se há encarregado (DPO) nomeado e o prazo de guarda das mensagens recebidas; atualizar a seção “Imagens” quando as fotos reais entrarem.

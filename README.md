# Site da Orbe (orbehub.app)

Site estático (HTML, CSS e JS puros, sem build). Hospedado no Cloudflare Pages, ligado ao GitHub: cada push publica sozinho.

- `index.html`: a página
- `style.css`: o visual (cores do Órbita, layout Destaque)
- `script.js`: troca de idioma (PT/EN, botão do globo) e abre o vídeo do FitFlow ao clicar no card. Os textos em inglês ficam no topo deste arquivo
- `assets/`: vídeos de apresentação (PT e EN), capas e miniaturas
- `_headers`: cache dos arquivos de mídia no Cloudflare
- `favicon.svg`: ícone da aba

## Configuração no Cloudflare Pages (uma vez só)
- Framework preset: None
- Build command: (vazio)
- Build output directory: `/`
- Domínios: `orbehub.app` e `www.orbehub.app` (o www redireciona para o principal)

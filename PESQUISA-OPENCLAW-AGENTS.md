# Pesquisa: OpenClaw, Agentes IA e Setup de Assistente Pessoal

**Data:** 20/03/2026
**Todos os valores em USD e BRL (câmbio ~R$5,70)**

---

## 1. Valores de Referência (USD → BRL)

| Stack | USD/mês | BRL/mês |
|-------|---------|---------|
| Mais barato (DeepSeek + VPS) | $10-30 | R$57-171 |
| Intermediário (multi-modelo) | $30-50 | R$171-285 |
| Claude Opus pesado | $200-400 | R$1.140-2.280 |
| Full local (Ollama) | $0 API | R$0 (só eletricidade) |
| Claude Code + VPS + tmux | $25-30 | R$145-171 |

---

## 2. Dispatch vs VPS — Funcionamento

### Dispatch (Claude Cowork)
- **Exige Mac/PC ligado** com Claude Desktop aberto
- Fechou a tampa do notebook → sessão morre
- É um "controle remoto", não cloud computing
- Research preview (março 2026) — confiabilidade ~50/50
- **NÃO funciona em VPS** (requer app desktop gráfico)

### Alternativas Always-On

#### Claude Code + VPS + tmux (Melhor opção atual)
- VPS barata ($5-10/mês) + Claude Pro ($20/mês) = **$25-30/mês**
- tmux mantém sessão persistente — desconecta e reconecta quando quiser
- Funciona headless, 24/7, sem PC ligado
- Mosh (UDP) recomendado para conexões instáveis
- Confirmado funcionando em: Hetzner, Vultr, DigitalOcean, Hostinger
- **Limitação:** É terminal/CLI, não interface gráfica

#### OpenClaw em VPS (Docker)
- Feito para rodar 24/7 em VPS
- Docker + VPS barata e pronto
- Interface web própria
- **Limitação:** Paga por token (API), não usa assinatura

---

## 3. Galaxy Book Ultra 4 — RTX 4070 Laptop (8GB VRAM)

### O que roda bem localmente

| Modelo | Quantização | Performance | Viável? |
|--------|-------------|-------------|---------|
| **Phi-4-mini (3.8B)** | Q4_K_M – Q5_K_M | Muito rápido | Excelente |
| **Llama 3.3 8B** | Q4_K_M | 30-50 tok/s | Sweet spot |
| **Qwen 3 7B** | Q4_K_M | 30-50 tok/s | Sweet spot |
| **Mistral Small 3 7B** | Q4_K_M | 30-50 tok/s | Sweet spot |
| **Gemma 3 12B** | Q4_K_M | Lento (offload parcial) | Possível com tradeoffs |
| **Qwen3 14B** | Q4_K_M | Lento (offload parcial) | Possível com tradeoffs |
| **27B+** | Qualquer | Muito lento | Não prático |

### Resumo
- **Sweet spot:** Modelos 7-8B em Q4_K_M → 30-50 tokens/segundo
- **Máximo aceitável:** 12-14B com offload parcial para CPU (lento)
- **Não roda:** 27B+ (VRAM insuficiente)
- O notebook de R$14k **não roda** modelos grandes como Qwen3-Coder 32B ou DeepSeek R1 32B localmente

### Dicas de Otimização
- Usar quantização Q4_K_M (padrão do Ollama)
- `OLLAMA_NUM_PARALLEL=1 OLLAMA_MAX_LOADED_MODELS=1 ollama serve`
- Mínimo 16GB RAM do sistema para modelos 7-8B
- Monitorar com `nvidia-smi`

---

## 4. Opções para Rodar Modelos Grandes Localmente

### Opção A: eGPU (GPU Externa)

#### AORUS RTX 5090 AI BOX (Top de linha)
- **Preço:** ~$2.999 (~R$17.100)
- 32GB GDDR7, 1.792 GB/s bandwidth
- Liquid-cooled, PSU 850W incluso
- Conexão: Thunderbolt 5
- Roda modelos até ~70B quantizados
- **Perda de performance:** 18-27% vs desktop (PCIe direto)
- Para inferência LLM, a perda é menor (compute-bound, não bandwidth-bound)

#### eGPU com RTX 4090 (Custo-benefício)
- **Enclosure TB4:** $200-400
- **RTX 4090:** $1.600-2.000
- **Total:** ~$1.800-2.400 (~R$10.260-13.680)
- 24GB VRAM — roda modelos até 32B quantizados
- Boa opção se já tem o notebook

#### eGPU com RTX 4090 usada
- RTX 4090 usada: ~$1.200-1.500
- Total com enclosure: ~$1.400-1.900 (~R$7.980-10.830)

#### Alternativa: OCuLink
- 64 Gbps (PCIe Gen4 x4) — mais banda que TB4
- Nem todo notebook suporta
- Galaxy Book Ultra 4: verificar se tem OCuLink/M.2 acessível

### Opção B: Desktop Dedicado (Melhor custo-benefício)

#### Budget ($500-1.000 / R$2.850-5.700)
- PC usado + RTX 3090 usada (24GB VRAM)
- Roda modelos até 32B quantizados
- Melhor custo-benefício absoluto

#### Mid-range ($1.000-2.000 / R$5.700-11.400)
- PC com RTX 4090 (24GB)
- Roda 70B com offload parcial
- Excelente para uso pesado

#### Para rodar 70B confortavelmente
- Mínimo: 2x RTX 3090 (48GB total) ou 1x RTX 5090 (32GB)
- Custo: $2.000-3.500

### Opção C: Não comprar hardware (Cloud/API)
- Usar API de modelos grandes quando necessário
- Rodar modelos 7-8B localmente para tarefas simples
- Hybrid approach — mais econômico para a maioria

### Recomendação para o Galaxy Book Ultra 4
1. **Curto prazo:** Usar Ollama com Qwen 3 7B/Llama 3.3 8B localmente (grátis, já funciona)
2. **Se quiser upgrade:** RTX 3090 usada + enclosure eGPU (~R$8-10k)
3. **Melhor custo-benefício geral:** Desktop com RTX 3090 usada (~R$4-6k total)

---

## 5. Claude Code como OpenClaw — "A Gambiarra Ideal"

### A Ideia
Usar Claude Code (com assinatura Pro/Max) como assistente pessoal 24/7, similar ao OpenClaw, mas sem pagar por token de API.

### Vantagem Principal
- **Claude Pro ($20/mês):** Inclui uso do Claude Code no terminal
- **Claude Max ($100/mês):** 5x mais uso
- **Claude Max 20x ($200/mês):** 20x mais uso
- Sem custo por token — diferente do OpenClaw que cobra API

### PROBLEMA CRÍTICO: Rate Limits
- **Anthropic declarou explicitamente** que uso contínuo 24/7 em background é exatamente o tipo de comportamento que os rate limits visam impedir
- Usuários reportam bater no limite diário em **30 minutos** de uso intensivo
- Mesmo no Max 20x ($200/mês), não é ilimitado
- Ao exceder o limite, pode comprar uso adicional a preços de API

### Limites Aproximados (Claude Max 20x - $200/mês)
- Sonnet 4: 240-480 horas/semana (mas são tokens, não tempo literal)
- Opus 4: 24-40 horas/semana
- Na prática, depende do tamanho do contexto e complexidade

### Setup Existente: Claude Code como Assistente Pessoal

#### Plugin Personal Assistant (GitHub: kjenney/personal-assistant-plugin)
- Transforma Claude Code em assistente pessoal
- Integração com Gmail e Google Calendar via MCP
- Features: resumo de emails, respostas contextuais, busca, detecção de prioridade
- Agendamento, preparação de reuniões, detecção de conflitos
- Usa MCP servers: `@gongrzhe/server-gmail-autoauth-mcp` e `@cocal/google-calendar-mcp`

#### MCP Servers Disponíveis para Claude Code
- **Email:** Gmail MCP, Outlook MCP
- **Calendário:** Google Calendar MCP
- **Drive/Arquivos:** Google Drive MCP, filesystem MCP
- **Web:** Playwright MCP (browser), web search
- **Messaging:** WhatsApp/Telegram (via bridges)
- **Lazy loading:** Reduz uso de contexto em até 95%

#### Setup Recomendado (Claude Code + VPS)
```
VPS (Hetzner/Vultr) $5-10/mês
+ Claude Pro/Max $20-200/mês
+ tmux (sessão persistente)
+ mosh (conexão resiliente)
+ MCP servers (email, calendar, drive)
+ personal-assistant-plugin
= Assistente pessoal "always-on"
```

#### Acesso Mobile
- Termius ou JuiceSSH no celular
- Claude Code Remote Control (fev 2026) — controla do celular
- Mas o processo roda na VPS, não morre

### Limitações vs OpenClaw
| Feature | Claude Code + VPS | OpenClaw |
|---------|------------------|----------|
| Custo base | $20-200/mês (assinatura) | $0 (open source) |
| Custo API | Incluso na assinatura | $8-30/mês |
| Interface | Terminal (CLI) | Web GUI |
| Setup | Mais complexo | Docker simplificado |
| Rate limits | SIM (problemático) | Não (paga por uso) |
| Qualidade do modelo | Claude (top tier) | Multi-modelo |
| MCP ecosystem | Rico e crescente | Skills/plugins |
| Always-on | Via VPS + tmux | Nativo |
| Mobile | Termius/Remote Control | Web/Telegram/WhatsApp |

### Veredicto
Claude Code + VPS é viável como assistente pessoal **para uso moderado** (não 24/7 contínuo). Para uso intensivo, os rate limits são o gargalo. A melhor abordagem é **híbrida:**
- Claude Code para tarefas complexas (usa assinatura)
- OpenClaw com DeepSeek/Llama para tarefas simples e rotinas automatizadas (usa API barata)

---

## 6. Segurança da API DeepSeek — Análise Detalhada

### RISCOS CONFIRMADOS

#### Armazenamento na China
- Dados armazenados em servidores na China
- Sujeito à Lei de Segurança de Dados (2021) e Lei de Inteligência Nacional (2017)
- Governo chinês pode legalmente exigir acesso aos dados sem notificar usuários

#### Falhas de Segurança Documentadas
- **CVE-2026-25253 (CVSS 8.8):** Cross-site WebSocket hijacking
- **Banco de dados exposto (Wiz):** 1M+ registros sensíveis (histórico de chat, API keys, logs)
- **Chaves de criptografia hardcoded** (NowSecure) — erro fundamental
- **Código oculto (Feroot Security):** Transmissão de dados para CMPassport.com (China Mobile)
- Dados transmitidos sem criptografia em alguns casos
- Taxa de jailbreak: 100% de sucesso em testes

#### Banimentos Governamentais
- **Itália:** Banido em 72 horas
- **Austrália:** Banido de todos dispositivos governamentais
- **República Tcheca:** Banido da administração pública
- **Alemanha:** Pediu remoção das app stores
- **13 jurisdições europeias** investigando
- **7+ países** e dezenas de agências dos EUA baniram

### API vs App vs Local

| Aspecto | DeepSeek API | DeepSeek App | DeepSeek Local |
|---------|-------------|-------------|----------------|
| Dados vão pra China? | SIM | SIM | NÃO |
| Coleta keystroke? | Não | SIM | NÃO |
| Seguro? | Risco médio-alto | Risco alto | Risco baixo* |
| Privacidade | Prompts armazenados | Tudo coletado | Total |

*Rodar localmente elimina o envio de dados, mas as vulnerabilidades do modelo em si (jailbreak, censura embutida) permanecem.

### ALTERNATIVAS SEGURAS E BARATAS

| Provider | Preço/M tokens (in/out) | Privacidade | Compliance |
|----------|------------------------|-------------|------------|
| **Groq** (Llama 3) | $0.05-0.10 | USA, boa | Em andamento |
| **Together.ai** (Llama 4) | $0.05-0.90 | USA, boa | SOC2 |
| **Fireworks.ai** | $0.10-3.00 | USA, excelente | **HIPAA + SOC2 Type II** |
| **Gemini Flash-Lite** | $0.075/0.30 | USA (Google) | Enterprise |
| **Mistral (via API)** | $0.02+ | **Europa (França)** | GDPR nativo |
| DeepSeek V3.2 | $0.28/0.42 | **China** | Nenhum |

### Recomendação para Quem Tem Medo da China
1. **Melhor opção:** Rodar DeepSeek **localmente** via Ollama (dados nunca saem do PC)
2. **API barata + segura:** Groq ou Together.ai com Llama 4 Scout ($0.05-0.27/M tokens)
3. **Máxima privacidade + barato:** Mistral via API (servidores na Europa, GDPR)
4. **Compliance enterprise:** Fireworks.ai (HIPAA + SOC2)
5. **Hosted DeepSeek sem China:** Perplexity hospeda DeepSeek R1 em servidores US/EU

### NUNCA usar a API DeepSeek direta para:
- Dados pessoais de clientes
- Informações financeiras
- Dados médicos
- Comunicações confidenciais
- Qualquer dado sujeito a LGPD/GDPR

---

## 7. Caso de Uso "Jarvis para Leigos" — Recomendação Final

### Stack Recomendado (Seguro + Barato)

```
OpenClaw (Docker, VPS)
+ Groq API (Llama 4 Scout) — tarefas do dia-a-dia ($0.05-0.27/M)
+ Claude Sonnet via API — tarefas complexas ($3/M input)
+ ClawRouter — roteamento automático
+ SecureClaw — segurança
+ WhatsApp/Telegram — interface do usuário
```

### Custo Mensal Estimado (Seguro, sem DeepSeek China)

| Item | USD | BRL |
|------|-----|-----|
| VPS (Oracle Free ou Hetzner) | $0-10 | R$0-57 |
| Groq API (80% tarefas) | $3-8 | R$17-46 |
| Claude Sonnet API (20% complexo) | $5-15 | R$29-86 |
| **TOTAL** | **$8-33/mês** | **R$46-189/mês** |

### Stack Alternativo (Claude Code + VPS)

```
VPS (Hetzner $5/mês)
+ Claude Pro ($20/mês) ou Max ($100/mês)
+ tmux + mosh
+ MCP servers (Gmail, Calendar, Drive)
+ personal-assistant-plugin
+ Termius no celular
```

**Custo:** $25-110/mês (R$143-627)
**Vantagem:** Claude top-tier sem custo por token
**Desvantagem:** Rate limits, interface CLI

### Para o Consultor (Modelo de Negócio)
- Montar e configurar para o cliente
- Cliente usa via WhatsApp/Telegram (zero conhecimento técnico)
- Cobrar setup + manutenção mensal
- Custo do cliente: R$50-200/mês (API + VPS)
- Sua margem: serviço de configuração e suporte

---

## Fontes

- [Best Local LLMs for RTX 40 Series](https://apxml.com/posts/best-local-llm-rtx-40-gpu)
- [Ollama VRAM Requirements Guide](https://localllm.in/blog/ollama-vram-requirements-for-local-llms)
- [Optimizing Local LLMs for 8GB GPU](https://www.sitepoint.com/optimizing-local-llms-low-end-hardware-8gb/)
- [AORUS RTX 5090 AI BOX Review](https://awesomeagents.ai/reviews/review-aorus-rtx-5090-ai-box/)
- [Best eGPU Enclosures 2026](https://egpu.io/best-egpu-buyers-guide/)
- [RTX 4090 vs 5090 for LLM Inference](https://www.cloudrift.ai/blog/benchmarking-rtx-gpus-for-llm-inference)
- [Claude Code on VPS Setup](https://medium.com/@0xmega/claude-code-on-a-vps-the-complete-setup-security-tmux-mobile-access-2d214f5a0b3b)
- [Personal Assistant Plugin for Claude Code](https://github.com/kjenney/personal-assistant-plugin)
- [Claude Max Plan Pricing & Limits](https://intuitionlabs.ai/articles/claude-max-plan-pricing-usage-limits)
- [Claude Code Rate Limits](https://northflank.com/blog/claude-rate-limits-claude-code-pricing-cost)
- [DeepSeek Security Assessment 2026](https://axis-intelligence.com/is-deepseek-safe-2026-security-concerns/)
- [DeepSeek Hidden Code to China](https://www.feroot.com/news/the-independent-feroot-security-uncovers-deepseeks-hidden-code-sending-user-data-to-china/)
- [DeepSeek Privacy Concerns](https://krebsonsecurity.com/2025/02/experts-flag-security-privacy-risks-in-deepseek-ai-app/)
- [LLM API Pricing March 2026](https://www.tldl.io/resources/llm-api-pricing-2026)
- [DeepSeek Alternatives That Are Safe](https://brightseotools.com/post/DeepSeek-Alternatives)
- [Cheap LLM API Providers 2026](https://www.siliconflow.com/articles/en/the-cheapest-LLM-API-provider)

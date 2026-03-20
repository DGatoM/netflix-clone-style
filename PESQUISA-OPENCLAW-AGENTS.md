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
| **Llama 3.3 8B** | Q4_K_M (~4.9GB) | 30-50 tok/s | Sweet spot |
| **Qwen 3 7B** | Q4_K_M (~4.5GB) | 30-50 tok/s | Sweet spot (HumanEval 76.0) |
| **Qwen 2.5 Coder 7B** | Q4_K_M (~4.5GB) | 30-50 tok/s | Bom para código |
| **Mistral Small 3 7B** | Q4_K_M (~4.5GB) | 30-50 tok/s | Sweet spot |
| **DeepSeek R1 Distilled 7B** | Q4_K_M | 30-50 tok/s | Reasoning barato |
| **Gemma 3 12B** | Q4_K_M (~8.7GB) | Lento (offload parcial) | Possível com tradeoffs |
| **Qwen3 14B** | Q4_K_M (~8.7GB) | Lento (offload parcial) | Possível com tradeoffs |
| **27B+** | Qualquer | Muito lento | Não prático |

### Modelos que NÃO rodam (confirmado)
- **Qwen3-Coder 32B:** Precisa ~22-24GB VRAM. Nem com quantização extrema (2-bit = ~10-12GB)
- **Llama 4 Scout:** 109B total (MoE). Precisa ~54.5GB. Inviável
- **DeepSeek R1 Distilled 14B:** ~8.7GB arquivo, estoura com KV cache
- **DeepSeek R1 Distilled 32B:** Precisa 24GB VRAM

### Resumo
- **Sweet spot:** Modelos 7-8B em Q4_K_M → 30-50 tokens/segundo
- **Máximo aceitável:** 13B em Q3_K_S (qualidade reduzida) ou 8B em Q5_K_M (qualidade boa)
- **Não roda:** 14B+ (VRAM insuficiente com KV cache)
- O notebook de R$14k **não roda** modelos grandes como Qwen3-Coder 32B ou DeepSeek R1 32B localmente
- **Regra:** Deixar ~1GB livre para KV cache. Modelo de 8GB de arquivo vai dar OOM

### Dicas de Otimização
- Usar quantização Q4_K_M (padrão do Ollama)
- `OLLAMA_NUM_PARALLEL=1 OLLAMA_MAX_LOADED_MODELS=1 ollama serve`
- Reduzir contexto para 4K (economiza 0.2-0.4GB)
- Ativar Flash Attention (sem perda de qualidade, economiza VRAM)
- Usar KV cache quantization Q8_0 (reduz cache pela metade)
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

#### eGPU Budget: RTX 3090 usada
- **RTX 3090 usada:** $700-900 (24GB VRAM, 80-110 tok/s em 8B)
- **Enclosure TB4 barato:** $150-300 (AOOSTAR AG01 ou similar)
- **Total:** ~$850-1.200 (~R$4.850-6.840)
- Roda até 27B confortavelmente
- **MELHOR CUSTO-BENEFÍCIO para eGPU**

#### Enclosures por faixa de preço

| Enclosure | Conexão | Preço | Nota |
|-----------|---------|-------|------|
| **MINISFORUM DEG1** | OCuLink | $99 | Mais barato, só 5-7% perda, requer OCuLink |
| **AOOSTAR AG01** | TB4/USB4 | $150-250 | Budget, PSU 800W incluso |
| **ANQUORA ANQ-L336** | TB3/TB4/USB4 | $200-300 | Compacto |
| **Razer Core X V2** | TB5 | $300-400 | 4-slot GPU |
| **Sonnet** | TB4/TB5 | $350-500 | PSU 850W |

#### Alternativa: OCuLink
- 64 Gbps (PCIe Gen4 x4) — mais banda que TB4
- Só 5-7% perda de performance (vs 10-20% do TB4)
- Nem todo notebook suporta
- Galaxy Book Ultra 4: verificar se tem OCuLink/M.2 acessível
- **MINISFORUM DEG1 por $99** — se tiver OCuLink, é a opção mais barata

#### Performance eGPU vs Desktop para LLM
- **Para inferência LLM, a perda é quase NULA** — modelo carrega 1x na VRAM, depois o compute é todo no GPU
- A banda TB4/TB5 só importa no carregamento do modelo (segundos)
- Tokens in/out são kilobytes, não gigabytes

### Opção B: Desktop Dedicado (Melhor custo-benefício)

#### Budget (~$1.000 / R$5.700)
- RTX 3090 usada ($700-900) + Ryzen 5 5600 ($80-120) + 32GB DDR4 ($50-70) + PSU 750W ($60-80)
- **Total:** ~$970-1.290
- Roda até 27B em Q4_K_M, 8B a 80-110 tok/s
- **Melhor custo-benefício absoluto**

#### Mid-range (~$1.500-2.500 / R$8.550-14.250)
- RTX 4090 ($1.600-1.800) + Ryzen 7 7800X3D ($300) + 48-64GB DDR5 ($120-200)
- Roda 13B-34B nativamente, 70B com CPU offload (~18 tok/s)

#### Para rodar 70B confortavelmente
- **2x RTX 3090 (48GB total):** $1.400-1.800 só GPUs + PSU 1000W → ~$2.200-3.000 build completo
- **1x RTX 5090 (32GB):** $3.400-4.000 só GPU → 70B em quantização agressiva (Q3)
- **Prático mínimo para 70B aceitável:** ~$1.600 (RTX 3090 + 64GB RAM + CPU offload = ~18 tok/s)

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

### Projetos GitHub que Transformam Claude Code em Assistente Pessoal

#### Projetos Dedicados

| Projeto | O que faz |
|---------|-----------|
| [personal-assistant-plugin](https://github.com/kjenney/personal-assistant-plugin) | Plugin com Gmail + Google Calendar via MCP. Resumo de emails, respostas, agendamento |
| [claude-code-personal-assistant](https://github.com/c0dezli/claude-code-personal-assistant) | Template com Notion + Google Workspace. Comando `/daily-routine` para morning workflow |
| [personal-assistant (blizzarac)](https://github.com/blizzarac/personal-assistant) | Skills para journal, tasks, meetings, people management. Armazena em markdown estruturado |
| [claude-telegram-bot](https://github.com/linuz90/claude-telegram-bot) | Bot Telegram com botões interativos, comando `/life-pulse` (briefing matinal), modo personal trainer. **Usa assinatura, sem custo de API** |
| **[Secure-OpenClaw (Composio)](https://github.com/ComposioHQ/secure-openclaw)** | **PONTE entre Claude Code e OpenClaw.** WhatsApp/Telegram/Signal/iMessage, memória persistente, reminders, 500+ apps. Docker hardening |

#### Ferramentas de Gerenciamento de Sessão

| Projeto | O que faz |
|---------|-----------|
| [claude-tmux](https://github.com/nielsgroen/claude-tmux) | TUI para gerenciar múltiplas sessões Claude Code no tmux |
| [Codeman](https://github.com/Ark0N/Codeman) | WebUI para Claude Code no tmux, auto-recovery, detecção de sessões ghost |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Lista curada de skills, hooks, plugins, agent orchestrators |
| [claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) | Padrões de automação com hooks |

#### MCP Servers para Assistente Pessoal

**Google Workspace:**

| Projeto | Serviços | Nota |
|---------|----------|------|
| [google-mcp-server (ngs)](https://github.com/ngs/google-mcp-server) | Calendar, Drive, Gmail, Sheets, Docs, Slides | OAuth, `claude mcp add` |
| [Workspace MCP](https://workspacemcp.com/) | 12 serviços, 100+ ferramentas | CLI dedicado |
| [google-calendar-mcp (nspady)](https://github.com/nspady/google-calendar-mcp) | Só Calendar | Multi-conta, conflitos, linguagem natural |
| [Hardened Google Workspace MCP](https://github.com/c0webster/hardened-google-workspace-mcp) | Gmail, Calendar, Docs | Fork focado em segurança |

**Messaging:**

| Projeto | Plataforma | Nota |
|---------|------------|------|
| [Plugin oficial Telegram](https://dev.to/czmilo/claude-code-telegram-plugin-complete-setup-guide-2026-3j0p) | Telegram | MCP server oficial, 6 passos |
| [claude-code-telegram](https://github.com/RichardAtCT/claude-code-telegram) | Telegram | Acesso remoto com sessão persistente |
| [mcp-telegram (antongsm)](https://github.com/antongsm/mcp-telegram) | Telegram | Envia da SUA conta pessoal via MTProto |
| [WhatsApp MCP](https://claudelog.com/claude-code-mcps/whatsapp-mcp/) | WhatsApp | Ler/buscar/enviar mensagens |
| **[Secure-OpenClaw](https://github.com/ComposioHQ/secure-openclaw)** | WhatsApp, Telegram, Signal, iMessage | 500+ apps, memória, reminders |

**Outros:** Playwright MCP (browser), filesystem MCP, web search MCP. Lazy loading reduz contexto em até 95%.

#### Modo Headless (Automação com Cron)

Claude Code tem flag `-p` / `--print` para rodar non-interactively:
```bash
# Exemplo: revisão diária de logs às 3h
0 3 * * * cd /app && claude -p "Review logs from last 24h" --allowedTools "Read" "Bash(curl *)"

# Briefing matinal às 7h
0 7 * * * claude -p "Check my email and calendar for today" --max-turns 10
```

Controles disponíveis: `--allowedTools`, `--max-turns`, `--max-budget-usd`, `--session-id` (multi-turn).

**Feature request aberto:** [Proactive scheduled hooks](https://github.com/anthropics/claude-code/issues/4785) — cron built-in nos hooks.

#### CLAUDE.md como Memória Persistente

- `~/.claude/CLAUDE.md` (global) > project-level > nested directories
- Carregado automaticamente a cada sessão
- Manter < 200 linhas
- Hooks `SessionStart` podem rodar scripts (ex: injetar data atual, contexto do dia)
- **Compliance ~70%** (não é determinístico como hooks)
- Custom slash commands: `.claude/commands/seu-comando.md`

#### Setup Completo Recomendado (Claude Code + VPS)
```
1. VPS (Hetzner/Vultr) $5-10/mês
2. Claude Max 5x ou 20x ($100-200/mês)
3. tmux (sessão persistente)
4. mosh (conexão resiliente)
5. Tailscale (rede privada segura)
6. MCP servers: Google Workspace, Telegram/WhatsApp, Playwright
7. CLAUDE.md com contexto pessoal + date scripts
8. Hooks: SessionStart (briefing), Stop (push notifications via ntfy)
9. Custom commands: /daily-briefing, /check-email, /schedule-meeting
10. Cron jobs com `claude -p` para tarefas proativas
11. Termius (iOS/Android) para acesso mobile
```

#### Acesso Mobile
- **Termius** (iOS/Android) — SSH client principal
- **Tailscale** — rede privada (sem expor VPS à internet)
- **Mosh** — conexão resiliente (WiFi instável não mata sessão)
- **ntfy** — push notifications quando Claude precisa de input
- Claude Code Remote Control (fev 2026) — mas requer máquina local

### Comparação Detalhada: Claude Code vs OpenClaw

| Dimensão | Claude Code + VPS | OpenClaw |
|----------|------------------|----------|
| Custo base | $20-200/mês (assinatura) | $0 (open source) |
| Custo API | Incluso na assinatura | $8-30/mês (paga por uso) |
| Interface principal | Terminal / SSH / Telegram bot | WhatsApp/Telegram/Slack/Web |
| Memória | Reseta entre sessões* | Persistente por semanas |
| Comportamento proativo | Cron + headless (setup manual) | Heartbeat scheduler built-in |
| Skills ecosystem | Custom commands + hooks + MCP | ClawHub: 5.700+ skills |
| Segurança | Sandboxing estrito, enterprise | Riscos (root access, credentials) |
| Multi-modelo | Claude only | Claude, GPT-4o, DeepSeek, Gemini, Ollama |
| Smart home / IoT | Não projetado | Skills nativas |
| Rate limits | SIM (problemático) | Não (paga por uso) |

*Pode usar `--session-id` ou arquivos para persistência parcial

### O Projeto Ponte: Secure-OpenClaw (Composio)

**Este é o mais promissor para unir os dois mundos:**
- Usa Claude Agent SDK por baixo
- Roda em WhatsApp/Telegram/Signal/iMessage
- Memória persistente + scheduled reminders
- 500+ integrações de apps via Composio
- Docker hardening + credential isolation
- Resolve os problemas de segurança do OpenClaw original
- GitHub: [ComposioHQ/secure-openclaw](https://github.com/ComposioHQ/secure-openclaw)

### Veredicto — Claude Code + VPS é Superior ao OpenClaw para Assistente Pessoal

Após análise aprofundada, **Claude Code + VPS + Max é a melhor abordagem para assistente pessoal (Jarvis)**. O OpenClaw perde em praticamente todos os critérios relevantes:

| Critério | Claude Code + VPS | OpenClaw |
|----------|------------------|----------|
| **Custo** | $0 extra (já paga Max + VPS) | $200-5.000/mês em API |
| **Qualidade do modelo** | Claude Opus/Sonnet direto | Roteia pra modelos baratos |
| **Segurança** | Sandboxing enterprise | Root access, credentials expostas |
| **Ecossistema** | MCP servers maduros | ClawHub 5.700+ skills (mas imaturo) |
| **Simplicidade** | `claude -p` + cron | Docker + ClawRouter + SecureClaw + multi-API |

**Onde o OpenClaw ainda leva vantagem (mas contornável):**

| Desvantagem do Claude Code | Solução |
|---------------------------|---------|
| Memória reseta entre sessões | CLAUDE.md + arquivos de contexto + `--session-id` |
| Sem skills prontas pra IoT | MCP servers cobrem 90% dos casos úteis |
| Rate limits com uso 24/7 | Uso de assistente pessoal (3-5h/dia) raramente bate no limite |
| Interface CLI | Telegram bot resolve (linuz90) |
| Single-model (Claude only) | Para assistente pessoal, Claude é suficiente |

**Caso de uso comercial:** Se montar um assistente pessoal para um executivo, a abordagem VPS + Claude Code é ideal — o cliente leva a assinatura Claude Pro/Max de brinde, é seguro, e o setup é replicável.

**Ranking final para assistente pessoal:**

1. **★ Claude Code + VPS + Max** — Melhor custo-benefício, seguro, simples
2. **Secure-OpenClaw (Composio)** — Ponte entre os dois mundos, se precisar de 500+ apps
3. **OpenClaw puro** — Só se não quiser construir nada e tiver budget sobrando

---

## 6. Assistente Pessoal vs Agentes Autônomos — Arquiteturas Diferentes

### A Distinção Fundamental

Nem todo agente de IA é igual. **Assistente pessoal (Jarvis)** e **agentes autônomos (prospectador, gerenciador de Instagram)** têm requisitos completamente diferentes:

| Requisito | Jarvis Pessoal | Agente Autônomo |
|-----------|---------------|-----------------|
| Disponibilidade | Quando você precisa (3-5h/dia) | 24/7 contínuo |
| Qualidade do modelo | Alta (decisões importantes) | Baixa/média (tarefas repetitivas) |
| Volume de requests | Moderado | Alto (milhares/dia) |
| Rate limits | Raramente um problema | **Problema crítico** |
| Descartável? | Não (é seu assistente principal) | Sim (pode criar e destruir) |
| Raciocínio complexo | Sim (planejamento, redação) | Parcial (scraping é mecânico, redação precisa de LLM) |

### Jarvis Pessoal → VPS + Claude Code + Max ★

**Já documentado na seção 5.** Resumo: Claude Code na VPS com tmux, cron, MCP servers, Telegram bot. Custo extra: R$0 (já paga Max + VPS).

### Agentes Autônomos → VPS + n8n + Claude API (Haiku/Sonnet)

Para agentes que rodam o dia todo (prospectador, gerenciador de redes sociais, monitor de oportunidades), a abordagem muda completamente.

**Por que NÃO usar Claude Code + Max para agentes autônomos:**
- Rate limits da assinatura Max não aguentam uso contínuo 24/7
- Agentes descartáveis não precisam de Opus-tier
- Custo por token (API) é mais previsível e escalável

**Por que NÃO usar OpenClaw:**
- Custo de $200-5.000/mês em API é absurdo
- Complexidade desnecessária (Docker + ClawRouter + SecureClaw)
- Segurança questionável para dados empresariais
- Você é dev — montar a solução é trivial e custa 100x menos

#### Arquitetura Recomendada: n8n + Claude API

```
┌─────────────────────────────────────────────────────┐
│                    VPS (mesma do Jarvis)              │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │              n8n (self-hosted)                │    │
│  │                                              │    │
│  │  Workflow: Prospectador                      │    │
│  │  ┌────────────────────────────────────────┐  │    │
│  │  │ 1. Cron: a cada hora                   │  │    │
│  │  │ 2. Google Maps API → lista empresas    │  │    │
│  │  │ 3. Para cada empresa:                  │  │    │
│  │  │    ┌──────────────────────────────┐    │  │    │
│  │  │    │ Claude API (Haiku $0.25/1M)  │    │  │    │
│  │  │    │ "Analise este site.          │    │  │    │
│  │  │    │  Entenda o que fazem.        │    │  │    │
│  │  │    │  Ache email/formulário."     │    │  │    │
│  │  │    └──────────────────────────────┘    │  │    │
│  │  │    ┌──────────────────────────────┐    │  │    │
│  │  │    │ Claude API (Sonnet $3/1M)    │    │  │    │
│  │  │    │ "Redija mensagem             │    │  │    │
│  │  │    │  personalizada oferecendo    │    │  │    │
│  │  │    │  plataforma de ensino IA."   │    │  │    │
│  │  │    └──────────────────────────────┘    │  │    │
│  │  │ 4. Envia email/formulário              │  │    │
│  │  │ 5. Salva no CRM (API)                  │  │    │
│  │  │ 6. Cron: checa respostas               │  │    │
│  │  │    ┌──────────────────────────────┐    │  │    │
│  │  │    │ Claude API (Haiku)           │    │  │    │
│  │  │    │ "Essa resposta é positiva?"  │    │  │    │
│  │  │    └──────────────────────────────┘    │  │    │
│  │  │ 7. Se sim → move pipeline CRM          │  │    │
│  │  │ 8. Notifica via ntfy/Telegram          │  │    │
│  │  └────────────────────────────────────────┘  │    │
│  │                                              │    │
│  │  Outros workflows possíveis:                 │    │
│  │  - Gerenciador de Instagram                  │    │
│  │  - Monitor de oportunidades                  │    │
│  │  - Founder bot (valida ideias)               │    │
│  │  - Atendimento ao cliente                    │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  Custo estimado: $10-30/mês (Haiku pra triagem,     │
│  Sonnet só pra redação personalizada)                │
└─────────────────────────────────────────────────────┘
```

**Custo estimado por agente autônomo:**

| Componente | Custo/mês |
|------------|-----------|
| n8n (self-hosted) | $0 (open source) |
| Claude Haiku API (triagem, 80% das calls) | $3-8 |
| Claude Sonnet API (redação, 20% das calls) | $5-15 |
| Google Maps API (se necessário) | $0-10 |
| **Total por agente** | **$8-33/mês** |

#### Alternativa: Claude Code Headless (para quem quer "manda e ele se vira")

Quando a tarefa exige raciocínio livre e não um workflow pré-definido, Claude Code headless com MCPs é mais adequado:

```bash
claude -p "Aqui está o contexto da minha empresa: [docs].
Aqui o CRM: [API]. Aqui o email: [credenciais].

Mapeie empresas do Morumbi com perfil XYZ.
Para cada uma, ache contato e envie msg personalizada.
Faça 10/hora. Cheque respostas a cada hora.
Se positiva, registre no CRM." \
  --allowedTools "mcp__google-maps__*,mcp__gmail__*,mcp__crm__*,Bash,Read,Write"
```

**Prós:** Zero setup de workflow. O Claude raciocina, planeja e executa autonomamente.
**Contras:** Pode "se perder" em tarefas longas. Rate limits do Max podem travar. Menos previsível que n8n.

#### Comparação Final: Agentes Autônomos

| Abordagem | "Se vira sozinho"? | Custo/mês | Confiabilidade | Escalável? |
|-----------|-------------------|-----------|----------------|------------|
| **n8n + Claude API** | Não (você monta o fluxo) | $10-30 | Alta (previsível) | Sim |
| **Claude Code headless** | Sim | $0 (Max) ou $50-100 (API) | Média | Limitada |
| **OpenClaw** | Sim (em teoria) | $200-5.000 | Baixa (imaturo) | Sim |

**Recomendação:** Para agentes em **produção** (prospectador real, gerenciador de Instagram), use **n8n + Claude API**. Para **experimentos** e tarefas pontuais ("veja o que consegue fazer"), use **Claude Code headless**.

### ★ Conclusão Geral: Duas Arquiteturas na Mesma VPS

```
┌──────────────────────────────────────────────────────────┐
│                 SUA VPS (Hostinger)                        │
│                                                           │
│  ┌─────────────────────┐  ┌────────────────────────────┐ │
│  │  JARVIS PESSOAL     │  │  AGENTES AUTÔNOMOS         │ │
│  │                     │  │                            │ │
│  │  Claude Code + Max  │  │  n8n + Claude API          │ │
│  │  tmux + cron        │  │  (Haiku/Sonnet)            │ │
│  │  Telegram bot       │  │                            │ │
│  │  MCP servers        │  │  - Prospectador            │ │
│  │                     │  │  - Instagram manager       │ │
│  │  Custo: R$0 extra   │  │  - Lead qualifier          │ │
│  │  (já paga Max+VPS)  │  │  - Monitor oportunidades   │ │
│  │                     │  │                            │ │
│  │  Uso: sob demanda   │  │  Custo: R$50-170/mês      │ │
│  │  (3-5h/dia)         │  │  (por agente, API)        │ │
│  │                     │  │                            │ │
│  │  Qualidade: Opus    │  │  Uso: 24/7 contínuo       │ │
│  │  (melhor possível)  │  │  Qualidade: Haiku/Sonnet  │ │
│  └─────────────────────┘  └────────────────────────────┘ │
│                                                           │
│  OpenClaw: NÃO recomendado para nenhum dos dois casos.   │
│  - Para Jarvis: Claude Code + Max é superior             │
│  - Para agentes: n8n + API é mais barato e confiável     │
│  - OpenClaw só faz sentido para quem não quer construir  │
│    nada e tem budget alto ($200-5.000/mês)               │
└──────────────────────────────────────────────────────────┘
```

---

## 7. Segurança da API DeepSeek — Análise Detalhada

### RISCOS CONFIRMADOS

#### Armazenamento na China
- Dados armazenados em servidores na China — sem opção de região alternativa
- Sujeito à Lei de Segurança de Dados (2021) e Lei de Inteligência Nacional (2017)
- Governo chinês pode legalmente exigir acesso aos dados sem notificar usuários
- **Sem prazo de retenção definido** — "as long as necessary"
- **Treina nos seus dados — SEM opção de opt-out** (diferente de OpenAI/Anthropic)
- Deletar chats NÃO garante remoção dos dados de treinamento

#### Coleta de Dados Extensiva
- Chat history e prompts
- Keystroke patterns/ritmos (biometria comportamental)
- Device identifiers, IP, carrier móvel
- Cookies, analytics de uso
- Arquivos uploadados

#### Falhas de Segurança Documentadas (Timeline)
- **Jan/2025 — Banco de dados exposto (Wiz):** 1M+ registros em ClickHouse público, sem autenticação (chat histories, API keys, tokens, logs internos)
- **Jan/2025 — DDoS massivo:** Forçou suspensão de novos cadastros
- **Fev/2025 — App iOS (NowSecure):** Dados transmitidos sem criptografia, chaves hardcoded
- **Fev/2025 — Código oculto (Feroot Security):** Transmissão para CMPassport.com (China Mobile, estatal)
- **Mar/2025 — Dados de treinamento vazados:** ~12.000 API keys e senhas reais encontradas nos dados de treino
- **CVE-2026-25253 (CVSS 8.8):** Cross-site WebSocket hijacking (patcheado)
- **Jailbreak (Cisco/Qualys):** 100% de sucesso — falhou em bloquear TODOS os prompts maliciosos
- **Pacotes falsos PyPI:** "deepseek" e "deepseekai" publicados para roubar credenciais
- **DeepSeek NÃO emitiu NENHUMA resposta pública** sobre qualquer incidente

#### Banimentos Governamentais
- **Itália:** Banido em 72 horas (jan/2025)
- **Austrália:** Banido de todos dispositivos governamentais (fev/2025)
- **EUA:** Banido pelo Pentágono, NASA, US Navy, Congresso, múltiplos estados
- **Taiwan:** Proibido em todo setor público e infraestrutura crítica
- **Coreia do Sul:** Ban temporário governamental
- **República Tcheca:** Banido da administração pública
- **Alemanha:** Pediu remoção das app stores
- **2026:** EU, Canadá, Coreia, Austrália, Índia emitiram restrições formais
- **13 jurisdições europeias** investigando
- EDPB criou Task Force de Enforcement de IA por causa do DeepSeek

### API vs App vs Local

| Aspecto | DeepSeek API | DeepSeek App | DeepSeek Local |
|---------|-------------|-------------|----------------|
| Dados vão pra China? | SIM | SIM | NÃO |
| Coleta keystroke? | Não | SIM | NÃO |
| Seguro? | Risco médio-alto | Risco alto | Risco baixo* |
| Privacidade | Prompts armazenados | Tudo coletado | Total |

*Rodar localmente elimina o envio de dados, mas as vulnerabilidades do modelo em si (jailbreak, censura embutida) permanecem.

### Comparação DeepSeek vs Providers Ocidentais

| Feature | DeepSeek | OpenAI | Anthropic |
|---------|----------|--------|-----------|
| Dados armazenados em | **China** | US/EU (GDPR) | US |
| Treina nos dados da API? | **Sim, sem opt-out** | Opt-out disponível | **Nunca** (por padrão) |
| Retenção | Indefinida | 30 dias (temp chats) | ~30 dias (abuse) |
| Garantia zero-training enterprise | Não | Sim | Sim |
| Risco governo | **Alto** (lei chinesa) | Moderado (CLOUD Act) | Moderado (CLOUD Act) |
| Resposta a incidentes | **Nenhuma** | Alta | Alta |
| Auditorias terceiros | Nenhuma | SOC 2 | SOC 2 |

### ALTERNATIVAS SEGURAS E BARATAS

| Provider | Preço/M tokens (in/out) | Privacidade | Compliance |
|----------|------------------------|-------------|------------|
| **Groq** (Llama 3/R1) | $0.05-0.99 | USA, boa | Em andamento |
| **Together.ai** (Llama 4) | $0.05-0.90 | USA, boa | SOC2 |
| **Fireworks.ai** | $0.10-3.00 | USA, excelente | **HIPAA + SOC2 Type II** |
| **Gemini Flash-Lite** | $0.075/0.30 | USA (Google) | Enterprise |
| **Mistral (via API)** | $0.02+ | **Europa (França)** | GDPR nativo |
| **Lumo (Proton)** | Variável | **Suíça** | Zero-access encryption |
| DeepSeek V3.2 | $0.28/0.42 | **China** | Nenhum |

**Nota:** Groq hospeda DeepSeek R1 em servidores US a $0.75/$0.99 por M tokens — mesmo modelo, dados nunca vão pra China.

### Recomendação para Quem Tem Medo da China
1. **Melhor opção:** Rodar DeepSeek **localmente** via Ollama — `ollama run deepseek-r1:8b` (dados nunca saem do PC)
2. **API barata + segura:** Groq ou Together.ai com Llama 4 Scout ($0.05-0.27/M tokens)
3. **DeepSeek R1 sem China:** Groq hospeda R1 em servidores US ($0.75-0.99/M)
4. **Máxima privacidade + barato:** Mistral via API (servidores na França, GDPR nativo)
5. **Privacidade máxima (Europa):** Lumo by Proton (Suíça, zero-access encryption)
6. **Compliance enterprise:** Fireworks.ai (HIPAA + SOC2)
7. **Hosted DeepSeek sem China:** Perplexity hospeda DeepSeek R1 em servidores US/EU

### NUNCA usar a API DeepSeek direta para:
- Dados pessoais de clientes
- Informações financeiras
- Dados médicos
- Comunicações confidenciais
- Qualquer dado sujeito a LGPD/GDPR

---

## 8. Caso de Uso "Jarvis para Leigos" — Recomendação Final

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

## 9. Implementação Pessoal: 3 Abordagens Avaliadas

### Contexto
Usuário já paga Claude Max ($100-200/mês), já tem VPS na Hostinger, quer assistente pessoal tipo OpenClaw mas usando a assinatura Claude.

### Abordagem A: Claude Web (este app) + Repo GitHub Privado

**Como funciona:**
- Repo privado no GitHub como "workspace" do assistente
- CLAUDE.md no repo com contexto pessoal, preferências, rotinas
- MCP servers (Google Workspace, etc.) conectados
- Interage pelo app web normalmente
- "Cron" via GitHub Actions (2000 min/mês grátis)

**Prós:**
- Zero infraestrutura extra
- Zero custo extra (já paga Max)
- Funciona agora, sem setup
- Interface rica (web, artifacts, arquivos)

**Contras:**
- Sem persistência de sessão (cada conversa reseta)
- Cron via GitHub Actions é gambiarra — não roda Claude diretamente, só prepara contexto e notifica
- Sem push notifications (você precisa abrir o app)
- Não é proativo — é on-demand

**Veredicto:** Bom como **canal secundário** para sessões complexas e longas (pesquisa, planejamento). Não serve como assistente proativo.

### Abordagem B: VPS (Hostinger) + Claude Code CLI + Interface Web/Telegram ★ RECOMENDADA

**Como funciona:**
- Claude Code instalado na VPS via `claude login` (usa assinatura Max)
- tmux mantém sessão persistente
- Crontab + `claude -p` para tarefas proativas (briefing, email check)
- Interface via uma das opções:
  - **[claude-telegram-bot](https://github.com/linuz90/claude-telegram-bot)** — bot Telegram bonito, usa assinatura, botões interativos ★ MAIS RÁPIDO
  - **[Codeman](https://github.com/Ark0N/Codeman)** — WebUI para gerenciar sessões tmux
  - **Interface web custom** — mais trabalho, mas 100% personalizada
- MCP servers para Google Workspace, WhatsApp, etc.
- Tailscale para rede privada segura
- ntfy para push notifications

**Setup na Hostinger (passo a passo conceitual):**
```bash
# 1. SSH na VPS
ssh user@sua-vps-hostinger

# 2. Instalar Claude Code
npm install -g @anthropic-ai/claude-code

# 3. Login (usa assinatura Max)
claude login

# 4. Instalar tmux + configurar
apt install tmux
tmux new-session -d -s claude

# 5. Configurar MCP servers
claude mcp add google-workspace -- npx @ngs/google-mcp-server
claude mcp add telegram -- npx @antongsm/mcp-telegram

# 6. Criar CLAUDE.md global
cat > ~/.claude/CLAUDE.md << 'EOF'
Você é meu assistente pessoal. Contexto:
- Meu nome: [nome]
- Fuso: America/Sao_Paulo
- Idioma: Português BR
- Email principal: [email]
- Prioridades: [suas prioridades]
EOF

# 7. Setup cron para briefing matinal
crontab -e
# 0 7 * * * cd ~/workspace && claude -p "Bom dia! Cheque meu email e calendário, me dê um resumo do dia." --allowedTools "Read" "mcp__google-workspace" > /tmp/briefing.txt && ntfy publish meu-canal "Briefing pronto"

# 8. Setup Telegram bot (opção mais rápida para interface bonita)
git clone https://github.com/linuz90/claude-telegram-bot
cd claude-telegram-bot && npm install
# Configurar .env com token do BotFather
npm start
```

**Prós:**
- ★ Cron nativo — proatividade real
- ★ Sempre disponível — VPS não dorme
- ★ Acesso mobile bonito via Telegram
- ★ Usa assinatura Max (sem custo de API)
- ★ VPS já paga (custo extra = zero)
- Push notifications via ntfy
- Sessão persiste via tmux

**Contras:**
- Setup inicial leva algumas horas
- `claude login` pode expirar (precisa renovar periodicamente)
- Rate limits da assinatura Max se aplicam
- VPS da Hostinger precisa ter RAM suficiente (Claude Code CLI consome ~200-500MB)

**Custo extra: R$0** (já tem VPS + Max)

**Veredicto:** Melhor relação custo-benefício-esforço. A VPS já existe, a assinatura já existe, o bot Telegram já existe como projeto open source. É só montar.

### Abordagem C: Notebook Local + Remote Control + Scheduled Tasks

**Como funciona:**
- Claude Code Remote Control no notebook pessoal
- Scheduled Tasks (feature nova) para tarefas proativas
- Rotina de energia para minimizar consumo quando ausente

**Rotina de energia recomendada:**
```
06:00 - Wake on Schedule (BIOS/Task Scheduler acorda o note)
06:01 - Claude roda briefing matinal via Scheduled Task
        ... dia todo: lid closed, monitor off, consumo ~5-15W ...
00:00 - Hibernate (zero consumo)
        ... noite: sem consumo, sem desgaste ...
06:00 - Ciclo repete
```

**Configurações de energia:**
- **Windows:** Configurações > Sistema > Energia > "Melhor eficiência energética" + hibernar após 6h de inatividade
- **macOS:** Power Nap habilitado (mantém rede ativa em sleep, ~1-3W)
- **Bateria:** Limitar carga a 80% (Lenovo Vantage / ASUS MyASUS / Dell Power Manager) para evitar degradação

**Prós:**
- Scheduled Tasks é feature oficial e nativa
- Sem VPS, sem infra externa
- Ambiente local completo (IDE, arquivos, tudo)
- Remote Control funciona do celular

**Contras:**
- Depende do note estar ligado (se hibernar, perde proatividade)
- 18h/dia de disponibilidade (vs 24h da VPS)
- Desgaste do hardware a longo prazo (ventoinhas, SSD)
- Se internet cair em casa, assistente fica offline
- Mais complexo gerenciar energia que simplesmente ter uma VPS

**Custo extra: R$5-15/mês de energia** (~15W x 18h/dia = 8.1 kWh/mês)

**Veredicto:** Funciona bem como **complemento** (quando quer IDE local + Remote Control), mas inferior à VPS como hub principal.

### ★ Recomendação Final: Abordagem B (VPS) como Hub + A e C como Complementos

```
┌─────────────────────────────────────────────────┐
│            ARQUITETURA RECOMENDADA               │
│                                                  │
│  ┌──────────────┐     ┌──────────────────────┐  │
│  │  VPS         │     │  Interfaces          │  │
│  │  Hostinger   │────▶│  - Telegram (mobile) │  │
│  │              │     │  - Termius (SSH)      │  │
│  │  Claude Code │     │  - Codeman (WebUI)   │  │
│  │  + tmux      │     └──────────────────────┘  │
│  │  + cron      │                                │
│  │  + MCP       │     ┌──────────────────────┐  │
│  │  + ntfy      │────▶│  Automação           │  │
│  └──────────────┘     │  - Cron briefings    │  │
│                       │  - Email checks      │  │
│  ┌──────────────┐     │  - Calendar alerts   │  │
│  │  Claude Web  │     └──────────────────────┘  │
│  │  (este app)  │                                │
│  │              │     ┌──────────────────────┐  │
│  │  Sessões     │     │  Repo GitHub Privado │  │
│  │  complexas   │────▶│  - CLAUDE.md         │  │
│  │  e longas    │     │  - Notas/contexto    │  │
│  └──────────────┘     │  - Workspace         │  │
│                       └──────────────────────┘  │
│  ┌──────────────┐                                │
│  │  Notebook    │     (Opcional)                 │
│  │  + Remote    │     Para quando quiser IDE     │
│  │  Control     │     local ou dev pesado        │
│  └──────────────┘                                │
│                                                  │
│  CUSTO TOTAL: R$0 extra (já paga Max + VPS)     │
└─────────────────────────────────────────────────┘
```

**Ordem de implementação:**
1. **Semana 1:** Setup Claude Code na VPS Hostinger + CLAUDE.md + primeiro cron (briefing matinal)
2. **Semana 2:** Adicionar Telegram bot + MCP Google Workspace + ntfy
3. **Semana 3:** Repo GitHub privado como workspace compartilhado
4. **Quando quiser:** Remote Control no note para sessões de dev

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
- [IAPP - DeepSeek and the China Data Question](https://iapp.org/news/a/deepseek-and-the-china-data-question-direct-collection-open-source-and-the-limits-of-extraterritorial-enforcement)
- [Wiz Research - Exposed DeepSeek Database](https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak)
- [DeepSeek Privacy Policy (Feb 2025)](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy-2025-02-14.html)
- [Theori - DeepSeek Security, Privacy, and Governance](https://theori.io/blog/deepseek-security-privacy-and-governance-hidden-risks-in-open-source-ai)
- [Qualys - DeepSeek Jailbreak Vulnerability](https://blog.qualys.com/vulnerabilities-threat-research/2025/01/31/deepseek-failed-over-half-of-the-jailbreak-tests-by-qualys-totalai)
- [Countries That Banned DeepSeek (Al Jazeera)](https://www.aljazeera.com/news/2025/2/6/which-countries-have-banned-deepseek-and-why)
- [Groq Pricing](https://groq.com/pricing)
- [Lumo by Proton - Privacy AI](https://captaincompliance.com/education/ai-platforms-for-2025-privacy-rankings/)
- [Best Local LLM Models 2026 - SitePoint](https://www.sitepoint.com/best-local-llm-models-2026/)
- [Best GPUs for Local LLM Inference 2026](https://corelab.tech/llmgpu/)
- [Used RTX 3090 Best Value for Local AI](https://www.xda-developers.com/used-rtx-3090-still-best-for-local-ai-in-value/)
- [eGPU Connection Speed Impact on LLM Inference](https://egpu.io/forums/pro-applications/impact-of-egpu-connection-speed-on-local-llm-inference-in-multi-egpu-setups/)
- [Claude Code Headless Mode](https://code.claude.com/docs/en/headless)
- [Claude Code Can Work While You Sleep](https://wmedia.es/en/tips/claude-code-headless-mode-autonomous-agent)
- [Claude Code + Google Workspace MCP](https://wow.pjh.is/journal/claude-code-google-workspace-mcp)
- [Claude Code Telegram Plugin Setup](https://dev.to/czmilo/claude-code-telegram-plugin-complete-setup-guide-2026-3j0p)
- [tmux + Tailscale + Termius + Claude Code](https://emreisik.dev/code-from-your-phone-like-a-boss-tmux-tailscale-termius-claude-code-developer-heaven-95119c704f20)
- [Claude Code Is Not a Coding Tool -- It's a Personal Assistant](https://newsletter.artofsaience.com/p/claude-code-is-not-a-coding-toolits)
- [How to Turn Claude Code Into Your Personal AI Assistant](https://www.theneuron.ai/explainer-articles/how-to-turn-claude-code-into-your-personal-ai-assistant/)
- [Claude Code Customization Guide](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)
- [Secure-OpenClaw (Composio)](https://github.com/ComposioHQ/secure-openclaw)
- [OpenClaw vs Claude Code (DataCamp)](https://www.datacamp.com/blog/openclaw-vs-claude-code)
- [Show HN: Claude Code as Personal Assistant](https://news.ycombinator.com/item?id=47220057)
- [Harper Reed on Claude Code Mobile](https://harper.blog/2026/01/05/claude-code-is-better-on-your-phone/)
- [Claude Code Pricing Guide](https://www.ksred.com/claude-code-pricing-guide-which-plan-actually-saves-you-money/)

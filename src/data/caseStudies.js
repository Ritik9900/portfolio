// Long-form system design case studies.
//
// Each section is a list of blocks:
//   { type: 'md', text }                         Markdown (tables, lists, code, links)
//   { type: 'diagram', name, caption }           Built-in SVG diagram (src/components/diagrams)
//   { type: 'image', src, alt, caption }         Your own exported diagram in public/ (PNG/SVG)
//   { type: 'decisions', items: [{ title, alternatives, why, cost }] }
//   { type: 'callout', text }                    Highlighted Markdown note
//
// Content is written for a public audience: no client-internal identifiers,
// credentials, or security findings.

export const caseStudies = [
  {
    slug: 'multimodal-rag-pipeline',
    title: 'Multimodal RAG Ingestion & Retrieval Pipeline',
    org: 'Ascendion',
    tagline:
      'Grounded, cited answers over enterprise SharePoint and Confluence content: multimodal ingestion, ' +
      '4-stage hybrid retrieval that lifted precision from ~68% to ~91%, and end-to-end LLM tracing.',
    subtitle:
      'A retrieval-augmented generation platform for question answering over enterprise knowledge bases — ' +
      'structure-aware multimodal ingestion, hybrid retrieval with cross-encoder reranking, and end-to-end ' +
      'LLM tracing with per-conversation cost attribution.',
    period: 'Dec 2025 — Present',
    role: 'GenAI Engineer',
    stack: ['FastAPI', 'LangGraph', 'PostgreSQL + pgvector', 'Azure OpenAI', 'IBM Docling', 'Cross-encoder reranker', 'Langfuse', 'Docker', 'Angular'],
    preview: 'RagArchitecture',
    facts: [
      { value: '68% → 91%', label: 'precision: hybrid + reranking vs semantic-only search' },
      { value: '300+', label: 'visual elements summarised per document by a VLM' },
      { value: '7', label: 'independently deployable services' },
      { value: '9', label: 'failure modes, each with a declared route' }
    ],
    tldr: [
      '**Problem:** enterprise knowledge in SharePoint and Confluence is authoritative but not queryable — you have to know which document holds the answer before you can search for it.',
      '**Architecture:** an offline ingestion plane and an online serving plane, each a LangGraph state machine, meeting at a single PostgreSQL + pgvector instance.',
      '**Outcome:** grounded, cited answers through 4-stage hybrid retrieval (dense + BM25 → RRF → cross-encoder) at ~91% precision versus ~68% for semantic-only search, crash-resumable ingestion, and per-conversation cost visibility through distributed tracing.'
    ],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'md',
            text: `
Large organisations keep operational knowledge in systems that were never designed to answer questions: SharePoint libraries, Confluence spaces, engineering drawings, maintenance manuals, spreadsheets and slide decks. The content is authoritative but effectively non-queryable — a field technician who needs a torque specification has to already know *which* document contains it before the search can even begin.

The platform turns that corpus into a conversational system. It continuously syncs source content, normalises every format into Markdown, chunks and embeds it, and answers natural-language questions with responses grounded in — and cited back to — the source documents.

What it had to get right:

- **Grounding over fluency.** Answers come only from retrieved content, and citations resolve to human-readable document names so they're actionable rather than decorative.
- **Mixed content.** Tables, spreadsheets and diagrams carry much of the answer surface. They can't be flattened into prose and lost.
- **Exact identifiers.** Part numbers, error codes and site IDs must match exactly — the query class where pure embedding search is weakest.
- **Unattended operation.** Ingestion runs on a schedule against external APIs; a failure must never leave half-written state visible to search.
- **Cost visibility.** Every answer spends model tokens, so spend has to be attributable per conversation.
`
          }
        ]
      },
      {
        id: 'architecture',
        title: 'Architecture',
        blocks: [
          {
            type: 'md',
            text: `
The system splits into two planes with opposite performance goals. The **ingestion plane** is offline, batch and throughput-bound; the **serving plane** is online, per-request and latency-bound. They meet at a single PostgreSQL instance that is simultaneously the metadata store, the document store, the vector index and the response cache — the defining trade-off of the design (see [design decisions](#decisions)).
`
          },
          {
            type: 'diagram',
            name: 'RagArchitecture',
            caption:
              'End-to-end architecture. Solid arrows carry control and data flow; dashed arrows are datastore interactions. The ingestion plane writes chunks and vectors; the serving plane reads them.'
          },
          {
            type: 'md',
            text: `
| Service | Stack | Responsibility |
|---|---|---|
| Retrieval service | FastAPI, LangGraph | Hybrid retrieval, fusion, reranking, answer synthesis |
| Orchestrator | FastAPI, SQLAlchemy | Authentication, chat sessions, turn history, system prompts |
| Admin API | FastAPI, Alembic | Source discovery and schema ownership |
| Batch processor | FastAPI, scheduler | Source sync, blob staging, content hashing |
| Ingestion pipeline | FastAPI, LangGraph, Docling | Parse, summarise images, chunk, embed |
| Chat UI | Angular, Nginx | End-user conversational client |
| Admin UI | Angular, Nginx | Administrative console |

Service boundaries follow real axes of change and scaling rather than arbitrary decomposition. Ingestion is CPU- and memory-heavy and scales with corpus churn; retrieval is latency-sensitive and scales with query volume; the orchestrator is I/O-bound and holds session state; the batch processor is scheduled and must run as a singleton. Each deploys, scales and fails independently, and every Python service ships as a multi-stage Docker image running as a non-root user.
`
          }
        ]
      },
      {
        id: 'ingestion',
        title: 'Ingestion: from document to vector',
        blocks: [
          {
            type: 'md',
            text: `
### Acquisition

The batch processor is the only component allowed to touch source systems. It downloads pending items through Microsoft Graph or the Confluence REST API and stages the raw bytes in blob storage. Three properties are deliberate:

- **Content-addressed change detection.** Every download is SHA-256 hashed and the hash column is \`UNIQUE\`, so re-publishing an unchanged file can't create a duplicate.
- **Single writer by advisory lock.** A PostgreSQL session-level advisory lock provides mutual exclusion across replicas. The database is already a hard dependency, so co-locating the lock there removes a failure domain instead of adding a lock service.
- **Status as the hand-off.** Discovery, staging and ingestion communicate only through each document's status column.

### Parsing and multimodal assembly

IBM Docling converts PDF, DOCX, PPTX and XLSX into Markdown with accurate table-structure recovery. That's the right trade for a technical corpus where the answer often sits *inside* a table — a mis-recovered table silently corrupts every chunk derived from it. Confluence HTML takes its own parser path.

Images aren't discarded. Each is downscaled and summarised by a GPT-4o vision model with a retrieval-oriented prompt, then spliced back into the text as an image-reference block that keeps the source URL. A question about a schematic returns both a description *and* a link to the artefact. If the vision model's circuit breaker is open, the image degrades to a placeholder and the document still ingests — text is worth more than image summaries.

### Structure-aware chunking

A fixed-window splitter cuts tables in half and separates image summaries from their context. The chunker instead:

1. Wraps bare Markdown tables in protected blocks, splitting oversized tables into sub-tables that **repeat the header row**, so each fragment is interpretable on its own.
2. Lifts tables, image references and speaker notes out as placeholders, so they're never split or partially consumed by an overlap window.
3. Splits on H1–H3 headings, so document structure becomes chunk structure.
4. Splits oversized sections semantically — a new chunk starts where adjacent-sentence embedding similarity drops below a threshold — with a recursive separator cascade as the fallback.
5. Applies overlap between neighbouring chunks, then re-inserts the protected blocks as atomic units.

**Spreadsheets take a different path: one chunk per row, each carrying the header.** A 500-row asset register embedded as a handful of large blocks yields vectors that all mean roughly "a table of assets". Embedded per row, it yields 500 distinct semantic fingerprints, and exact-lookup questions go from merely plausible to retrievable.

| Parameter | Value | Rationale |
|---|---|---|
| Chunk size | 800 chars (~200 tokens) | Eight reranked chunks fit comfortably in context, while a paragraph's argument stays intact |
| Overlap | 100 chars | Preserves sentences that straddle a boundary, at a 12.5% storage and embedding premium |
| Largest atomic table | 2,000 chars | Tables up to 2.5× the chunk size stay whole; larger ones split with header repetition |
| Semantic split threshold | 0.75 cosine | Topic-shift boundary; a candidate for tuning against an evaluation set |
| Embeddings | text-embedding-3-large → 1024-d | Matryoshka truncation: 3× less storage and ANN cost for a small quality loss |

### Crash-resumable by design
`
          },
          {
            type: 'diagram',
            name: 'RagLifecycle',
            caption:
              'Document lifecycle. The status column is a finite-state machine; after a crash, a document re-enters the pipeline at the node that matches its persisted status.'
          },
          {
            type: 'md',
            text: `
Resumability doesn't come from a workflow engine's checkpoint store — **the database row is the checkpoint.** A crash between chunking and embedding costs exactly one embedding pass on restart rather than a full re-conversion. For a large scanned PDF, that's the difference between seconds and minutes.

Every write stage follows the same pattern inside **one transaction**: purge the document's previous chunks and vectors, insert the new ones, advance the status. A re-run produces the same end state as a first run, and a mid-flight crash never leaves a partial chunk set visible to retrieval.
`
          }
        ]
      },
      {
        id: 'retrieval',
        title: 'Retrieval and answer synthesis',
        blocks: [
          {
            type: 'md',
            text: `
The read path is a second LangGraph state machine: query rewriting, query embedding, a semantic-cache probe, then — on a cache miss — dense and sparse retrieval as a **parallel superstep** that fans back in at fusion, followed by reranking, context assembly with citations, and answer generation.

### Why hybrid

Dense retrieval fails predictably on part numbers, error codes, acronyms and site identifiers — tokens the embedding model never learned — while BM25 matches them exactly. BM25 fails on paraphrase ("how do I safely isolate the feeder?" when the document says "de-energisation procedure"), which is exactly where embeddings shine. The two failure modes are close to orthogonal, and that's the precondition for fusion to pay off.

- **Dense leg:** pgvector HNSW index over cosine distance, top 10. The \`ORDER BY … LIMIT\` query shape is what pgvector's planner turns into an index scan.
- **Sparse leg:** BM25 over chunk text, top 10, with a cached index rebuilt only when a cheap corpus fingerprint changes.

### Reciprocal Rank Fusion
`
          },
          {
            type: 'callout',
            text: '`RRF(d) = Σ 1 / (k + rankᵢ(d))` over *i* ∈ {dense, sparse}, with *k* = 60'
          },
          {
            type: 'md',
            text: `
RRF is rank-based, and that's the point: cosine similarity in [0, 1] and an unbounded BM25 score aren't commensurable, and any normalisation (min-max, z-score) bakes in a distribution assumption that shifts with every corpus update. With *k* = 60 and ten results per leg, contributions only span 1/61 to 1/70 — about 13% — so fusion behaves almost like a set union. That's intentional: it maximises recall into the reranker, the component actually qualified to discriminate. If one leg fails, fusion simply proceeds over the survivor.

### Reranking

A \`ms-marco-MiniLM-L-6-v2\` cross-encoder scores each (query, chunk) pair and keeps the top 8. Three operational details matter more than the model choice:

- The weights are **baked into the Docker image at build time** and the runtime keeps the Hugging Face hub offline, so serving never depends on an external model registry.
- The model is **preloaded at startup**, so the first user doesn't pay the multi-second load.
- It's wrapped in a circuit breaker and **degrades to fused order** on failure. Reranking is an enhancement, not a dependency.

### Synthesis

The synthesis prompt encodes behaviour learned from real usage rather than a generic "answer from context":

- It **authorises reasoning over the context** — ranking, arithmetic, aggregation — while forbidding outside facts. Without this, a grounded model refuses "which site had the highest spend?" because the ranking isn't stated verbatim.
- It **surfaces image URLs**, and a pre-processor rephrases "show me the diagram" into an information-extraction request, because the model otherwise refuses on the grounds that it can't render images.
- Follow-up turns use a separate prompt that treats conversation history as a source for **reference resolution only**, never as a source of facts.

Generation runs at temperature 0.2 on an Azure-hosted GPT-4o-class model. A semantic response cache short-circuits the whole pipeline when a new query sits within cosine 0.97 of a previous one.
`
          }
        ]
      },
      {
        id: 'resilience',
        title: 'Designed to degrade, not fail',
        blocks: [
          {
            type: 'md',
            text: `
Retry policy lives in one retry-handler node rather than in \`try/except\` blocks scattered across call sites, and every failure mode has a declared route through the graph. Failure behaviour becomes an inspectable artefact — an integration test asserts against the graph topology itself, a test that can't be written against a call stack.

| Failing component | Mechanism | Observable outcome |
|---|---|---|
| Query embedding | Breaker + retry node | Up to 3 retries with exponential backoff, then a clean error |
| Dense leg only | Leg-local catch | BM25-only answer |
| Sparse leg only | Leg-local catch | Vector-only answer |
| Both legs | Typed error | Explicit "both searches failed" response |
| Reranker | Breaker + bypass | Top-8 fused results used unranked |
| Semantic cache | Catch, log, continue | Treated as a cache miss |
| Answer synthesis | Breaker + retry, then template | "Temporarily unable" message, flagged as templated |
| Vision model (ingestion) | Breaker + placeholder | Document ingests without the image summary |
| Embedding (ingestion) | Breaker, no fallback | Document fails and later resumes from its last status |
`
          },
          {
            type: 'callout',
            text: 'The asymmetry is deliberate: **ingestion fails a document rather than store a wrong vector, while retrieval degrades rather than return nothing.** Bad data in the index is permanent; a degraded answer is not.'
          }
        ]
      },
      {
        id: 'observability',
        title: 'Observability and cost attribution',
        blocks: [
          {
            type: 'md',
            text: `
The orchestrator opens a root Langfuse trace and forwards its ID to the retrieval service in a request header. The retrieval pipeline opens a span beneath it and every graph node opens a child span. LLM calls are recorded as *generations* carrying model and token usage, so Langfuse computes cost — per-conversation model spend becomes a first-class, attributable metric.

Node spans record the decision-relevant metadata needed to debug a bad answer after the fact: cache similarity, per-leg result counts, whether reranking was skipped, and truncated chunk previews. A parallel structured-logging layer carries a correlation ID through middleware.

Instrumentation is applied with decorators rather than edited into each node, so the 14-node ingestion graph gained full tracing without changes to node implementations. Two production bugs — broken exception handling inside Python context managers, and a missing trace-ID hop — had been silently disabling tracing; fixing them restored end-to-end visibility.

The trace structure also turns "the answer was wrong" into a triage procedure. Was the right chunk returned by either retrieval leg? If not, it's a retrieval failure (chunking, embedding, top-k). Was it dropped by the reranker? That's a ranking failure. Was it in the context but absent from the answer? That's a generation failure (prompt, context order, model). Three classes, three opposite fixes.
`
          }
        ]
      },
      {
        id: 'decisions',
        title: 'Key design decisions',
        blocks: [
          {
            type: 'decisions',
            items: [
              {
                title: 'PostgreSQL + pgvector instead of a dedicated vector database',
                alternatives: 'Pinecone · Milvus / Weaviate · Elasticsearch / OpenSearch',
                why: 'Ingestion deletes old chunks, inserts new ones and advances the document status in one transaction. With an external vector store that becomes a distributed transaction — two-phase commit, or a reconciliation job to repair windows where the two stores disagree. Co-locating vectors with metadata deletes that whole class of bug, and at 10⁵–10⁶ chunks, HNSW in pgvector is not the bottleneck.',
                cost: 'OLTP and ANN workloads share one instance, so a heavy ingestion window can affect query latency, and past ~10⁷ vectors index build time and memory become limiting. The escalation path is read replicas, then partitioning by knowledge base, and only then a dedicated engine. OpenSearch was the strongest alternative — it would also solve sparse retrieval — at the price of a second stateful system and losing ACID between metadata and vectors.'
              },
              {
                title: 'LangGraph for both pipelines',
                alternatives: 'LangChain LCEL chains · Airflow / Prefect · hand-rolled control flow',
                why: 'A chain is a pipe; it can\'t naturally express "on failure, route to a shared retry node, re-enter with backoff, and after n attempts route to an error node" — and that control flow is the primary requirement. Airflow would add a scheduler, web server and metadata database to orchestrate what is fundamentally a per-row loop whose resumability the status FSM already provides. A declared topology is inspectable and testable.',
                cost: 'A framework dependency for features (checkpointer, human-in-the-loop, streaming) the system doesn\'t use; a small hand-written state machine would carry no framework risk. The graph, not the call stack, becomes the unit of reasoning.'
              },
              {
                title: 'Hybrid retrieval with rank-based fusion',
                alternatives: 'Dense-only retrieval · score-normalised fusion · learned fusion',
                why: 'Dense and sparse retrieval fail on different query classes (paraphrase vs exact identifiers). RRF needs neither score normalisation nor training data, so it works from day one and stays stable as the corpus changes.',
                cost: 'Two retrieval legs to operate, and both legs weighted equally until an evaluation set exists to fit a weighted RRF.'
              },
              {
                title: '1024-dimensional embeddings via Matryoshka truncation',
                alternatives: 'Full 3072-dimensional vectors',
                why: 'Three times less vector storage (≈4 GB instead of 12 GB at 10⁶ chunks, before index overhead) and roughly three times cheaper HNSW memory and distance computation, for a small degradation on published benchmarks.',
                cost: 'Dimensionality is baked into the schema, so changing it is a migration, not a configuration change — and the quality loss should be validated on this corpus rather than taken on faith.'
              },
              {
                title: 'Local cross-encoder instead of a hosted rerank API',
                alternatives: 'Cohere Rerank · a hosted rerank endpoint',
                why: 'No per-call cost, no network hop inside the critical path, no third-party exposure of enterprise document text, and no extra rate limit to manage. For an internal tool where confidentiality matters, that is the right trade.',
                cost: 'CPU in the API pod, a ~1 GB heavier image, a torch dependency inside a web service, and a model weaker than current commercial rerankers. The device setting already anticipates GPU as the escape hatch.'
              }
            ]
          }
        ]
      },
      {
        id: 'scaling',
        title: 'Latency and scaling',
        blocks: [
          {
            type: 'md',
            text: `
Estimated latency budget for a cache-miss query at around 10⁵ chunks. These are **analytical estimates** derived from code paths and configuration — a budget to validate with load tests, not measurements.

| Stage | Estimate | Scaling behaviour |
|---|---|---|
| Query embedding | 50–150 ms | Constant — network and provider queueing |
| Semantic cache probe | 10–40 ms | Grows with cache size |
| Dense search (HNSW) | 5–20 ms | Sub-linear in corpus size |
| Sparse search (BM25) | 30–80 ms | Linear in corpus size |
| RRF fusion | < 1 ms | Constant — at most 20 items |
| Cross-encoder rerank | 300–900 ms | Independent of corpus size; CPU-bound |
| Answer generation | 1.5–4 s | Dominated by LLM decoding |
| **Total (p50)** | **≈ 2.0–5.2 s** | |

Roughly 75–80% of wall-clock time is the synthesis LLM, so micro-optimising retrieval buys almost nothing today. **The real latency lever is streaming**: it moves perceived latency from seconds to a few hundred milliseconds of time-to-first-token.

The table also shows where the design stops holding. The in-process BM25 index and the cache probe both grow linearly with corpus size and cross over the LLM term somewhere around 10⁶ chunks. The scaling path, in order of return:

1. **Move sparse retrieval into PostgreSQL.** A generated \`tsvector\` column with a GIN index makes memory O(1) in corpus size and keeps the index transactionally fresh. \`ts_rank_cd\` isn't BM25, so this ships only after an offline relevance comparison — or uses a true-BM25 extension such as ParadeDB.
2. **Index the semantic cache** with HNSW so probes stay sub-linear as it fills.
3. **Extract the reranker** into its own batching service on GPU, or export it to ONNX with int8 quantisation (typically 2–4× faster on CPU), so retrieval pods stay small and stateless.
4. **Add read replicas** for retrieval and keep ingestion writes on the primary.
5. **Partition by knowledge base** with per-partition HNSW indexes at 100× scale, and put a queue between batch processing and ingestion so ingestion scales by adding consumers.
`
          }
        ]
      },
      {
        id: 'retrospective',
        title: 'What I would do differently',
        blocks: [
          {
            type: 'md',
            text: `
- **Make evaluation a CI gate, not a one-off.** Correctness tests (chunker idempotency, status transitions, graceful degradation) aren't relevance tests. A golden set of real questions with expert-labelled chunks — Recall@k, nDCG and LLM-judged faithfulness on every change to chunking, embeddings or fusion — turns each tuning parameter here (chunk size, split threshold, *k*, top-*n*, the cache threshold) from a plausible default into a measured choice.
- **Treat throttling as flow control, not failure.** Provider 429s shouldn't count toward a circuit breaker. Classify them separately from 5xx, honour \`Retry-After\`, add full jitter to backoff, and admit requests against a shared token bucket — otherwise synchronised retries during a traffic spike can turn throttling into a self-sustaining outage.
- **Metrics, not just traces.** Tracing explains one bad answer; it doesn't alert on a gradual decline. Per-node latency histograms, breaker-state transitions, cache hit ratio and the rate of templated fallback answers belong on a dashboard with alerts.
- **Async end to end.** The workload is dominated by multi-second waits on LLM calls; an async retrieval path raises achievable concurrency per pod by roughly an order of magnitude over a thread pool.
`
          }
        ]
      }
    ]
  },

  {
    slug: 'ivr-validation-platform',
    title: 'AI-Powered IVR Validation Platform',
    org: 'Ascendion',
    tagline:
      'Places real phone calls to an IVR, drives the conversation with a speech-to-speech AI caller, and ' +
      'produces auditable evidence for every call.',
    subtitle:
      'An AI voice-testing platform that dials an IVR over the public phone network, plays an improvising synthetic customer ' +
      'through a speech-to-speech model, and records a stereo WAV, an aligned transcript, health counters, ' +
      'LLM-judged quality scores and a cost report for every call.',
    period: 'Dec 2025 — Present',
    role: 'GenAI Engineer',
    stack: ['FastAPI · asyncio', 'Twilio Voice + Media Streams', 'Gemini Live (speech-to-speech)', 'NumPy DSP', 'PostgreSQL', 'Azure Blob Storage', 'DeepEval + Azure OpenAI'],
    preview: 'IvrArchitecture',
    facts: [
      { value: '$0.126', label: 'measured cost of a 3-minute test call' },
      { value: '1.2 s', label: 'end-of-speech threshold, set from measured IVR pauses' },
      { value: '$6.50', label: 'per 50-scenario regression run against live phone systems' },
      { value: '4', label: 'concurrent calls — a hard, deliberate ceiling' }
    ],
    tldr: [
      '**Problem:** IVRs fail in the telephony layer — 8 kHz codec speech recognition, endpointing, barge-in, DTMF — which a test suite that posts JSON at a dialogue API never touches.',
      '**Architecture:** one asyncio process bridges Twilio Media Streams to a speech-to-speech model playing an improvising caller, with both legs recorded to separate stereo channels.',
      '**Outcome:** an auditable evidence bundle per call — recording, aligned transcript, health block, judge scores with reasons, and cost — at about $0.13 per scenario.'
    ],
    sections: [
      {
        id: 'problem',
        title: 'The problem',
        blocks: [
          {
            type: 'md',
            text: `
Interactive voice response systems fail in places a text-based test harness structurally can't reach. The failure surface lives in the telephony layer: speech recognition degraded by a G.711 µ-law codec at 8 kHz, end-of-speech detection against prompts with long internal pauses, barge-in and turn-taking races, DTMF fallback paths, jitter and packet loss. A suite that posts JSON at a dialogue API validates none of it.

The harness places **real outbound phone calls** to the IVR under test and drives a full conversation with a synthetic caller. The core premise is that **the caller must improvise rather than replay.** A scripted DTMF walk only exercises the path its author anticipated. A generative caller answers whatever it's asked, presses keys when speech is refused, waits when told to hold and rephrases when misunderstood — so it walks paths nobody wrote down, which is where real defects live.

One test run is one real phone call:

1. Twilio dials the IVR's real number over the PSTN.
2. Twilio streams the call audio to the harness over a bidirectional WebSocket.
3. The harness bridges that audio to Gemini Live, a speech-to-speech model playing a customer who follows a test-case scenario.
4. Everything is captured: stereo WAV, transcript, health counters, cost.
5. After the call — never during it — DeepEval scores the conversation with an Azure OpenAI judge.
`
          }
        ]
      },
      {
        id: 'architecture',
        title: 'Architecture',
        blocks: [
          {
            type: 'md',
            text: `
Everything inside the harness runs on **one event loop in one OS process**. That keeps in-flight call state coherent without a distributed store, and it's also why concurrency has a hard ceiling (see [concurrency](#concurrency)).
`
          },
          {
            type: 'diagram',
            name: 'IvrArchitecture',
            caption:
              'End-to-end architecture. Solid arrows are the live-call critical path; dashed arrows sit off it (dialling, persistence, post-call scoring).'
          },
          {
            type: 'md',
            text: `
| Leg | Codec / rate | Framing |
|---|---|---|
| Twilio Media Stream (both directions) | G.711 µ-law, 8 kHz mono | 160 bytes = 20 ms, base64 in JSON |
| Model input (uplink) | PCM16, 16 kHz | Continuous stream |
| Model output (downlink) | PCM16, 24 kHz | Streamed chunks |
| Recording | PCM16, 8 kHz **stereo** | Left = IVR, right = synthetic caller |

Three sample rates meet here, and every conversion is hand-written, vectorised NumPy: \`audioop\` was removed from the standard library in Python 3.13, and a subprocess per call is untenable on the critical path. DTMF tones are synthesised directly as dual-frequency sine pairs rather than through Twilio's \`<Play digits>\` verb, which requires a call redirect that would tear down the very media stream the bridge is using.

The recording is stereo so that talk-over is acoustically visible. **Per-channel speech time in that WAV has been the ground truth for the most serious defects found so far** — transcripts actively concealed two of the three worst, and both initially looked like IVR faults.
`
          }
        ]
      },
      {
        id: 'bridge',
        title: 'The call bridge',
        blocks: [
          {
            type: 'md',
            text: `
The bridge isn't a request/response loop. It's four concurrent asyncio tasks racing on \`FIRST_COMPLETED\`:

- **Uplink** — decode µ-law, feed the recorder, advance the voice-activity clock, resample 8 → 16 kHz, forward to the model.
- **Downlink** — consume model events (both transcriptions, interruptions, turn completion, audio, usage, tool calls) and re-encode audio into 160-byte µ-law frames.
- **Idle watchdog** — detect the mutual-silence deadlock.
- **Hang-up** — an event set by the model's hang-up tool or by the far end.

Whichever task completes first *is* the reason the call ended, and that reason is recorded verbatim, including any exception type. A call that stops without an explanation can't be triaged after the fact.

### Lifecycle details that matter

- The Twilio SDK is blocking, so dialling runs in a worker thread; calling it inline would stall the loop that is pumping a 20 ms frame for every other live call.
- A dial watchdog fails the call if the stream doesn't connect within 90 s, and queries Twilio's alert log so the error names the real cause instead of "timeout".
- On teardown, transcript, recording, health block and cost are persisted *before* the socket closes. A call that dropped mid-conversation still yields its partial evidence — often the most interesting evidence there is.
- If a WebSocket arrives for a call the process doesn't know about (a restart between dial and answer), the call is rehydrated from its persisted definition instead of being rejected.
`
          }
        ]
      },
      {
        id: 'turn-taking',
        title: 'Turn-taking: the hardest part',
        blocks: [
          {
            type: 'md',
            text: `
An IVR is not a cooperative conversational partner. It delivers long monologues with internal pauses and never yields politely. Five settings encode that reality, and **every one of them exists because a real phone call failed**:

| Setting | Value | Why |
|---|---|---|
| Activity handling | No interruption | The default cancels the caller's in-flight reply the moment the IVR resumes speaking. The transcript still shows the reply but the audio is discarded, so the IVR hears silence and reprompts — invisible in the transcript, visible only in the recording. |
| Turn coverage | Include all input | With no-interruption alone, audio that arrives while the model's own turn is open is discarded, not queued. An IVR answer starting ~0.4 s after a filler word vanished, and both ends sat in silence until the timeout. |
| End-of-speech silence | 1,200 ms | Measured IVR pauses run 0.4–1.3 s mid-prompt versus 4–13 s at the end of a prompt. |
| Speech sensitivity | Low | Suppresses false triggers on hold music and line noise. |
| Context compression | Sliding window | A call streams audio continuously, so context fills even in silence. Without compression the session terminates — indistinguishable from the model going deaf mid-call. |

### Dialogue actions as tools

Three functions are exposed to the model:

- **\`send_dtmf(digits)\`** — tones synthesised into the media stream (180 ms tone, 80 ms gap). The prompt scopes it to keypad-only menus, or menus where speaking has already failed twice, because the speech path is what's under test.
- **\`hold_the_line(waiting_for)\`** — the load-bearing one. A real caller waits silently through "let me look that up", but prose instructions couldn't produce that. Wording that framed not-speaking as an option made the model emit turns with transcription and no audio; forbidding filler made it reach for its closing line and hang up three seconds after asking the question. **A tool turns waiting from an absence the model has to reason its way into, into an action it can take.**
- **\`hang_up(reason)\`** — guarded. If the IVR's recent speech matches a "still working" pattern (*one moment, let me check, please hold…*), the hang-up is refused and the model is pointed at the move it should have made. The refusal is capped at two, so a wrongly matched phrase can't trap the call: the guard is a safety net, not a veto.

### Building the transcript

Input and output transcriptions arrive as independent delta streams that interleave arbitrarily, so the turn-closing rule is asymmetric. A caller delta closes an open IVR turn, but an IVR delta does **not** close an open caller turn — only the model's own turn-completion signal does. Getting this backwards truncates the caller mid-utterance and files the rest as a separate, out-of-order turn: a transcript implying an exchange that never happened.
`
          }
        ]
      },
      {
        id: 'failures',
        title: 'Failure handling',
        blocks: [
          {
            type: 'md',
            text: `
Several failures make the *harness* look like the IVR is broken. The guiding principle: divergence between what the caller intended and what actually reached the line is treated as a harness fault by default — and **stalled calls are excluded from scoring**, because a stall says nothing about the IVR.

| Failure | Detection | Response |
|---|---|---|
| Mutual-silence deadlock | Idle watchdog, 1 Hz | Nudge at 20 s of true silence (up to twice), force-close at 45 s; flagged and excluded from scoring |
| Premature hang-up | Pattern match on recent IVR speech | Refused up to twice, with an instruction to hold the line |
| Turn with text but no audio | Byte count at turn end | Re-prompt the model (up to 4×), optional TTS backstop, then an explicit warning in the transcript |
| Model session closed by server | Receive loop returns | Call ends with that reason recorded, instead of spinning on a dead socket |
| Stream never connects | Dial watchdog, 90 s | Call fails with the actual Twilio error, not "timeout" |
| Runaway call | \`asyncio.wait_for\` | Hard 420 s cap, recorded as a harness timeout |
| Call answered after a stop | Cancel-requested guard | Stream refused and the call hung up |

The silence clock advances only on **real audio** — including the harness's own, stamped forward to the end of playout — so escalation measures genuine silence rather than time since the last nudge. Before dialling, scenario text is also **linted** for wording empirically shown to induce silent turns (*say nothing*, *stay silent*…): static analysis of a prompt, treated as the source code it effectively is.
`
          }
        ]
      },
      {
        id: 'latency',
        title: 'Latency is a correctness metric',
        blocks: [
          {
            type: 'md',
            text: `
In conversational voice, latency isn't a quality-of-service number. Respond too early and you clip a prompt that hadn't finished; respond too late and the IVR reprompts or times out. The dominant term in this system's round trip is therefore a deliberate choice.
`
          },
          {
            type: 'diagram',
            name: 'IvrLatency',
            caption:
              'Time from the IVR\'s last audible word to the caller\'s first audio on the line. The endpointing segment comes from configuration; the other segments are engineering estimates, not instrumented measurements.'
          },
          {
            type: 'md',
            text: `
| Stage | Contribution | Source |
|---|---|---|
| Uplink transport + Twilio jitter buffer | 40–80 ms | Estimate |
| **End-of-speech detection** | **1,200 ms** | **Configured** |
| Model inference → first audio | 300–600 ms | Estimate |
| Resample + µ-law encode + framing | 10–30 ms | Measured class |
| Downlink transport + playout buffer | 40–100 ms | Estimate |
| **Typical perceived round trip** | **1.6–2.0 s** | |

Roughly 62% of the round trip is the configured end-of-speech threshold. A consumer-assistant value of 400–700 ms would fire *inside* the IVR's mid-prompt pauses: the caller would talk over an unfinished prompt, the no-interruption policy would discard that audio, the IVR would reprompt — and the report would blame the IVR. **For a validation harness, trading correctness for latency is strictly the wrong direction.** Lowering it safely needs per-IVR pause telemetry and a semantic end-of-turn signal, since "press one for" is incomplete no matter how long the pause.
`
          }
        ]
      },
      {
        id: 'concurrency',
        title: 'Concurrency model',
        blocks: [
          {
            type: 'md',
            text: `
- **Two-level admission control.** A per-run semaphore enforces what a run requested; a process-wide semaphore enforces what the deployment can sustain — a hard ceiling of 4 that configuration may only *lower*. Raising it requires the audio bridge to be measured under load, not a config change.
- **One semaphore bounds two quotas.** Twilio's concurrent-channel limit and the model provider's concurrent-session limit are independent, but each is consumed exactly 1:1 per call for the call's entire lifetime. A single semaphore over "calls in flight" therefore bounds both.
- **Rate is separate from concurrency.** At concurrency above 1, every task acquired its permit in the same instant — dials were measured 5 ms apart despite a 2 s configured gap. A serialised dial gate, held *across* the dial, is what actually spaces them.
- **Permits are time-bounded.** A call that never reaches a terminal state would otherwise pin its permit forever; four such calls would wedge every future run.
- **Cancellation is race-aware.** A stop reaches calls already connected, calls still ringing, and calls whose dial was in flight when the stop landed.

### Nothing blocks the loop

One synchronous call on the event loop blocks the audio pump for every concurrent call at once — heard on the line as choppy audio. Every blocking dependency is pushed off the loop:

| Operation | Mechanism |
|---|---|
| Twilio REST (dial, fetch, hang up) | \`asyncio.to_thread\` |
| PostgreSQL | \`asyncio.to_thread\` + guard, so a database hiccup never drops a live call |
| Blob upload | \`asyncio.to_thread\`, WAV handed over from memory |
| Post-call judging | Detached task + thread |

The residual risk is CPU: µ-law conversion, resampling and DTMF synthesis run inline, but they're vectorised NumPy over 160-byte frames — microseconds per frame. That's acceptable at four calls, and it's exactly what to measure before raising the cap.
`
          }
        ]
      },
      {
        id: 'evaluation',
        title: 'Post-call evaluation',
        blocks: [
          {
            type: 'md',
            text: `
Scoring runs as a detached task after the call is marked done, because judge round-trips take longer than the rest of teardown and must never delay a result. Seven metrics are catalogued — conversation completeness, knowledge retention, role adherence, conversation accuracy, per-turn quality, tonality and safety — each with a tunable threshold per IVR.

- **Bundled judging.** Accuracy, tonality and safety are scored against the same transcript with the same parameters, so they're folded into one judge call that reuses the framework's own prompt builders to keep semantics identical — with automatic fallback to per-metric scoring if the combined response doesn't parse.
- **Config snapshotting.** Each IVR's active metric set and role description are captured at dial time, so a settings change mid-run can't shift the rubric under a call that's already in flight.
- **Serialised where it must be.** The evaluation framework keeps a module-level singleton and prints judge prompts, transcripts included, to stdout. Evaluation is serialised behind a lock with stdout redirected — confirmed by reproduction rather than assumed.
- **Cancelled calls aren't scored.** A stopped call's transcript ends wherever the hang-up landed; a low score there would be a verdict the call never earned.
`
          }
        ]
      },
      {
        id: 'cost',
        title: 'Cost',
        blocks: [
          {
            type: 'md',
            text: `
Cost is accounted per modality from provider usage metadata, priced from a versioned table that records its source and check date, and cross-checked against an independent per-minute estimate. Twilio's actual price is fetched once rating completes.

| Component | Measured cost, 3-minute call |
|---|---|
| Model input audio | $0.0506 |
| Model input text | $0.0126 |
| Model output audio | $0.0069 |
| Twilio | $0.0560 |
| **Total** | **$0.126** |

**Input audio dominates** because the uplink streams continuously — including the silence while the IVR looks something up. That's the economic case for the idle watchdog: a stalled call is the most expensive failure there is, billing both Twilio and the model for dead air. At roughly $0.13 per scenario, a 50-scenario nightly regression suite costs about $6.50.
`
          }
        ]
      },
      {
        id: 'decisions',
        title: 'Key design decisions',
        blocks: [
          {
            type: 'decisions',
            items: [
              {
                title: 'Twilio Media Streams instead of running a SIP stack',
                alternatives: 'SIP trunk + FreeSWITCH / Asterisk · Vonage · Amazon Chime SDK',
                why: 'Raw bidirectional audio over a WebSocket, without operating an SBC, an RTP stack, NAT traversal or codec negotiation. The entire telephony surface reduces to one JSON-over-WebSocket protocol — the difference between a team-sized project and a component.',
                cost: 'Per-minute billing and an extra network hop compared with native RTP.'
              },
              {
                title: 'A speech-to-speech model instead of an ASR → LLM → TTS cascade',
                alternatives: 'Cascaded pipeline · scripted DTMF walk',
                why: 'A cascade serialises three round trips per turn and discards prosody at every boundary; on top of a 1.2 s endpointing floor there\'s no budget for another 600–900 ms. Decisively, improvisation is the product requirement, and a scripted caller can\'t improvise.',
                cost: 'Per-stage observability: "the recogniser couldn\'t hear it" and "the IVR said the wrong thing" now sit inside one black box, recovered only indirectly through the stereo recording and health counters. Also determinism, and the ability to swap the recogniser on its own.'
              },
              {
                title: 'An LLM judge instead of string assertions',
                alternatives: 'Hand-written assertions · human review only',
                why: 'The caller improvises, so there is no fixed expected string to assert against. Goal attainment over a free-form conversation is genuinely a judgement.',
                cost: 'Scores aren\'t bit-reproducible across reruns. That\'s disclosed rather than papered over, and every score ships with written reasons instead of a bare pass/fail.'
              },
              {
                title: 'One process, one event loop',
                alternatives: 'Celery workers · multiple processes with a shared state store',
                why: 'Native ASGI WebSockets and asyncio fit an I/O-bound audio pump, and in-process call state stays coherent with no distributed coordination.',
                cost: 'A hard ceiling on concurrency, accepted knowingly rather than discovered. The path past it: the worker that accepts a call\'s WebSocket owns the whole call, with the database as the run ledger and a lease to prevent double-dialling.'
              }
            ]
          }
        ]
      },
      {
        id: 'lessons',
        title: 'Lessons and next steps',
        blocks: [
          {
            type: 'md',
            text: `
Several of the hardest bugs were prompt bugs rather than code bugs — behaviour that was locally plausible and globally wrong, and that failed silently. Three lessons generalise:

- **Prefer tools over instructions for behaviour.** If a model must do something reliably, give it an affordance for it rather than a rule about it. \`hold_the_line\` fixed what no amount of prompt wording could.
- **Put deterministic, bounded guards around non-deterministic behaviour.** The hang-up guard refuses at most twice, so a misfiring safety net degrades gracefully instead of becoming a new failure mode.
- **Keep the raw evidence.** The stereo recording caught defects that the transcript actively hid.

Next, in priority order:

1. **Instrument the latency budget** — spans at frame receipt, endpoint decision and first byte on the wire, so the estimates above become measurements.
2. **Break the single-process ceiling** and lift the cap of 4 to whatever provider quotas allow.
3. **A recorded-IVR replay harness** for prompt changes — fixed audio in, assertions on the caller's tool calls and utterances — so editing the caller prompt runs in CI instead of on the phone.
4. **Phrase-list biasing** from each test case's identity block (names, member IDs, dates): the tokens most likely to be misrecognised and most consequential when they are.
`
          }
        ]
      }
    ]
  }
]

export function findCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug)
}

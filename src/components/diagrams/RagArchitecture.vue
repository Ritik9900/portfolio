<template>
  <svg class="dg" viewBox="0 0 960 600" role="img" :aria-labelledby="`${id}-t ${id}-d`">
    <title :id="`${id}-t`">Multimodal RAG pipeline architecture</title>
    <desc :id="`${id}-d`">
      Ingestion plane: SharePoint and Confluence sources flow through a batch processor, blob staging, the Docling parser,
      a vision-model image summariser, a structure-aware chunker and an embedding model, writing chunks and vectors to
      PostgreSQL with pgvector. Serving plane: the chat UI calls the orchestrator, then query rewriting, query embedding and
      a semantic cache. On a cache hit the cached answer is returned. On a miss, dense and sparse search run in parallel,
      are fused with reciprocal rank fusion, reranked by a cross-encoder, assembled with citations and answered by the LLM.
    </desc>
    <DgMarkers :id="id" />

    <!-- Ingestion plane -->
    <rect class="dg-group ingest" x="8" y="8" width="944" height="176" rx="10" />
    <text class="dg-group-label" x="24" y="32">INGESTION PLANE · OFFLINE, THROUGHPUT-BOUND</text>

    <DgNode :x="24" :y="56" :h="80" title="Sources" :subs="['SharePoint', 'Confluence']" tone="edge" />
    <DgNode :x="156" :y="56" :h="80" title="Batch processor" :subs="['SHA-256 hash', 'advisory lock']" />
    <DgNode :x="288" :y="56" :h="80" title="Blob staging" :subs="['raw documents']" />
    <DgNode :x="420" :y="56" :h="80" title="Docling parser" :subs="['PDF · DOCX · PPTX', 'XLSX · HTML']" />
    <DgNode :x="552" :y="56" :h="80" title="VLM summariser" :subs="['GPT-4o vision']" tone="ai" />
    <DgNode :x="684" :y="56" :h="80" title="Chunker" :subs="['structure-aware', '800 / 100 chars']" />
    <DgNode :x="816" :y="56" :h="80" title="Embeddings" :subs="['3-large · 1024-d']" tone="ai" />

    <path v-for="x in [140, 272, 404, 536, 668, 800]" :key="x" class="dg-line" :d="`M${x},96 H${x + 16}`" :marker-end="arrow" />

    <path class="dg-line dashed" d="M214,136 V210" :marker-end="arrow" />
    <text class="dg-edge-label" x="222" y="164">document rows</text>
    <path class="dg-line" d="M742,136 V210" :marker-end="arrow" />
    <text class="dg-edge-label" x="750" y="164">chunks</text>
    <path class="dg-line" d="M874,136 V210" :marker-end="arrow" />
    <text class="dg-edge-label" x="882" y="164">vectors</text>

    <!-- Shared store -->
    <DgNode
      :x="24" :y="210" :w="908" :h="60" tone="store"
      title="PostgreSQL 16 + pgvector"
      :subs="['documents (lifecycle state machine) · chunks · HNSW vector index · semantic response cache']"
    />

    <!-- Serving plane -->
    <rect class="dg-group serve" x="8" y="296" width="944" height="296" rx="10" />
    <text class="dg-group-label" x="24" y="320">SERVING PLANE · ONLINE, LATENCY-BOUND</text>

    <path class="dg-line dashed" d="M610,270 V336" :marker-start="arrow" :marker-end="arrow" />
    <text class="dg-edge-label" x="618" y="306">probe · write-back</text>

    <DgNode :x="24" :y="336" title="Chat UI" :subs="['Angular']" />
    <DgNode :x="156" :y="336" title="Orchestrator" :subs="['auth · sessions', 'turn history']" />
    <DgNode :x="288" :y="336" title="Query rewriter" :subs="['history-aware']" />
    <DgNode :x="420" :y="336" title="Query embedder" :subs="['1024-d']" tone="ai" />
    <DgNode :x="552" :y="336" title="Semantic cache" :subs="['cosine ≥ 0.97']" />
    <DgNode :x="816" :y="336" title="Response" :subs="['answer · citations', 'token usage']" tone="accent" />

    <path v-for="x in [140, 272, 404, 536]" :key="`r${x}`" class="dg-line" :d="`M${x},368 H${x + 16}`" :marker-end="arrow" />

    <path class="dg-line dashed accent" d="M668,368 H816" :marker-end="arrowAccent" />
    <text class="dg-edge-label" x="742" y="360" text-anchor="middle">cache hit</text>

    <!-- Cache miss: parallel fan-out -->
    <path class="dg-line" d="M610,400 V420 H36 V538 H56" :marker-end="arrow" />
    <path class="dg-line" d="M36,470 H56" :marker-end="arrow" />
    <text class="dg-edge-label" x="330" y="414" text-anchor="middle">cache miss · parallel fan-out</text>

    <DgNode :x="56" :y="444" :w="144" :h="52" title="Dense search" :subs="['pgvector HNSW · top 10']" />
    <DgNode :x="56" :y="512" :w="144" :h="52" title="Sparse search" :subs="['BM25 · top 10']" />
    <DgNode :x="232" :y="444" :h="120" title="RRF fusion" :subs="['k = 60']" />
    <DgNode :x="384" :y="472" :w="124" title="Cross-encoder" :subs="['MiniLM-L6 · top 8']" />
    <DgNode :x="540" :y="472" :w="124" title="Context builder" :subs="['doc-name citations']" />
    <DgNode :x="696" :y="472" :w="140" title="Answer synthesis" :subs="['GPT-4o-class · T 0.2']" tone="ai" />

    <path class="dg-line" d="M200,470 H232" :marker-end="arrow" />
    <path class="dg-line" d="M200,538 H232" :marker-end="arrow" />
    <path class="dg-line" d="M348,504 H384" :marker-end="arrow" />
    <path class="dg-line" d="M508,504 H540" :marker-end="arrow" />
    <path class="dg-line" d="M664,504 H696" :marker-end="arrow" />
    <path class="dg-line" d="M836,504 H880 V400" :marker-end="arrow" />
  </svg>
</template>

<script setup>
import { useId } from 'vue'
import DgNode from './DgNode.vue'
import DgMarkers from './DgMarkers.vue'
import './diagram.css'

const id = useId()
const arrow = `url(#${id}-arrow)`
const arrowAccent = `url(#${id}-arrow-accent)`
</script>

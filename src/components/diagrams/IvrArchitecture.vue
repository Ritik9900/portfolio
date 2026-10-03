<template>
  <svg class="dg" viewBox="0 0 980 556" role="img" :aria-labelledby="`${id}-t ${id}-d`">
    <title :id="`${id}-t`">IVR validation harness architecture</title>
    <desc :id="`${id}-d`">
      The IVR under test connects over the phone network to Twilio Voice. Twilio streams call audio over a WebSocket to the
      harness, a single process with one event loop. Inside it, a run orchestrator dials calls and enforces concurrency;
      the WebSocket handler passes 20 millisecond frames to the call bridge, which talks to Gemini Live, a speech-to-speech
      model. A NumPy audio module converts codecs and sample rates and feeds a stereo recorder. Recordings go to Azure Blob
      Storage; transcripts and costs go to PostgreSQL, where a detached DeepEval judge scores each call afterwards.
    </desc>
    <DgMarkers :id="id" />

    <!-- Harness boundary -->
    <rect class="dg-group boundary" x="318" y="12" width="440" height="420" rx="10" />
    <text class="dg-group-label" x="334" y="36">HARNESS · ONE PROCESS, ONE EVENT LOOP</text>

    <!-- Telephony edge -->
    <DgNode :x="16" :y="196" :w="120" :h="72" title="IVR under test" :subs="['real PSTN number']" tone="edge" />
    <DgNode :x="164" :y="196" :w="130" :h="72" title="Twilio Voice" :subs="['PSTN origination', 'Media Streams']" tone="edge" />
    <path class="dg-line" d="M136,232 H164" :marker-start="arrow" :marker-end="arrow" />
    <text class="dg-edge-label" x="150" y="222" text-anchor="middle">PSTN</text>
    <path class="dg-line" d="M294,232 H334" :marker-start="arrow" :marker-end="arrow" />
    <text class="dg-edge-label" x="314" y="222" text-anchor="middle">WSS</text>

    <!-- Harness internals -->
    <DgNode :x="530" :y="52" :w="212" :h="64" title="Run orchestrator" :subs="['semaphores · dial gate', 'watchdogs · cancellation']" />
    <path class="dg-line dashed" d="M530,84 H229 V196" :marker-end="arrow" />
    <text class="dg-edge-label" x="380" y="76" text-anchor="middle">REST dial · TwiML &lt;Stream&gt;</text>

    <DgNode :x="334" :y="196" :w="150" :h="72" title="FastAPI WebSocket" :subs="['µ-law · 8 kHz', '160 B / 20 ms frames']" />
    <DgNode :x="530" :y="180" :w="212" :h="104" title="Call bridge" :subs="['uplink · downlink', 'idle watchdog · hang-up', 'turn-taking · tool calls']" tone="accent" />
    <DgNode :x="334" :y="332" :w="150" :h="72" title="Audio DSP (NumPy)" :subs="['µ-law ↔ PCM16', '8 / 16 / 24 kHz · DTMF']" />
    <DgNode :x="530" :y="332" :w="100" :h="72" title="Recorder" :subs="['stereo WAV', 'L IVR · R caller']" />
    <DgNode :x="642" :y="332" :w="100" :h="72" title="Transcript" :subs="['health block', 'token cost']" />

    <path class="dg-line" d="M636,116 V180" :marker-end="arrow" />
    <path class="dg-line" d="M484,232 H530" :marker-start="arrow" :marker-end="arrow" />
    <text class="dg-edge-label" x="507" y="222" text-anchor="middle">frames</text>
    <path class="dg-line" d="M409,268 V332" :marker-start="arrow" :marker-end="arrow" />
    <path class="dg-line" d="M484,368 H530" :marker-end="arrow" />
    <path class="dg-line" d="M692,284 V332" :marker-end="arrow" />

    <!-- AI provider -->
    <DgNode :x="790" :y="180" :w="174" :h="104" title="Gemini Live" :subs="['speech-to-speech', 'server-side VAD', 'function calling']" tone="ai" />
    <path class="dg-line" d="M742,232 H790" :marker-start="arrow" :marker-end="arrow" />
    <text class="dg-edge-label" x="766" y="222" text-anchor="middle">PCM16</text>

    <!-- Persistence and scoring (off the critical path) -->
    <DgNode :x="500" :y="468" :w="160" :h="64" title="Azure Blob Storage" :subs="['stereo recordings']" tone="store" />
    <DgNode :x="676" :y="468" :w="150" :h="64" title="PostgreSQL" :subs="['runs · calls · costs']" tone="store" />
    <DgNode :x="850" :y="468" :w="120" :h="64" title="DeepEval judge" :subs="['Azure OpenAI', 'post-call, detached']" tone="ai" dashed />

    <path class="dg-line dashed" d="M580,404 V468" :marker-end="arrow" />
    <path class="dg-line dashed" d="M692,404 V468" :marker-end="arrow" />
    <path class="dg-line dashed" d="M826,500 H850" :marker-start="arrow" :marker-end="arrow" />

    <!-- Legend -->
    <g class="legend" transform="translate(16 330)">
      <g v-for="(item, i) in legend" :key="item.label" :transform="`translate(0 ${i * 24})`">
        <rect width="14" height="14" rx="3" :class="['swatch', item.tone]" />
        <text x="22" y="11" class="dg-edge-label">{{ item.label }}</text>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { useId } from 'vue'
import DgNode from './DgNode.vue'
import DgMarkers from './DgMarkers.vue'
import './diagram.css'

const id = useId()
const arrow = `url(#${id}-arrow)`

const legend = [
  { label: 'Telephony edge', tone: 'edge' },
  { label: 'Harness process', tone: 'harness' },
  { label: 'AI provider', tone: 'ai' },
  { label: 'Persistence', tone: 'store' }
]
</script>

<style scoped>
.swatch {
  stroke-width: 1;
}
.swatch.edge {
  fill: var(--dg-edge);
  stroke: var(--dg-edge-b);
}
.swatch.harness {
  fill: var(--dg-node);
  stroke: var(--border-strong);
}
.swatch.ai {
  fill: var(--dg-ai);
  stroke: var(--dg-ai-b);
}
.swatch.store {
  fill: var(--dg-store);
  stroke: var(--dg-store-b);
}
</style>

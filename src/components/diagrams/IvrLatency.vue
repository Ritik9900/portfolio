<template>
  <svg class="dg" viewBox="0 0 960 236" role="img" :aria-labelledby="`${id}-t ${id}-d`">
    <title :id="`${id}-t`">Round-trip latency decomposition</title>
    <desc :id="`${id}-d`">
      As configured with 1,200 ms end-of-speech detection, the round trip is about 1.93 seconds, of which endpointing is
      1,200 ms. A consumer-style 500 ms threshold would give about 1.23 seconds, but was rejected because it fires inside
      the IVR's mid-prompt pauses. Other segments: uplink 80 ms, model inference 520 ms, codec and framing 30 ms, downlink
      100 ms, all estimates.
    </desc>

    <!-- Grid + axis -->
    <g v-for="t in ticks" :key="t">
      <line :x1="sx(t)" :x2="sx(t)" y1="24" y2="160" class="grid" />
      <text :x="sx(t)" y="178" text-anchor="middle" class="dg-edge-label">{{ (t / 1000).toFixed(1) }} s</text>
    </g>

    <g v-for="(row, r) in rows" :key="row.label" :transform="`translate(0 ${40 + r * 66})`">
      <text x="0" y="16" class="row-label">{{ row.label }}</text>
      <text x="0" y="31" class="dg-edge-label">{{ row.sub }}</text>

      <g v-for="seg in layout(row.segments)" :key="seg.name">
        <title>{{ seg.name }}: {{ seg.ms.toLocaleString() }} ms ({{ seg.source }})</title>
        <rect :x="seg.x" y="0" :width="seg.w" height="36" :rx="seg.rx" :class="seg.key ? 'seg-key' : 'seg'" />
        <text v-if="seg.inline" :x="seg.x + seg.w / 2" y="22" text-anchor="middle" :class="seg.key ? 'seg-key-label' : 'seg-label'">
          {{ seg.inline }}
        </text>
      </g>
      <text :x="sx(total(row.segments)) + 10" y="23" class="total">≈ {{ (total(row.segments) / 1000).toFixed(2) }} s</text>
    </g>

    <!-- Legend -->
    <g transform="translate(200 206)">
      <rect width="12" height="12" rx="3" class="seg-key" />
      <text x="20" y="10" class="dg-edge-label">End-of-speech detection (configured)</text>
      <rect x="250" width="12" height="12" rx="3" class="seg" />
      <text x="270" y="10" class="dg-edge-label">Transport, inference, codec (estimated)</text>
    </g>
  </svg>
</template>

<script setup>
import { useId } from 'vue'
import './diagram.css'

const id = useId()

const X0 = 200
const X1 = 880
const MAX = 2000
const GAP = 2
const sx = (ms) => X0 + (ms / MAX) * (X1 - X0)
const ticks = [0, 500, 1000, 1500, 2000]

const common = (endpointing) => [
  { name: 'Uplink transport + jitter buffer', ms: 80, source: 'estimate' },
  { name: 'End-of-speech detection', ms: endpointing, source: 'configured', key: true, inline: `endpointing · ${endpointing.toLocaleString()} ms` },
  { name: 'Model inference to first audio', ms: 520, source: 'estimate', inline: 'inference' },
  { name: 'Resample + µ-law + framing', ms: 30, source: 'measured class' },
  { name: 'Downlink transport + playout buffer', ms: 100, source: 'estimate' }
]

const rows = [
  { label: 'As configured', sub: '1,200 ms endpointing', segments: common(1200) },
  { label: 'Consumer-assistant style', sub: '500 ms endpointing · rejected', segments: common(500) }
]

const total = (segs) => segs.reduce((a, s) => a + s.ms, 0)

// Stack segments left to right with a 2px surface gap; round only the outer ends.
function layout(segs) {
  let acc = 0
  return segs.map((s, i) => {
    const x = sx(acc)
    acc += s.ms
    const w = Math.max(1, sx(acc) - x - (i < segs.length - 1 ? GAP : 0))
    return { ...s, x, w, rx: i === 0 || i === segs.length - 1 ? 3 : 1 }
  })
}
</script>

<style scoped>
.grid {
  stroke: var(--border);
  stroke-width: 1;
}

.row-label {
  font-size: 12.5px;
  font-weight: 600;
}

.seg {
  fill: var(--dg-muted-fill);
}

.seg-key {
  fill: var(--dg-accent);
}

.dg .seg-label {
  font-size: 11px;
  fill: var(--text);
}

.dg .seg-key-label {
  font-size: 11.5px;
  font-weight: 600;
  fill: var(--dg-on-accent);
}

.total {
  font-size: 12.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>

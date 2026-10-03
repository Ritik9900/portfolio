<template>
  <svg class="dg" viewBox="0 0 960 316" role="img" :aria-labelledby="`${id}-t ${id}-d`">
    <title :id="`${id}-t`">Document lifecycle state machine</title>
    <desc :id="`${id}-d`">
      Documents move from TO BE ADDED to TO BE INGESTED when staged to blob storage, to CHUNKED after parsing and chunking,
      to EMBEDDED after embedding, and to INGESTED when marked complete. An admin request moves an ingested document to
      TO BE DELETED, and a cascade purge moves it to DELETED. A document that exhausts its retries moves to FAILED, a
      dead-letter state. After a restart, a document re-enters the pipeline at the node matching its persisted status.
    </desc>
    <DgMarkers :id="id" />

    <!-- Resume entry -->
    <DgNode :x="330" :y="12" :w="300" :h="52" title="On restart: route by persisted status" :subs="['re-enter at the matching pipeline node']" tone="accent" dashed />
    <path class="dg-line dashed accent" d="M420,64 C420,96 357,96 357,128" :marker-end="arrowAccent" />
    <path class="dg-line dashed accent" d="M520,64 C520,96 603,96 603,128" :marker-end="arrowAccent" />
    <path class="dg-line dashed accent" d="M600,64 C600,100 849,92 849,128" :marker-end="arrowAccent" />

    <!-- Happy path -->
    <DgNode :x="36" :y="128" :w="150" :h="52" title="TO BE ADDED" mono />
    <DgNode :x="282" :y="128" :w="150" :h="52" title="TO BE INGESTED" mono />
    <DgNode :x="528" :y="128" :w="150" :h="52" title="CHUNKED" mono />
    <DgNode :x="774" :y="128" :w="150" :h="52" title="EMBEDDED" mono />

    <path class="dg-line" d="M186,154 H282" :marker-end="arrow" />
    <text class="dg-edge-label" x="234" y="146" text-anchor="middle">staged to blob</text>
    <path class="dg-line" d="M432,154 H528" :marker-end="arrow" />
    <text class="dg-edge-label" x="480" y="146" text-anchor="middle">parse + chunk</text>
    <path class="dg-line" d="M678,154 H774" :marker-end="arrow" />
    <text class="dg-edge-label" x="726" y="146" text-anchor="middle">embed</text>

    <!-- Terminal and removal states -->
    <DgNode :x="36" :y="248" :w="150" :h="52" title="FAILED" :subs="['dead letter']" tone="edge" mono />
    <DgNode :x="282" :y="248" :w="150" :h="52" title="DELETED" mono />
    <DgNode :x="528" :y="248" :w="150" :h="52" title="TO BE DELETED" mono />
    <DgNode :x="774" :y="248" :w="150" :h="52" title="INGESTED" tone="ai" mono />

    <path class="dg-line" d="M849,180 V248" :marker-end="arrow" />
    <text class="dg-edge-label" x="857" y="218">mark ingested</text>
    <path class="dg-line" d="M774,274 H678" :marker-end="arrow" />
    <text class="dg-edge-label" x="726" y="266" text-anchor="middle">admin request</text>
    <path class="dg-line" d="M528,274 H432" :marker-end="arrow" />
    <text class="dg-edge-label" x="480" y="266" text-anchor="middle">cascade purge</text>
    <path class="dg-line" d="M320,180 C320,216 111,212 111,248" :marker-end="arrow" />
    <text class="dg-edge-label" x="232" y="236" text-anchor="middle">retries exhausted</text>
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

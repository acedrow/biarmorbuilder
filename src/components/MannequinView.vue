<script setup>
import { computed } from 'vue'
import { ARMOR_SLOTS, SLOT_PARTS, getOptionImage, getOptionLabel, hasArmor } from '../data/armorData.js'

const props = defineProps({
  selections: { type: Object, required: true },
  selectedSlot: { type: String, required: true },
})

const emit = defineEmits(['remove-all'])

const headImage = computed(() => getOptionImage('head', props.selections.head))

function pieceLabel(slotId) {
  if (hasArmor(slotId, props.selections)) {
    return getOptionLabel(slotId, props.selections[slotId])
  }
  return 'None'
}
</script>

<template>
  <section class="mannequin">
    <div class="figure">
      <svg class="outline" viewBox="0 0 120 280" aria-hidden="true">
        <template v-for="slot in ARMOR_SLOTS" :key="slot.id">
          <template v-for="(shape, i) in SLOT_PARTS[slot.id].shapes" :key="`${slot.id}-${i}`">
            <circle
              v-if="shape.type === 'circle'"
              :cx="shape.cx"
              :cy="shape.cy"
              :r="shape.r"
              class="shape"
              :class="{
                highlighted: selectedSlot === slot.id && hasArmor(slot.id, selections),
                equipped: hasArmor(slot.id, selections) && selectedSlot !== slot.id,
                dimmed: selectedSlot && selectedSlot !== slot.id && !hasArmor(slot.id, selections),
              }"
            />
            <rect
              v-else
              :x="shape.x"
              :y="shape.y"
              :width="shape.width"
              :height="shape.height"
              :rx="shape.rx"
              class="shape"
              :class="{
                highlighted: selectedSlot === slot.id && hasArmor(slot.id, selections),
                equipped: hasArmor(slot.id, selections) && selectedSlot !== slot.id,
                dimmed: selectedSlot && selectedSlot !== slot.id && !hasArmor(slot.id, selections),
              }"
            />
          </template>
        </template>
        <image
          v-if="headImage"
          :href="headImage"
          x="38"
          y="6"
          width="44"
          height="44"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
      <ul class="slot-labels">
        <li v-for="slot in ARMOR_SLOTS" :key="slot.id" class="slot-label">
          <span class="slot">{{ slot.label }}:</span>
          <span class="piece" :class="{ equipped: hasArmor(slot.id, selections) }">
            {{ pieceLabel(slot.id) }}
          </span>
        </li>
      </ul>
    </div>
    <button type="button" class="remove-all-btn" @click="emit('remove-all')">Remove all</button>
  </section>
</template>

<style scoped>
.mannequin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 100%;
  width: 100%;
  padding: 24px;
}

.figure {
  display: grid;
  grid-template-columns: 160px max-content;
  column-gap: 24px;
  align-items: start;
}

.outline {
  width: 160px;
  height: auto;
  grid-row: 1;
}

.slot-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100%;
  grid-row: 1;
  font-size: 13px;
}

.slot-label {
  display: flex;
  gap: 4px;
  white-space: nowrap;
}

.slot {
  color: var(--text-muted);
}

.piece {
  color: var(--text-muted);
}

.piece.equipped {
  color: var(--text-h);
}

.remove-all-btn {
  margin-top: auto;
  padding: 10px 14px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 6px;
  background: transparent;
  color: #ef4444;
  font: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.remove-all-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
  color: #f87171;
}

.shape {
  fill: none;
  stroke: var(--mannequin-stroke);
  stroke-width: 2;
  transition:
    fill 0.15s,
    stroke 0.15s,
    opacity 0.15s;
}

.shape.dimmed {
  opacity: 0.35;
}

.shape.equipped {
  fill: rgba(201, 162, 39, 0.06);
  stroke: rgba(201, 162, 39, 0.55);
  stroke-width: 2;
  opacity: 1;
}

.shape.highlighted {
  fill: var(--accent-bg);
  stroke: var(--accent);
  stroke-width: 2.5;
  opacity: 1;
}
</style>

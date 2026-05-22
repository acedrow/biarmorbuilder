<script setup>
import { ARMOR_SLOTS } from '../data/armorData.js'

defineProps({
  selectedSlot: { type: String, required: true },
})

const emit = defineEmits(['select'])
</script>

<template>
  <nav class="slot-nav">
    <button
      v-for="slot in ARMOR_SLOTS"
      :key="slot.id"
      type="button"
      class="slot-btn"
      :class="{ active: slot.id === selectedSlot }"
      @click="emit('select', slot.id)"
    >
      {{ slot.label }}
    </button>
  </nav>
</template>

<style scoped>
.slot-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
}

.slot-btn {
  text-align: left;
  padding: 10px 14px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  font: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.slot-btn:hover {
  background: var(--panel-hover);
  color: var(--text-h);
}

.slot-btn.active {
  background: var(--accent-bg);
  border-color: var(--accent-border);
  color: var(--text-h);
}
</style>

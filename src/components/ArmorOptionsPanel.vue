<script setup>
import { computed } from 'vue'
import { ARMOR_OPTIONS, getSlotLabel, hasArmor } from '../data/armorData.js'

const props = defineProps({
  selectedSlot: { type: String, required: true },
  selections: { type: Object, required: true },
})

const emit = defineEmits(['select-option', 'remove'])

const slotLabel = computed(() => getSlotLabel(props.selectedSlot))
const options = computed(() => ARMOR_OPTIONS[props.selectedSlot] ?? [])
const showRemove = computed(() => hasArmor(props.selectedSlot, props.selections))
</script>

<template>
  <section class="options-panel">
    <div class="panel-header">
      <h2 class="panel-title">{{ slotLabel }}</h2>
      <button
        v-if="showRemove"
        type="button"
        class="remove-btn"
        @click="emit('remove', selectedSlot)"
      >
        Remove
      </button>
    </div>
    <ul class="option-list">
      <li v-for="option in options" :key="option.id">
        <button
          type="button"
          class="option-btn"
          :class="{
            active: selections[selectedSlot] === option.id,
            'has-image': option.image,
          }"
          @click="emit('select-option', { slotId: selectedSlot, optionId: option.id })"
        >
          <img v-if="option.image" :src="option.image" :alt="option.label" class="option-img" />
          <span class="option-label">{{ option.label }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.options-panel {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-h);
}

.remove-btn {
  flex-shrink: 0;
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #ef4444;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.15s;
}

.remove-btn:hover {
  color: #f87171;
}

.option-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.option-btn {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel);
  color: var(--text);
  font: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.option-btn.has-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.option-img {
  width: 100%;
  max-height: 120px;
  object-fit: contain;
}

.option-btn:hover {
  border-color: var(--accent-border);
  color: var(--text-h);
}

.option-btn.active {
  background: var(--accent-bg);
  border-color: var(--accent);
  color: var(--text-h);
}
</style>

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
          <div class="option-text">
            <span class="option-label">{{ option.label }}</span>
            <dl v-if="option.period || option.origin" class="option-info">
              <div v-if="option.period" class="info-row">
                <dt>Time period</dt>
                <dd>{{ option.period }}</dd>
              </div>
              <div v-if="option.origin" class="info-row">
                <dt>Country of origin</dt>
                <dd>{{ option.origin }}</dd>
              </div>
            </dl>
          </div>
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
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
}

.option-img {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  object-fit: contain;
  object-position: left center;
}

.option-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-info {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-info dt {
  margin: 0;
  color: var(--text-muted);
  font-weight: 400;
}

.option-info dd {
  margin: 0;
  color: var(--text);
  line-height: 1.4;
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

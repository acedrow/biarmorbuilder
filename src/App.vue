<script setup>
import { ref } from 'vue'
import ArmorSlotNav from './components/ArmorSlotNav.vue'
import MannequinView from './components/MannequinView.vue'
import ArmorOptionsPanel from './components/ArmorOptionsPanel.vue'
import { NONE, defaultSelections } from './data/armorData.js'

const selectedSlot = ref('head')
const selections = ref(defaultSelections())

function onSelectSlot(slotId) {
  selectedSlot.value = slotId
}

function onSelectOption({ slotId, optionId }) {
  selections.value = { ...selections.value, [slotId]: optionId }
}

function onRemove(slotId) {
  selections.value = { ...selections.value, [slotId]: NONE }
}

function onRemoveAll() {
  selections.value = defaultSelections()
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>BiArmor Builder</h1>
    </header>
    <main class="layout">
      <aside class="nav-panel">
        <ArmorSlotNav :selected-slot="selectedSlot" @select="onSelectSlot" />
      </aside>
      <section class="main-panel">
        <MannequinView
          :selections="selections"
          :selected-slot="selectedSlot"
          @remove-all="onRemoveAll"
        />
      </section>
      <aside class="options-panel-wrap">
        <ArmorOptionsPanel
          :selected-slot="selectedSlot"
          :selections="selections"
          @select-option="onSelectOption"
          @remove="onRemove"
        />
      </aside>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}

.header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: var(--text-h);
}

.layout {
  flex: 1;
  display: grid;
  grid-template-columns: 240px 1fr 320px;
  min-height: 0;
}

.nav-panel {
  border-right: 1px solid var(--border);
  overflow-y: auto;
}

.main-panel {
  overflow-y: auto;
  display: flex;
}

.options-panel-wrap {
  border-left: 1px solid var(--border);
  overflow-y: auto;
}
</style>

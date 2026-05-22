export const NONE = 'none'

export const ARMOR_SLOTS = [
  { id: 'head', label: 'Head' },
  { id: 'neck', label: 'Neck' },
  { id: 'torso', label: 'Torso' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'arms', label: 'Arms' },
  { id: 'hands', label: 'Hands' },
  { id: 'waist', label: 'Waist' },
  { id: 'upper-legs', label: 'Upper legs' },
  { id: 'lower-legs', label: 'Lower legs' },
  { id: 'feet', label: 'Feet' },
]

export const SLOT_PARTS = {
  head: {
    label: { x: 60, y: 28 },
    shapes: [{ type: 'circle', cx: 60, cy: 28, r: 22 }],
  },
  neck: {
    label: { x: 60, y: 61 },
    shapes: [{ type: 'rect', x: 38, y: 52, width: 44, height: 18, rx: 4 }],
  },
  torso: {
    label: { x: 60, y: 107 },
    shapes: [{ type: 'rect', x: 28, y: 72, width: 64, height: 70, rx: 8 }],
  },
  shoulders: {
    label: { x: 60, y: 83 },
    shapes: [
      { type: 'rect', x: 26, y: 72, width: 16, height: 22, rx: 4 },
      { type: 'rect', x: 78, y: 72, width: 16, height: 22, rx: 4 },
    ],
  },
  arms: {
    label: { x: 60, y: 114 },
    shapes: [
      { type: 'rect', x: 8, y: 88, width: 18, height: 44, rx: 6 },
      { type: 'rect', x: 94, y: 88, width: 18, height: 44, rx: 6 },
    ],
  },
  hands: {
    label: { x: 60, y: 142 },
    shapes: [
      { type: 'rect', x: 8, y: 132, width: 18, height: 14, rx: 4 },
      { type: 'rect', x: 94, y: 132, width: 18, height: 14, rx: 4 },
    ],
  },
  waist: {
    label: { x: 60, y: 160 },
    shapes: [{ type: 'rect', x: 34, y: 148, width: 52, height: 24, rx: 4 }],
  },
  'upper-legs': {
    label: { x: 60, y: 202 },
    shapes: [
      { type: 'rect', x: 36, y: 174, width: 22, height: 56, rx: 6 },
      { type: 'rect', x: 62, y: 174, width: 22, height: 56, rx: 6 },
    ],
  },
  'lower-legs': {
    label: { x: 60, y: 246 },
    shapes: [
      { type: 'rect', x: 32, y: 232, width: 26, height: 28, rx: 6 },
      { type: 'rect', x: 62, y: 232, width: 26, height: 28, rx: 6 },
    ],
  },
  feet: {
    label: { x: 60, y: 269 },
    shapes: [
      { type: 'rect', x: 32, y: 262, width: 26, height: 14, rx: 4 },
      { type: 'rect', x: 62, y: 262, width: 26, height: 14, rx: 4 },
    ],
  },
}

export const ARMOR_OPTIONS = {
  head: [
    {
      id: 'greathelm',
      label: 'Greathelm',
      image: '/images/greathelm.png',
      period: '12th–14th century',
      origin: 'Western & Central Europe (e.g. Germany, England, Scotland, Switzerland)',
    },
    {
      id: 'barbute',
      label: 'Barbute',
      image: '/images/barbute.png',
      period: '15th century (c. 1430–1500)',
      origin: 'Italy',
    },
  ],
  neck: [
    { id: 'brigandine-gorget', label: 'Brigandine gorget' },
    { id: 'plate-gorget', label: 'Plate gorget' },
  ],
  torso: [
    { id: 'plate-cuirass', label: 'Plate cuirass' },
    { id: 'brigandine', label: 'Brigandine' },
  ],
  shoulders: [
    { id: 'pauldrons', label: 'Pauldrons' },
    { id: 'spaulders', label: 'Spaulders' },
  ],
  arms: [
    { id: 'articulated', label: 'Articulated' },
    { id: 'floating', label: 'Floating' },
  ],
  hands: [
    { id: 'hourglass', label: 'Hourglass' },
    { id: 'mittens', label: 'Mittens (clamshell)' },
  ],
  waist: [{ id: 'protective-skirt', label: 'Protective skirt' }],
  'upper-legs': [
    { id: 'split', label: 'Split' },
    { id: 'cuisses', label: 'Cuisses' },
  ],
  'lower-legs': [
    { id: 'case-greaves', label: 'Case greaves' },
    { id: '3-section-greaves', label: '3-section greaves' },
  ],
  feet: [{ id: 'sabatons', label: 'Sabatons' }],
}

export function hasArmor(slotId, selections) {
  const optionId = selections[slotId]
  return Boolean(optionId && optionId !== NONE)
}

export function getOptionLabel(slotId, optionId) {
  if (!optionId || optionId === NONE) return ''
  const option = ARMOR_OPTIONS[slotId]?.find((o) => o.id === optionId)
  return option?.label ?? optionId
}

export function getOptionImage(slotId, optionId) {
  if (!optionId || optionId === NONE) return null
  const option = ARMOR_OPTIONS[slotId]?.find((o) => o.id === optionId)
  return option?.image ?? null
}

export function getSlotLabel(slotId) {
  return ARMOR_SLOTS.find((s) => s.id === slotId)?.label ?? slotId
}

export function defaultSelections() {
  return Object.fromEntries(ARMOR_SLOTS.map((slot) => [slot.id, NONE]))
}

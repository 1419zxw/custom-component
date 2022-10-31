import { componentCustomSlotsMap } from './dict'

const getCustomSlots = (slots = {}, compType) => {
  return Object.keys(slots).filter((slot) => componentCustomSlotsMap[compType].includes?.(slot))
}
const getAntdSlots = (slots = {}, compType) => {
  return Object.keys(slots).filter((slot) => !componentCustomSlotsMap[compType].includes?.(slot))
}

export const getSlots = ($slots, compType) => {
  const antdSlots = getAntdSlots($slots, compType);
  const customSlots = getCustomSlots($slots, compType);

  return {
    antdSlots,
    customSlots
  }
}
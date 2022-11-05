const INPUT_CUSTOM_SLOTS = ["total", "tips", "button"]
const SELECT_CUSTOM_SLOTS = ["aaa", "bbb", "ccc"]

// 各组件的自定义插槽名称映射
export const componentCustomSlotsMap = {
  input: INPUT_CUSTOM_SLOTS,
  select: SELECT_CUSTOM_SLOTS,
}

export const getCustomSlots = (slots = {}, compType) => {
  return Object.keys(slots).filter((slot) =>
    componentCustomSlotsMap[compType].includes?.(slot)
  )
}

export const getAntdSlots = (slots = {}, compType) => {
  return Object.keys(slots).filter(
    (slot) => !componentCustomSlotsMap[compType].includes?.(slot)
  )
}

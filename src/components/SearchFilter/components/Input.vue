<template>
  <a-input> </a-input>
  <slot v-for="slot in Object.keys($slots)" :name="slot"></slot>
</template>

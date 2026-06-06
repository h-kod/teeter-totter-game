<template>
  <div class="libra" :class="{'libra-show': isShow}">
    <div class="libra-arms" :style="{transform: `rotate(${rotate/2}deg)`}">
      <div v-for="(list, index) in mapItems" :key="index" :style="{left: `${index*ITEM_SIZE}px`}" class="libra-rows">
        <item v-for="(item, idx) in list" :key="idx" class="libra__row-item" :figure="item.figureType"
          :weight="item.figureWeight" :style="{top: `${item.top}px`}" />
      </div>
    </div>
    <div class="libra-base">
      <div class="libra-base__description">Level:<br/>{{ scoreGame > 0 ? scoreGame : 0 }}</div>
    </div>
  </div>
</template>

<script setup>
import Item from './Item.vue'
import { ITEM_SIZE } from '../settings'

defineProps({
  rotate: {
    type: Number,
    default: 0,
  },
  mapItems: {
    type: Array,
    required: true,
  },
  scoreGame: {
    type: Number,
    default: 0,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.libra {
  pointer-events: none;
  opacity: 0.8;
  transition: .6s;

  &.libra-show {
    opacity: 0.5;
  }
}

.libra-arms {
  transition: .6s;

  &::after {
    content: "";
    display: block;
    height: 10px;
    background: #000000;
    box-shadow: 0 0 6px 2px red;
  }
}

.libra-arm {
  position: absolute;
  width: 50%;
  height: 100%;
}

.libra-player {
}

.libra-computer {
  left: 50%;
}

.libra-rows {
  position: absolute;
}

.libra__row-item {
  position: absolute;
}

.libra-base {
  width: 0;
  height: 0;
  border: 70px solid #0000;
  border-bottom: 140px solid red;
  margin: -70px auto 0;

  .libra-base__description {
    width: 100px;
    margin: 55px 0 0 -50px;
    color: white;
    text-align: center;
  }
}
</style>

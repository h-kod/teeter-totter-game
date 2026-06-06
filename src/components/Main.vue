<template>
  <div class="main" :style="mainStyle">
    <div class="ground" :style="battleGroundStyle">
      <div class="start-view" v-if="!isStarted">
        <div v-if="isLose" class="level__info">
          <h3 class="title">Score: {{ scoreGame }} Level</h3>
          <button @click="startNewGame" class="success">New game</button>
        </div>
        <div v-else>
          <button v-if="isInitialGame" @click="startNewGame" class="success">
            New game
          </button>
          <button v-else @click="start" class="success">
            Continue<br><small>(space)</small>
          </button>
        </div>
      </div>
      <div class="ground__player" v-show="player.figureType && isStarted">
        <item class="ground__item" :figure="player.figureType" :weight="player.figureWeight"
          :style="playerPosition" />
      </div>
      <div class="ground__computer" v-show="computer.figureType && isStarted">
        <item class="ground__item" :figure="computer.figureType" :weight="computer.figureWeight"
          :style="computerPosition" />
      </div>
    </div>
    <libra :rotate="rotate" :map-items="mapItems" :score-game="scoreGame" :is-show="isLose" />
    <div class="" style="text-align: center;">
      <p>
        <button @click="toggleStart">Space<br><small>Start - Pause</small></button>
      </p>
      <p>
        <button @click="startNewGame">Enter<br><small>New Game</small></button>
      </p>
      <p>
        <button @click="moveLeft">Left</button>
        -
        <button @click="moveRight">Right</button><br>
        <small>Player item move</small>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  ITEM_SIZE, MAX_CHANGE, MAP_SIZE, MAP_LEVELS,
} from '../settings'
import Item from './Item.vue'
import Libra from './Libra.vue'

const store = useStore()
const isInitialGame = ref(true)
const isLose = ref(false)

const isStarted = computed(() => !!store.state.timeoutId)
const player = computed(() => store.state.battleGround.player)
const computer = computed(() => store.state.battleGround.computer)
const level = computed(() => store.state.battleGround.level)
const rotate = computed(() => store.getters.rotate)
const mapItems = computed(() => store.getters.mapItems)
const scoreGame = computed(() => store.getters.scoreGame)

const playerPosition = computed(() => ({
  left: `${player.value.position * ITEM_SIZE}px`,
  top: `${level.value * ITEM_SIZE}px`,
}))

const computerPosition = computed(() => ({
  left: `${computer.value.position * ITEM_SIZE}px`,
  top: `${level.value * ITEM_SIZE}px`,
}))

const battleGroundStyle = computed(() => ({
  'background-size': `${ITEM_SIZE}px ${ITEM_SIZE}px`,
  height: `${(MAP_LEVELS + 1) * ITEM_SIZE}px`,
}))

const mainStyle = computed(() => ({
  'max-width': `${((MAP_SIZE + 1) * 2) * (ITEM_SIZE) + 1}px`,
}))

const toggleStart = () => {
  if (isStarted.value) {
    store.dispatch('stop')
  } else {
    store.dispatch('start')
  }
}

const startNewGame = () => {
  isLose.value = false
  isInitialGame.value = false
  store.dispatch('newGame')
  store.dispatch('start')
}

const moveLeft = () => store.dispatch('moveLeft')
const moveRight = () => store.dispatch('moveRight')
const start = () => store.dispatch('start')

watch(rotate, (value) => {
  if (value > MAX_CHANGE || value < -MAX_CHANGE) {
    isLose.value = true
    store.dispatch('stop')
  }
})

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (isLose.value || isInitialGame.value) {
      if (event.code === 'Space' || event.code === 'Enter') {
        startNewGame()
      }
      return
    }
    switch (event.code) {
      case 'ArrowLeft':
        moveLeft()
        break
      case 'ArrowRight':
        moveRight()
        break
      case 'Space':
        toggleStart()
        break
      case 'ArrowDown':
        start()
        break
      case 'Enter':
        startNewGame()
        break
    }
  })
})
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
}

.title {
  margin: 0;
}

.ground {
  position: relative;
  background: linear-gradient(#1f1f1f, transparent 2px),
    linear-gradient(90deg, #1f1f1f, transparent 2px);
  background-color: #0000004d;

  .ground__item {
    position: absolute;
    z-index: 2;
  }

  .ground__player {
    position: absolute;
    width: 50%;
    height: 100%;
  }

  .ground__computer {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 50%;
  }
}

.start-view {
  height: 100%;
  background: #4e4e4ebd;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
}

.level__info {
  background: rgba(255, 0, 0, 0.747);
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  color: white;
  z-index: 1;
}
</style>

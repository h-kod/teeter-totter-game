<template>
  <div id="app">
    <header>
      <h2>Insider's Teeter Totter</h2>
    </header>
    <div class="wrapper">
      <Main />
    </div>
  </div>
</template>

<script setup>
import Main from './components/Main.vue'
</script>

<style lang="scss">
@import "normalize.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  text-align: center;
  padding: 10px;
}

footer {
  margin: 2rem 0 0;
  padding: 10px;
}

button {
  cursor: pointer;
  background: white;
  padding: 0.3rem 1rem;
  color: #2c3e50;
  border: 1px solid #9a9eb0;
  border-radius: 3px;

  &:hover {
    background: #d6d6d6;
  }

  &.success {
    color: #fff;
    background-color: #328145;
    border-color: #ffffff;
  }
}

.wrapper {
  padding: 10px;
}
</style>

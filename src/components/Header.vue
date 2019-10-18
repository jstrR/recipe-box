<template>
  <header>
    <div class="header-name">
      <span>Recipe Box</span>
    </div>
    <button class="add-item" @click="toggleNewRecipe">Add Recipe</button>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "header",
  methods: {
    ...mapActions(["toggleNewRecipeState"]),
    toggleNewRecipe() {
      this.toggleNewRecipeState();
    }
  }
};
</script>

<style lang="sass" scoped>

$font-stack-header: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
$font-size-header: 2em
$font-color-header: #fff

header
    background-color: #64aeb5
    margin: 0
    display: flex
    justify-content: space-around
    align-items: center
    flex-wrap: nowrap
.header-name,
.add-item
    color: $font-color-header
    font-family: $font-stack-header
    font-size: $font-size-header
.header-name
    padding: 2%
    white-space: nowrap
.add-item
    background-color: #64c8d1
    border: none
    padding: 5px 15px
.add-item:hover
    cursor: pointer
</style>
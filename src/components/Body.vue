<template>
  <div>
    <div class="recipes-chart">
      <div v-for="card in recipes" :key="card.id" class="recipe-card">
        <div class="heading">
          <img :src="card.img" :alt="card.title" />
          <p class="card-title">{{card.title}}</p>
        </div>
        <button @click="toggleCard(card)" class="recipe-link">Open recipe</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "body",
  props: {
    fetchCardPayload: Function
  },
  data() {
    return {
      recipes: {}
    };
  },
  computed: {
    ...mapGetters(["getAllRecipes"])
  },
  created() {
    this.recipes = this.getAllRecipes;
  },
  methods: {
    ...mapActions(["toggleRecipeCardState"]),
    toggleCard(card) {
      this.toggleRecipeCardState();
      this.fetchCardPayload(card);
    }
  }
};
</script>

<style lang="sass" scoped>
$font-stack-header: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif

.recipes-chart
    display: flex
    justify-content: center
    margin: 0 auto
    max-width: 65%
    flex-wrap: wrap
    z-index: 1
    margin-bottom: 30px
.recipe-card
    min-height: 10%
    max-width: 25%
    border: 1px solid #ccc
    margin: 30px 20px
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
    min-width: 275px
.recipe-card:hover
    transform: scale(1.05)
.recipe-card img
    width: 100%
    height: 275px
    display: block
.card-title
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
    background-color: #64aeb5
    margin: 0
    color: #fff
    font-family: $font-stack-header
    font-size: 1.5rem
    padding: 15px 0
    max-height: 30px
.card-title p
    margin: 0
.recipe-link
    width: 100%
    min-height: 8%
    background-color: #64c8d1
    border: none
    color: #fff
    font-family: $font-stack-header
    font-size: 1.25em
.recipe-link:hover
    cursor: pointer
</style>

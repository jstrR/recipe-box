<template>
  <div class="overlay">
    <h1 class="title">Add Recipe</h1>
    <form
      action
      @submit.prevent="submitRecipe"
      class="new-recipe-form"
      v-click-outside="closeNewRecipe"
    >
      <label for="new-recipe-title">Recipe name *</label>
      <input id="new-recipe-title" type="text" v-model="recipeData.title" required />
      <label for="new-recipe-ingr">Ingredients *</label>
      <textarea id="new-recipe-ingr" v-model="recipeData.ingredients" required></textarea>
      <label for="new-recipe-instr">Instructions *</label>
      <textarea id="new-recipe-instr" v-model="recipeData.instructions" required></textarea>
      <label for="new-recipe-url">Url link to Photo (optional):</label>
      <input id="new-recipe-url" type="textarea" v-model="recipeData.img" />
      <button type="submit" class="submit-new-recipe">Submit</button>
    </form>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapActions } from "vuex";
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      recipeData: {
        title: "",
        img: "",
        ingredients: "",
        instructions: ""
      }
    };
  },
  methods: {
    ...mapActions(["addRecipe", "toggleNewRecipeState"]),
    closeNewRecipe() {
      this.toggleNewRecipeState();
    },
    submitRecipe() {
      this.recipeData.ingredients = this.recipeData.ingredients.split(
        /[;,.|\n]+/
      );
      this.recipeData.instructions = this.recipeData.instructions.split(
        /[;|\n]+/
      );

      this.addRecipe(this.recipeData);
      this.toggleNewRecipeState();
    }
  }
};
</script>

<style lang="sass" scoped>
$font-stack-header: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
.title
    margin: 0
    background-color: #64aeb5
    padding: 15px 0
    min-height: 75px
    font-family: $font-stack-header
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    color: #fff
.new-recipe-form
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    padding: 1% 3%
    width: 55%
    margin: 0 auto
    z-index: 5
    color: #717575
    background-color: #fff
input, textarea
    min-height: 2rem
    border: none
    border-bottom: 1px solid #9e9e9e
    outline: none
    box-sizing: content-box
input:focus, textarea:focus
    border-bottom-color: #64c8d1
    box-shadow: 0 1px 0 0 #64c8d1
textarea
    min-height: 8rem
input,
textarea
    margin: 15px 0
    width: 85%
.submit-new-recipe
    min-width: 15%
    height: 35px
    font-family: $font-stack-header
    color: #fff
    font-size: 1.3rem
    background-color: #64c8d1 
    border: none
    margin: 10px 0
    border-radius: 3%
.submit-new-recipe:hover
    cursor: pointer
.overlay
    position: fixed
    width: 100%
    height: 100%
    overflow-y: auto
    background: rgba(0, 0, 0, 0.5)
    z-index: 5
</style>

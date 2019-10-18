<template>
  <div class="overlay">
    <div class="card" v-click-outside="closeCard">
      <div class="title">
        <h1>{{payload.title}}</h1>
      </div>
      <div class="main-wrapper">
        <div class="ingredients">
          <h2>Ingredients:</h2>
          <div class="ingredient" :contenteditable="canEdit">
            <p v-for="ingred in payload.ingredients" :key="ingred.id" ref="editableValue">{{ingred}}</p>
          </div>
        </div>
        <div class="recipe-image">
          <img :src="payload.img" :alt="payload.title" width="300" />
        </div>
      </div>
      <div class="instructions">
        <h2>Instructions:</h2>
        <ol :contenteditable="canEdit" class="instructions-list">
          <li
            v-for="instruct in payload.instructions"
            :key="instruct.id"
            ref="editableValue"
          >{{instruct}}</li>
        </ol>
      </div>
      <footer class="footer">
        <button v-show="!canEdit" class="edit" @click="editeRecipeCard">Edit</button>
        <button v-show="canEdit" class="edit" @click="editeRecipeCard">Done</button>
        <button class="delete" @click="deleteRecipeCard">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapActions } from "vuex";
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    payload: Object
  },
  data() {
    return {
      canEdit: false
    };
  },
  methods: {
    ...mapActions(["toggleRecipeCardState", "deleteRecipe", "updateRecipe"]),
    closeCard() {
      this.toggleRecipeCardState();
    },
    editeRecipeCard() {
      this.canEdit = !this.canEdit;
      if (this.canEdit === true) {
        return;
      } else {
        let newIngredients = [];
        let newInstructions = [];
        let updatedValues = {};

        this.$refs.editableValue.forEach(item => {
          if (
            item.parentNode &&
            item.parentElement.className.includes("ingredient")
          ) {
            newIngredients.push(item.innerHTML);
          }
          if (
            item.parentNode &&
            item.parentElement.className.includes("instructions-list")
          ) {
            newInstructions.push(item.innerHTML);
          }
        });
        if (
          JSON.stringify(this.payload.ingredients) !==
          JSON.stringify(newIngredients)
        ) {
          updatedValues = {
            title: this.payload.title,
            updatedIngredients: [...newIngredients]
          };
        }
        if (
          JSON.stringify(this.payload.instructions) !==
          JSON.stringify(newInstructions)
        ) {
          updatedValues = {
            title: this.payload.title,
            updatedInstructions: [...newInstructions]
          };
        }
        this.updateRecipe(updatedValues);
      }
    },
    deleteRecipeCard() {
      this.deleteRecipe(this.payload);
      this.toggleRecipeCardState();
    }
  }
};
</script>

<style lang="sass" scoped>
$font-stack-header: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
p
    margin: 0
    padding: 0
.card
    min-width: 60%
    max-width: 60%
    margin: 0 auto
    z-index: 5
    color: #fff
.title
    background-color: #64aeb5
    padding: 15px 5px
    min-height: 75px
    font-family: $font-stack-header
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
.title p
    font-size: 1.5rem
.main-wrapper
    display: flex
    width: 100%
.ingredients
    background-color: #fff
    color: #000
    width: 65%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    flex-wrap: wrap
.ingredients h2,
.instructions h2
    font-family: $font-stack-header
    color: #717575
    margin: 0
    margin-left: 15px
    padding: 3%
    font-size: 2rem
.ingredients p
    font-family: $font-stack-header
    margin: 12px
    margin-left: 10%
    text-align: left
    color: #717575
.recipe-image
    background-color: #fff
    display: flex
    align-items: center
    justify-content: flex-start
    min-width: 35%
.recipe-image img
    width: 85%
.instructions
    background-color: #fff
    width: 100%
    font-family: $font-stack-header
    text-align: left
    color: #717575
    padding-bottom: 5%
.instructions ol
    width: 80%
    margin:0
    margin-left: 1%
.instructions li
    padding: 5px
    margin-right: 15px
    line-height: 1.2
[contentEditable="true"]
    background-color: #E0F2F1//rgba(100, 200, 209, 0.3)
    color: #717575
[contentEditable="true"]:focus
    outline: none
.footer
    display: flex
    justify-content: space-around
    align-items: center
    background-color: #64aeb5
    height: 75px
.edit,
.delete
    min-width: 15%
    height: 35px
    font-family: $font-stack-header
    color: #fff
    font-size: 1.3rem
    background-color: #64c8d1
    border: none
.delete
    background-color: #c91414
.edit:hover,
.delete:hover
    cursor: pointer
.overlay
    position: fixed
    width: 100%
    height: 100%
    overflow-y: auto
    background: rgba(0, 0, 0, 0.5)
    z-index: 5
</style>
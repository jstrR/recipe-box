import Vue from "vue";
import Vuex from "vuex";
import recipes from "@/assets/data/recipes.js";
import updateStateFromLocal from "@/plugin.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes,
    newRecipeState: false,
    recipeCardState: false
  },

  plugins: [updateStateFromLocal],

  mutations: {
    appendRecipe: (state, payload) => {
      state.recipes.push(payload);
    },
    popRecipe: (state, payload) => {
      let recipeIndex = null;
      state.recipes.forEach((recipe, index) => {
        if (recipe.title === payload.title) recipeIndex = index;
      });
      if (recipeIndex !== null) state.recipes.splice(recipeIndex, 1);
    },
    commitRecipe: (state, payload) => {
      state.recipes.forEach(item => {
        if (item.title === payload.title) {
          if (payload.updatedIngredients)
            item.ingredients = [...payload.updatedIngredients];
          if (payload.updatedInstructions)
            item.instructions = [...payload.updatedInstructions];
        }
      });
    },
    toggleNewRecipe: state => {
      state.newRecipeState = !state.newRecipeState;
    },
    toggleRecipeCard: state => {
      state.recipeCardState = !state.recipeCardState;
    },

    updateStateLocal: (state, payload) => {
      state.recipes = [...payload];
    }
  },

  actions: {
    addRecipe: ({ commit }, payload) => {
      commit("appendRecipe", payload);
    },
    fillStateFromLocal: ({ commit }, payload) => {
      commit("updateStateLocal", payload);
    },
    updateRecipe: ({ commit }, payload) => {
      commit("commitRecipe", payload);
    },
    deleteRecipe: ({ commit }, payload) => {
      commit("popRecipe", payload);
    },
    toggleNewRecipeState: ({ commit }) => {
      commit("toggleNewRecipe");
    },
    toggleRecipeCardState: ({ commit }) => {
      commit("toggleRecipeCard");
    }
  },

  getters: {
    getAllRecipes: state => {
      return state.recipes;
    },
    getRecipeCardState: state => {
      return state.recipeCardState;
    },
    getNewRecipeState: state => {
      return state.newRecipeState;
    }
  }
});

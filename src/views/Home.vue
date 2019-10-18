<template>
  <div>
    <AddRecipe v-if="getNewRecipeState" />
    <RecipeCard v-if="getRecipeCardState" :payload="cardPayload" />
    <Header />
    <Body :fetchCardPayload="fetchCardPayload" />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Body from "@/components/Body.vue";
import AddRecipe from "@/components/AddRecipe.vue";
import RecipeCard from "@/components/RecipeCard.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Header,
    Body,
    AddRecipe,
    RecipeCard
  },
  data() {
    return {
      cardPayload: {}
    };
  },
  created() {
    let localStorageValue = JSON.parse(localStorage.getItem("recipes"));
    if (localStorageValue) {
      this.fillStateFromLocal(localStorageValue);
    }
  },
  computed: {
    ...mapGetters(["getRecipeCardState", "getNewRecipeState"])
  },
  methods: {
    ...mapActions(["fillStateFromLocal"]),
    fetchCardPayload(payload) {
      payload ? (this.cardPayload = payload) : (this.cardPayload = {});
    }
  }
};
</script>

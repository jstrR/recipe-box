export default store => {
  store.subscribe((mutation, state) => {
    // I know that this 'if' is embarrassing
    if (
      mutation.type === "appendRecipe" ||
      mutation.type === "popRecipe" ||
      mutation.type === "commitRecipe"
    )
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
  });
};

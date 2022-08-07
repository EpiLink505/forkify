function transformAddRecipeData(formData, API_KEY) {
  let ingredients = [];
  const filteredForm = formData.filter(item => {
    if (item[0].startsWith('ingredient') && item[1].trim() === '') return;
    if (item[0].startsWith('ingredient')) {
      const fields = item[1].split(',');
      ingredients.push({
        quantity: fields[0] === '' ? null : fields[0].trim(),
        unit: fields[1].trim(),
        description: fields[2].trim(),
      });
      return;
    }
    return item;
  });

  const formObj = Object.fromEntries(filteredForm);
  formObj.ingredients = ingredients;

  return {
    title: formObj.title,
    source_url: formObj.sourceUrl,
    image_url: formObj.image,
    publisher: formObj.publisher,
    cooking_time: +formObj.cookingTime,
    servings: +formObj.servings,
    ingredients: formObj.ingredients,
  };
}

export default transformAddRecipeData;

// key: API_KEY,
// id: `${Date.now()}`,

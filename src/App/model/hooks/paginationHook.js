function paginationHook(array, numItemsPerPage = 10, curIndex = 0) {
  if (array.length - curIndex <= numItemsPerPage)
    return [array.slice(curIndex)];

  const paginationArr = array.slice(curIndex, curIndex + numItemsPerPage);

  return [paginationArr].concat(
    paginationHook(array, numItemsPerPage, curIndex + numItemsPerPage)
  );
}

export default paginationHook;

// console.log('CurIndex: ', curIndex);

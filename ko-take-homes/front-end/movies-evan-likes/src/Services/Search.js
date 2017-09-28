function Search_Filter(items, search_text){
    console.log("inside filter",items, search_text);
    if(!items) return [];   
    //Checking for search text length to filter
    if(!search_text || search_text.length < 2) return items;
    search_text = search_text.toLowerCase();
    //Filters all the items whose title includes the search text
    return items.filter( item => {
      return item.title.toString().toLowerCase().includes(search_text);
    });
}

export default Search_Filter;
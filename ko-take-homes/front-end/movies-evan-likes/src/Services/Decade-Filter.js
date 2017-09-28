function Decade_Filter(items, decade){
    if(!items) return [];
    if(!decade) return items;
    decade = parseInt(decade);
    //Filters items where items year is within a decade
    return items.filter( item => {
      return (item.year >= decade && item.year < decade+10);
    });
}

export default Decade_Filter
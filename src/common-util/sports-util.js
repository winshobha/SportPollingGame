 export const SportsUtil={
     prepareSportsCategory:function(data){
         console.log("FTTT",data.filter(x=>x.sport ==='FOOTBALL'))
         console.log("SNOOKER",data.filter(x=>x.sport ==='SNOOKER')) 
         console.log("HANDBALL",data.filter(x=>x.sport ==='HANDBALL'))
         console.log("HANDBALL",data.filter(x=>x.sport ==='ICE_HOCKEY')) 
         console.log("TENNIS",data.filter(x=>x.sport ==='TENNIS')) 
         //TENNIS
         

     },
      groupBy :function (list, keyGetter) {
        //  console.log('LIST====',list, "keyGetter---",keyGetter)
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    },

    randomCateory :function(collection){
       // console.log('collection ---',collection);
        let keys=Array.from(collection.keys());
        //console.log('KEYS--',keys);
        let index=keys [Math.floor(Math.random ()* keys.length )];
                //keys.splice(index,1)[0];
          return index;
        },
    randomCountryQuestion :function(list){
    
        let index= list [Math.floor(Math.random ()* list.length )]
        //list.splice(index,1)[0];
        return index;}
    
 }
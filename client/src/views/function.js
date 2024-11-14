const data = [
    {   name: "rent",
        amount: 2100,
        isPaid: true
     },

    {  name: "food",
        amount: 70,
        isPaid: true
     }
]

const expenseToChart = (list) => {
    console.log(list)
    let map = {}
    
    for(let obj of list){
        let key = obj["name"]
        console.log(obj)
        if(!Object.hasOwn(map, key)){
            map[key] = obj["name"]
        }
    }

    return map
}

console.log(expenseToChart(data))
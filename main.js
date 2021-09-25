class Inv{
    constructor(){
        this.prods = new Array();
    }

    _searchIndex(id) {
        for(let i = 0; i < this.prods.length; i++){
            if(id == this.prods[i].id){
                return i;
            }
        }
        return -1;
    }

    search(id){
    
        if (this._searchIndex(id) >= 0) {
            return this.prods[this._searchIndex(id)];
        }
        return null
    }

    add(prod){

        if (this.prods.length<20) {

            if(this._searchIndex(prod.id) >= 0){
                return null;
            }else{
                for(let i = 0; i < this.prods.length; i++){
                    if(prod.id < this.prods[i].id){
                        this.prods.push(this.prods[this.prods.length-1]);
                        for(let j = this.prods.length-1; j > i; j--){
                            this.prods[j] = this.prods[j-1];
                        }
                        this.prods[i] = prod;
                        return prod;
                    }
                }
                this.prods.push(prod);
                return prod;
            }
        }
    }
    
    delete(id){
        let index = this._searchIndex(id);
        
    
        if (index >= 0){
            let prod = this.prods[index];
            for (let i = index; i < this.prods.length-1; i++){
                this.prods[i] = this.prods[i+1];
            }
            this.prods.pop();
            return prod;
        }else{
            return null;
        }
    }
    
    listReverse(){
        let table = '';
        for(let i = this.prods.length - 1; i >= 0 ; i--){
            table += this.prods[i].infoHTML();
        }
        return table;
    }
    listDefautl(){
        let table = '';
        for(let i = 0; i < this.prods.length; i++){
            table +=  this.prods[i].infoHTML();
        }
        return table;
    }
    
}

class Prod{
    constructor(id, name, amount, cost){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
    }
    getTotal(){
        return this.amount * this.cost;
    }

    infoHTML(){
        return `| ${this.id} | ${this.name} | ${this.amount} | ${this.cost} | ${this.getTotal()} |<br>`;
    }
}


class Interface{
    
    showProd(newData){
        let details=document.getElementById('details');
        details.innerHTML = `${newData}`;
    }
    addProd(newData){
        let details=document.getElementById('details');
        details.innerHTML = newData.infoHTML();
    }
    
}

let inv = new Inv();
let ui = new Interface();

const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let prod = new Prod(id, name, amount, cost);
    ui.addProd(inv.add(prod));
});

const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{

    let id = document.getElementById('idDelete').value;
    ui.addProd(inv.delete(id));
});

const btnDefault=document.getElementById('btnListDefault');
btnDefault.addEventListener('click',()=>{
    ui.showProd(inv.listDefautl());
});

const btnReverse=document.getElementById('btnListReverse');
btnReverse.addEventListener('click',()=>{
    ui.showProd(inv.listReverse());
});

const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{

    let id = document.getElementById('idSearch').value;
    ui.addProd(inv.search(id));
});
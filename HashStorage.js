"use strict";

class HashStorage{

    addValue(key,value){
        this[key] = value;
    }

    getValue(key){
        return this[key];
    }

    deleteValue(key){
        delete this[key];
    }

    getKeys(){
        return Object.keys(this);
    }
}

let drinkStorage = new HashStorage();


function addNewCocktail() {
    let name = null;
    let info = null;

    while(!name || name in drinkStorage){
        name = prompt("Введите название коктейля:", "Пиранья");
    }
    info = ` Алкогольный: ${(confirm("Коктейль алкогольный?")? "да" : "нет")}; \n ${(prompt("Введите рецет приготовления.","Водка – 37 мл, Шоколадный ликер(коричневый) – 25 мл, Кола (сильно охлажденная) – 25 мл ")).split(",").join(";\n")}`;
    drinkStorage.addValue(name,info);
    
}

function getRecipe() {
    let name = prompt("Введите название коктейля, который вы ищите?","Пиранья");
    let result = drinkStorage.getValue(name);
    if(result === undefined){
        alert("Такой коктейль не найден.");
    }
    else{
        document.getElementById("block_info").textContent = result;
    }
}

function deleteCocktail() {
    let name = prompt("Введите название коктейля который нужно удалить.", "Пиранья");
    if(drinkStorage[name] === undefined){
        alert("Такой коктейль не найден.");
    }
    else {
        drinkStorage.deleteValue(name);
        alert("Коктейль удален.");
    }
}

function  printNamesCocktais() {
    if(drinkStorage.getKeys().length !== 0){
        document.getElementById("block_info").textContent = "\"" + drinkStorage.getKeys().join("\", \"") +"\"";
    }
    else {
        document.getElementById("block_info").textContent = "Нет ни одного рецепта."
    }
}





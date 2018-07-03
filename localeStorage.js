"use strict";

class TLocalStorage {
    constructor(source, key) {
        this.dataSource = source;
        this.key = key;
    }

    _getData(){
        const value = this.dataSource.getItem(this.key);
        if(value) {
            return JSON.parse(value);
        }
        return [];
    }

    _setData(arr){
        this.dataSource.setItem(this.key, JSON.stringify(arr));
    }

    save(item) {
        const arr = this._getData();
        arr.push(item);
        this._setData(arr);
    }

    find(name) {
        const arr = this._getData();
        return arr.find((item) => { return item.name === name; });
    }

    remove(name) {
        let arr = this._getData();
        arr = arr.filter(function(item) {
            return item.name !== name;
        });
        this._setData(arr);
    }

    findAll() {
        const arr = this._getData();
        const keys = [];
        for (let i = 0; i < arr.length; i++) {
            keys.push(arr[i].name);
        }
        return keys;
    }
}

const drinkStorage = new TLocalStorage(window.localStorage, 'drinks');
const foodStorage = new TLocalStorage(window.localStorage, 'food');



function askUser(type, ask) {
    if(type === 'drink' && ask === "description"){
        const isAlcohol = confirm("Коктейль алкогольный?") ? "да" : "нет";
        const recipe = prompt("Введите рецет приготовления.", "Водка – 37 мл, Шоколадный ликер(коричневый) – 25 мл, Кола (сильно охлажденная) – 25 мл ");
        return  `Алкогольный: ${isAlcohol};${recipe.split(",").join(";")}`;
    }
    else if(type === 'food' && ask === "description"){
        const recipe = prompt("Введите рецет приготовления.", "Крупа гречневая - 1 по вкусу, Грибы свежие - 200 г, Лук репчатый - 2, Сметана - 5 ");
        return  `${recipe.split(",").join(";")}`;
    }
    else if(type === 'drink' && ask === "name"){
        return prompt("Введите название коктейля:", "Пиранья");
    }
    else if(type === 'food' && ask === "name"){
        return prompt("Введите название блюда:", "Гречка по-белорусски");
    }
}

function addItem(type) {
    let name = null;
    let description;

    while(!name){
        name = askUser(type, 'name');
    }
    description = askUser(type, 'description');
    if(type === 'drink') {
        drinkStorage.save({name, description});
    }
    else{
        foodStorage.save({name, description});
    }
}

function showItem(type) {
    const name = askUser(type, 'name');
    let result;

    if(type === 'drink'){
        result = drinkStorage.find(name);
    }
    else{
        result = foodStorage.find(name);
    }

    if(result){
        document.getElementById("block_info").innerHTML = result.description.replace(/;/g, '<br/>');
    }
    else{
        alert("Такой рецепт не найден.");
    }
}
function deleteItem(type) {
    const name = askUser(type, 'name');
    let storage ;
    if(type === 'drink') {
        storage = drinkStorage;
    }
    else {
        storage = foodStorage;
    }

    if (storage.find(name) === undefined) {
        alert("Такой рецепт не найден.");
    }
    else {
        storage.remove(name);
        alert("Рецепт удален.");
    }
}

function showAll(type) {
    let recipeNames;
    if(type === 'drink') {
        recipeNames = drinkStorage.findAll();
    }
    else{
        recipeNames = foodStorage.findAll();
    }
    if(recipeNames.length !== 0){
        document.getElementById("block_info").innerHTML = recipeNames.join('<br/>');
    }
    else {
        document.getElementById("block_info").textContent = "Нет ни одного рецепта."
    }
}









import { AJAXStorage } from './AJAXStorage.js';

 export class TLocalStorage {
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
        let ajaxStorage = new AJAXStorage(item, this.key);
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








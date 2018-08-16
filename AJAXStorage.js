export class AJAXStorage {
    constructor(obj, key) {
        this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
        this.name = 'Kolbik';
        this.array = null;
        this.password = 222;
        let self = this;
        this.obj = null;
        this.key = null;
    }

    saveInfo(item, key) {
        self.obj = item;
        self.key = key;
        $.ajax(
            {
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'LOCKGET', n: this.name,
                    p: this.password
                },
                cache: false,
                success: this.lockGetReady,
                error: this.errorHandler
            })
    }

    /*insertNewArray() {
        $.ajax(
            {
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'INSERT', n: this.name,
                    v: JSON.stringify([1, 2])
                },
                cache: false,
                success: this.saveInfo,
                error: this.errorHandler
            })
    }*/

    lockGetReady(callresult) {
        if (callresult.error !== undefined)
            console.log(callresult.error);
        else {
            this.array = [];

            if (callresult.result !== "") // либо строка пустая - сообщений нет
            {
                // либо в строке - JSON-представление массива сообщений
                this.array = JSON.parse(callresult.result);
                if (!Array.isArray(this.array))
                    this.array = [];
            }

            this.array.push({type: self.key, name: self.obj.name, descrip: self.obj.description});
            $.ajax({
                url: this.ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'UPDATE', n: this.name,
                    v: JSON.stringify(this.array), p: this.password
                },
                cache: false,
                success: this.updateReady,
                error: this.errorHandler
            });
        }
    }

    errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }

    updateReady(callresult) {
        if (callresult.error !== undefined)
            alert(callresult.error);
    }

}

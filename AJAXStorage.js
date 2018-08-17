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
                type: 'POST',cache: false, dataType: 'json',
                data: {
                    f: 'LOCKGET', n: this.name,
                    p: this.password
                },

                success: this.lockGetReady,
                error: this.errorHandler
            })
    }
    lockGetReady(callresult) {
        if (callresult.error != undefined){
            console.log(callresult.error);
        }
        else {
            let array = [];
            array.push({type: self.key, name: self.obj.name, descrip: self.obj.description});
            $.ajax({
                url: self.ajaxHandlerScript,
                type: 'POST',cache: false, dataType:'json',
                data: {
                    f: 'UPDATE', n: self.name,
                    v: JSON.stringify(array), p: self.password
                },
                success: self.updateReady, error: self.errorHandler
            });
        }
    }

    insertNewArray() {
        $.ajax(
            {
                url: this.ajaxHandlerScript,
                type: 'GET',cache: false, dataType: 'json',
                data: {
                    f: 'INSERT', n: this.name,
                    v: JSON.stringify([])
                },
                success: this.lockGetReady,
                error: this.errorHandler
            })
    };


    errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }

    updateReady(callresult) {
        if (callresult.error !== undefined)
            alert(callresult.error);
    }

}

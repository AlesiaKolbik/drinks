export class AJAXStorage{
    constructor(key,  arr){
        this.ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        this.name = 'k-drinks-storage';
        this.key = key;
        this.arr = arr;
        this.saveInfo();
        this.messages = null;
    }
    saveInfo() {
        let info = {
            key : this.key,
            info : this.arr
        };
        $.ajax( {
                url : this.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'INSERT', n : this.name, v : JSON.stringify(info)},
                success : this.ready, error : this.errorHandler
            }
        );
    }

    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

    ready(){
        console.log('ок');
    }



}

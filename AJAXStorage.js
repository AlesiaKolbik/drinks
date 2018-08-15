export class AJAXStorage{
    constructor(obj, key){
        this.ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
        this.key = key;
        this.name = 'k-'+ this.key + '-storage';
        this.obj = obj;
        this.saveInfo();
    }
    saveInfo() {

        let info = this.obj;
        console.log(this.name);
        console.log(info);
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

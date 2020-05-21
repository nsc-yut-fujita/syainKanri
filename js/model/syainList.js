class SyainList{
    constructor(){
        this._list = [];
    }

    get list(){
        return [].concat(this._list);
    }

    //リストの最後にデータを追加する
    addItem(syain){
        this._list.push(syain);
    }

    //社員のリストからデータを削除
    deleteItem(syain){
        let itemIndex = -1;
        for(let i = 0; (i = this._list.length);i++){
            if(JSON.stringify(syain) == JSON.stringify(this._list[i])){
                itemIndex = i;
                break;
            }   
        }
    

        if(itemIndex > 0){
            this._list.splice(itemIndex, 1);
        }
    }

    //社員のリストをクリアする
    clearList(){
        this._list = [];
    }
}
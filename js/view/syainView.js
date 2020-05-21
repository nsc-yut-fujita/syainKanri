class SyainView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(syain) {
        return `<tr class="syain">
        <td><button  onclick="syainController.done(${syain.syaban})">削除</button></td>
         <td>${syain.syaban}</td>
         <td>${syain.sei}</td>
         <td>${syain.mei}</td>
         <td>${syain.tel}</td>
         <td>${syain.address}</td> 
       </tr>`;
    }

    update(syainList) {
        //todoListのアイテム1個ごとにtemplateでHTMLを作成
        let content = '';

        syainList.forEach(syain => {
            content += this.template(syain);
        });

        //elementのinnerHTMLに入れる
        this._element.innerHTML = content;
    }
    clear(){
        this._element.innerHTML = "";
    }
}
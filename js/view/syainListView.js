class SyainListView{
    constructor(element){
        this._element = element;
    }

    _template(syain){
        return `<tr class="syain">
            <td>${syain.syaban}</td>
            <td>${syain.sei}</td>
            <td>${syain.mei}</td>
            <td>${syain.tel}</td>
            <td>${syain.address}</td>
            </tr>`;
    }

    update(syain){

        let a = this._element.innerHTML;

        this._element.innerHTML = this._template(syain);
    }

    //テーブルの追加
    // _templateDocument(syain){
    //     //trタグを作成する
    //     let tr = document.createElement("tr");

    //     //tdタグに各要素を格納する
    //     let tdSyaban = document.createElement("td");
    //     tdSyaban.textContent = syain.syaban;

    //     let tdSei = document.createElement("td");
    //     tdSei.textContent = syain.sei;

    //     let tdMei = document.createElement("td");
    //     tdMei.textContent = syain.mei;

    //     let tdTel = document.createElement("td");
    //     tdTel.textContent = syain.tel;

    //     let tdAddress = document.createElement("td");
    //     tdAddress.textContent = syain.address;

    //     //trタグの内部にtdタグを格納
    //     tr.appendChild(tdSyaban);
    //     tr.appendChild(tdSei);
    //     tr.appendChild(tdMei);
    //     tr.appendChild(tdTel);
    //     tr.appendChild(tdAddress);

    //     //今までのテーブルに新しいデータを登録する
    //     this._element.appendChild(tr);
    //}

    //社員テーブルのクリア
    clear(){
        this._element.innerHTML = " ";
    }


}
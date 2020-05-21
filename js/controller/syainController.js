class SyainController{

    constructor(){
        let selector = document.querySelector.bind(document);
        this._inputSyaban = selector("#syaban");
        this._inputSei = selector("#sei");
        this._inputMei = selector("#mei");
        this._inputTel = selector("#tel");
        this._inputAddress = selector("#address");
    
        this._syainList = new SyainList;
        this._syainView = new SyainView(selector(".syain-table"));
        this._displayOpenSyain();
    }

    

    //社員を登録する
    addSyain(event){
        event.preventDefault();

        //入力のチェック
        let vaild = this._isVaildInput();

        //チェック項目の判定
        if(vaild == true){
            let syain = new Syain(
                this._inputSyaban.value,
                this._inputSei.value,
                this._inputMei.value,
                this._inputTel.value,
                this._inputAddress.value
            );
               
           // this._syainList.addItem(syain);

                ConnectionFactory.getConnection()
                .then(connection =>   new SyainDao(connection))
                .then(syainDao => syainDao.storeSyain(syain))
                .catch(error => alert(error))

            //console.log(this._syainList);
                this._displayOpenSyain()
            //画面の更新
            // this._syainListView._templateDocument(syain);
            // this.clearForm();
        }
        else{
            alert("全項目入力してください")
        }

    }

     // DBからTodoを取得して表示する
     _displayOpenSyain(){
        // DBとの接続
        ConnectionFactory.getConnection()

            // 接続に成功したのでTodoDaoを作成する
            .then(connection => new SyainDao(connection))

            // DBからTODOのリストを読み込む
            .then(dao => dao.fetchAllOpenSyain())

        
            .then( list => {
            // 画面に_todoListの中身を表示させる
            this._syainView.update(list);

            })

            // エラーが発生したときの処理
            .catch(error => console.log(error));
    }

    //テーブルをクリアする
    clearSyain(){
        this._syainList.clear();
        this._syainListView.clear();
    }

    deleteSyain(){
        this.itoList.deleteItem();
        this._syainListView.delete();
    }

    //入力値を初期値に戻す
    clearForm(){
        this._inputSyaban = "";
        this._inputSei = "";
        this._inputMei = "";
        this._inputTel = "";
        this._inputAddress = "";
    }
    
    //入力のチェック
    _isVaildInput(){
        let valsyaban = false;
        let valsyabanSyaban =false;
        let valsyabanSei = false;
        let valsyabanMei = false;
        let valsyabanTel = false;
        let valsyabanAddress = false;

        //社員番号のチェック
        if(this._inputSyaban.value !=""){
            valsyabanSyaban = true;
        }

        //姓のチェック
        if(this._inputSei.value !=""){
            valsyabanSei = true;
        }

        //名のチェック
        if(this._inputMei.value !=""){
            valsyabanMei = true;
        }

        //連絡先のチェック
        if(this._inputTel.value !=""){
            valsyabanTel = true;
        }

        //Eメールアドレスのチェック
        if(this._inputAddress.value !=""){
            valsyabanAddress = true;
        }

        //全ての項目のチェックがtrueならtrueを返す
        if(valsyabanSyaban == true && valsyabanSei == true && valsyabanMei == true && valsyabanTel == true && valsyabanAddress == true){
            valsyaban = true;
        }
        return valsyaban;
    }

    //TODOすべてを完了の状態にする
    allDone() {
        //_todoListの中に入っているTodoすべてをステータス１にする
        //Todoオブジェクトのdone()メソッドを呼ぶ
       // this._syainList.list.forEach(syain => {

            ConnectionFactory.getConnection()
            .then(connection =>  new SyainDao(connection))
            .then(dao => dao.deleteAllSyain())
            .catch(error => console.log(error));
       // });

        //_todoListを空にする
       // this._syainList.clearList();

        //_todoViewのupdateを呼ぶ
        this._syainView.clear();
    }   

    done(sakujo){

        ConnectionFactory.getConnection()
        .then(connection =>  new SyainDao(connection))
        .then(dao => dao.completeSyain(sakujo))
        .catch(error => console.log(error));

        this._displayOpenSyain()
    }

}
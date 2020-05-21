// DAO・・・Data Access Object　データー アクセス オブジェクト
// 特定クラスのオブジェクトとDBとの間を取り持つクラス
class SyainDao{

    // データベースとの接続が必要
    constructor(connection){
        this._con = connection;
    }

    // 未完了のTODOを取得する
    fetchAllOpenSyain(){
        return new Promise((resolve, reject) => {
            
        this._fetchAllSyainByStatus(0,resolve,reject);
        });
    }

    // 完了のTODOを取得する
    fetchAllCompleteSyain(){
    return new Promise((resolve, reject) => {
        
        this._fetchAllSyainByStatus(1,resolve,reject);
        });
    }

    // 指定したステータスが一致するTODOをすべて取得する
    _fetchAllSyainByStatus(status,resolve,reject) {
        this._con.transaction(tx =>{

            tx.executeSql(
                    // SQLコマンド
                    "SELECT * FROM syain WHERE status = $1;",

                    // パラメーター
                    [status],

                // 成功したとき
                (tx,result)=>{
                    // データーベースにあるTODOを保持しておくためのarray
                    let syainList = [];

                    // SELECTの結果の一行一行を順番に処理していく
                    for(let i = 0; i < result.rows.length; i++){
                        let data = result.rows.item(i);

                        // 一行のデータをSyain
                        syainList.push(
                           new Syain(data.syaban,data.sei,data.mei,data.tel,data.address)
                        );
                    }
                    resolve(syainList);
                },

                // 失敗したとき
                (tx,error)=>{
                  console.log(error);
                  reject(error);
                }
            );
        });
    }

    // TODOをデータに入れる
    storeSyain(syain){
        return new Promise((resolve, reject) =>{
            // DBとの接続からトランザクションを作成します
            this._con.transaction(tx => {

                //テーブルにデータを入れるSQLコマンドの実行 
                tx.executeSql(
                    // SQLコマンド
                    'INSERT INTO syain(syaban,sei,mei,tel,address)VALUES($1,$2,$3,$4,$5)',

                    // パラメーター
                    [syain.syaban,syain.sei,syain.mei,syain.tel,syain.address],

                    // 成功したときの処理
                    (tx,result) => resolve(),

                    // 失敗したときの処理
                    (tx,error) => {
                        console.log(error);
                        reject(error);
                    }

                );
            });
        });
    }

    finishTask(taskId){
        // DBのtaskIdが一致するものをステータス1に変更する
        // ｄｂと接続
        ConnectionFactory.getConnection()
            // 接続ができたらTodoDaoを作る
            .then(connection => new SyainDao(connection))
            .then(dao => dao.completeSyain(taskId))

            .catch(error => console.log(error));
        // ステータスが０のリストを更新
        this._displayOpenSyain();

        // Todoの数を数えて表示する
        // this._updateTodosCount();
        
    }

    // TODOを完了状態にする（ステータスを１に変更）
    completeSyain(syainId){

        return new Promise((resolve,reject) => {
            this._con.transaction(tx =>{
                // SQLコマンドの実行
                tx.executeSql(
                    // SQLコマンド
                    'UPDATE syain SET status = 1 WHERE syaban = $1;',

                    // パラメーター
                    [syainId],

                    // 成功したときの処理
                    (tx,result) => resolve(),

                    // 失敗したときの処理
                    (tx,error) => {
                        console.log(error);
                        reject(error);
                    }

                );
            });

        });
    }


    // TODOをデーターベースから削除する
    removeItem(syainId){
        return new Promise((resolve,reject) => {

            // 接続からトランザクションを作成
            this._con.transaction(tx => {
                // SQLコマンドを実行
                tx.executeSql(
                    // SQLコマンド
                    'DELETE FROM syain WHERE id = $1 AND status = 1;',
                    // パラメーター
                    [syainId],
                    // 成功したとき
                    (tx,result) => resolve(),
                    // 失敗したとき
                    (tx,error) => {
                        console.log(error);
                        reject(error);
                    }
                );
            });
        });
    }

    deleteAllSyain(){

        return new Promise((resolve,reject) => {
            this._con.transaction(tx =>{
                // SQLコマンドの実行
                tx.executeSql(
                    // SQLコマンド
                    'UPDATE syain SET status = 1 WHERE status = 0;',

                    // パラメーター
                    [],

                    // 成功したときの処理
                    (tx,result) => resolve(),

                    // 失敗したときの処理
                    (tx,error) => {
                        console.log(error);
                        reject(error);
                    }

                );
            });

        });
    }

}
# サンプルAMPLIFY  

cf_temp/amplify.yaml    Amplify CFテンプレート  
front/    REACTプログラム  

フロントURL  
https://ksc.asia  独自ドメイン  
https://main.d5jyd9buwcmp8.amplifyapp.com  AMPLIFY割り当て  

  
ID kobashi  
PW Yoshizumi1+

でログイン可能　　
COGNITO認証＝APPSYNC＝DYNAMO  
DYNAMOに入っているサンプルレコードをもってきて表示。




## SSM登録コマンド  

aws ssm put-parameter \
  --name "AppSyncAPIURL" \
  --value "***********************************" \
  --type "String" \
  --region ap-northeast-1

aws ssm put-parameter \
  --name "UserPoolId" \
  --value "******************************** \
  --type "String" \
  --region ap-northeast-1

aws ssm put-parameter \
  --name "UserPoolClientId" \
  --value "*************************************" \
  --type "String" \
  --region ap-northeast-1




## CFテンプレートからAMPLIFY環境構築  

aws cloudformation deploy \
  --template-file cf_temp/amplify.yaml \
  --stack-name amplify-app-stack \
  --region ap-northeast-1 \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    AppName=amplify-react-app \
    Repository=https://github.com/kobashi-yoshizumi/amplify.git \
    BranchName=main \
    OauthToken=GITHUBに設定したPAT  



AMPLIFY環境構築は初回はAWSコマンドで手動で行う。  
それ以後はGITにPUSHすればパイプライン経由でフロント側ソースは自動デプロイされます。  



## PATの扱い    
aws cloudformation deploy　ではPATは必須  
以降のGITHUB＝＞AMPLIFYでのアプリ側デプロイ時でもPAT自体は必要  
（GIT HUB側でPAT削除するとデプロイできなくなる、テンプレから環境作り直しになる）  
  
ただしPATの中身を作りなおししても問題ない（PAT値の最生成、権限を極限までなくしても影響なし）  
  　
PATの中身まではAWSは記録していないが、初期構築に使ったPATに対して、何かの記録はしてる模様  
資料にあったパスワードを記録しないというのはそうゆう意味か？  

PAT有効期限切れたらデプロイができなくなるかは現在仕込み中（月曜日には期限が切れるようにした）  

PAT有効期限の結果が出たら追加質問予定  

PAT回答  
AMPLIFY ホスティングにPATは必須　PAT削除すると　GITHUBからデプロイ自体できなくなる。
消してはいけないPATを作る  
なお、PATの中身（権限、有効期限）などは見ていない。なので一度作ったら放置で良い

もしPATを削除してしまったら？カスタムドメインでの運用であれば復旧可能



## カスタムドメインについて
cf_temp/amplify.yaml にカスタムドメイン　ksc.asiaに対してAMPLIFYホスティング割り当てる処理を追加  

注意点  
aws cloudformation deploy で更新されるが、空デプロイでもいいので何かGITHUBから展開しないとページが出なかった  
ドメイン割り当てにやや時間がかかる（１０分程度）  


PAT消失により作り直しが必要な場合、復旧には計画停止が必要と思われる
計画停止がNGな場合、別ドメインでAMPLIFYホスティングを用意してROUTE53で割り当てを 元のドメイン書き換えるなどで対応できそうだが、
なるべくCFテンプレて環境を完結させる趣旨で考えると、やるべきではなさそう。






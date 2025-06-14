# サンプルAMPLIFY  

cf_temp/amplify.yaml    Amplify CFテンプレート  
front/    REACTプログラム  

フロントURL  
https://main.d5jyd9buwcmp8.amplifyapp.com/
  
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
以降のGITHUB＝＞AMPLIFYでのデプロイ時でもPAT自体は必要（GIT HUB側でPAT削除するとデプロイできなくなる、テンプレから環境作り直しになる）  

ただしPATの中身を作りなおししても問題ない（PAT値の最生成、権限を極限までなくしても影響なし）　
PATの中身まではAWSは記録していないが、初期構築に使ったPATに対して、何かの記録はしてる模様  
資料にあったパスワードを記録しないというのはそうゆう意味か？  

PAT有効期限切れたらデプロイができなくなるかは現在仕込み中（月曜日には期限が切れるようにした）  

PAT有効期限の結果が出たら追加質問予定





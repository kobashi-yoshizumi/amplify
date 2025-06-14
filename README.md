サンプルAMPLIFY  

cf_temp/amplify.yaml    Amplify CFテンプレート  
front/    REACTプログラム  
フロント側  
https://main.d5jyd9buwcmp8.amplifyapp.com/
  
ID kobashi  
PW Yoshizumi1+

でログイン可能　　COGNITO認証＝APPSYNC＝DYNAMO
DYNAMOに入っているサンプルレコードをもってきている。




構築手順  

SSM登録コマンド  

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






CFテンプレートからAMPLIFY環境構築

aws cloudformation deploy \
  --template-file cf_temp/amplify.yaml \
  --stack-name amplify-app-stack \
  --region ap-northeast-1 \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    AppName=amplify-react-app \
    Repository=https://github.com/kobashi-yoshizumi/amplify.git \
    BranchName=main \
    OauthToken=PAT




AMPLIFY環境構築は初回はAWSコマンドで手動で行う。
それ以後はGITにPUSHすればパイプライン経由でフロント側ソースは自動デプロイされます。






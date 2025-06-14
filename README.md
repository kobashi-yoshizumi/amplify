サンプルAMPLIFY

cf_temp/amplify.yaml    Amplify CFテンプレート
front/    REACTプログラム
フロント側
https://main.dsdx6h2rsyz5f.amplifyapp.com/

ID kobashi
PW Yoshizumi1+



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
    OauthToken=最新のPAT







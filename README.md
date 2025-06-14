構築手順

CFテンプレートでAMPLIFY環境構築

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



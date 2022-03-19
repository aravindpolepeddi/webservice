# Aravind Polepeddi NUID:002102800 webservice


- Create an organization (CSYE-6225-ORGAN)
- Create repository in the organization (webservice)
- Enable forking under settings > member privileges
- Fork the git repo to ur local branch (aravindpolepeddi)
- Clone it to your local machine
- Add an upstream which will be your org_repo  ('git remote add upstream <org repo url>')
- Add new branch  ('git checkout -b dev')
- Add code changes
- Go to org repo and compare across forks
- Create a pull req (pull from your fork dev to org main)
- Review pull req (github actions get triggered meanwhile)
- Merge changes to the main branch of the upstream
- Next we need to pull those changes to your local (switch to main branch )
- pull these changes (git pull upstream main)
- After pulling push the changes to the remote main branch ("git push origin main") 

changes for new assignent:
- added datsbase.js to connect to DB
- added respective new endpoints
- created table healthz in postgres


TestCase:
test cases written using jest and supertest. 
 Two test cases; it matches the json response body and json response status code.

 test case also written as part to github actions (use curl to hit the helthz api)

 Tech Stack:
 * Node.js
 * Express.js
 * Jest
 * Github Actions
 * prostgres (pg)
 * Github Actions 

 FOR ASSIGNMENT 4

Appropriate ports are opend for the SecurityGroup
ec2 insrtance created with packer's image id(in aws images) and keyname (to be generated for respective dev and demo accounts)
check the node and postgres shell scripst for other order ofinstallations
the packer file can be created from json or directly start with .hcl
.hcl contains a key "aws_acct_list" whose value is id of the demo account to share the image to the demo account
.hcl contains a key "zip_file" whose value is "" (empty) i.e to be taken from the github action variables
for running of the node server on startup , a node.service file is created  and systemctl started in node.sh

runner checkout code and configures aws credentials (note the variable {github.run_number} which take latest ami code)




//for converting packer's json to hcl
packer hcl2_upgrade -with-annotations ami.json

packer build -var-file=<path_to_file> <your_packer_hcl> 
//packer build -var-file='/Users/aravindpolepeddi/VSCode/CSYE6225/webservice/vars.json' ami.pkr.hcl 

with the genetaed ami..

aws cloudformation create-stack --stack-name <stack_name> --template-body <path_to_file> --parameters <path_to_file>
//aws cloudformation create-stack --profile=demo --stack-name thur-vpc2 --template-body file://csye6225-infra.yml --parameters file://config.json

aws cloudformation delete-stack --stack-name <stack_name>
// aws cloudformation delete-stack --profile=demo --stack-name thur-vpc2 
 
 //for test


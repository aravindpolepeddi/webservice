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

TestCase:
test cases written using jest and supertest. 
 Two test cases; it matches the json response body and json response status code.

 test case also written as part to github actions (use curl to hit the heltz api)

 Tech Stack:
 * Node.js
 * Express.js
 * Jest
 * Github Actions

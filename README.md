# Aravind Polepeddi NUID:002102800 webservice

- Create an organization
- Create repository i the organization
- Enable fornking under settings > member privileges
- Fork the git repo to ur local branch
- Clone it to your local machine
- Add an upstream which will be your org_repo using 'git add upstream <<org repo url>>'
- Add new branch using 'git checkout -b dev'
- Add code changes
- Go to org repo and compare across forks
- Create a pull req
- Review pull req
- Merge changes to the main branch of the upstream
- Next we need to pull those changes to the main of our remote
- Execute git pull upstream main to pull these changes (switch to main branch before this step)
- After pulling push the changes to the remote main branch using "git push origin main"
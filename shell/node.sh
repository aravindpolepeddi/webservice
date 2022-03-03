sleep 30



sudo yum update -y



sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo yum install -y nodejs



sudo yum install unzip
unzip /home/ec2-user/webservice1.zip
cd ./webservice/
npm i

sleep 10
sudo mv /home/ec2-user/node.service /etc/systemd/system/node.service

sudo systemctl enable node.service

sudo systemctl start node.service




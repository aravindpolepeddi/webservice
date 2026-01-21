# Web Service - RESTful API Application

**Author:** Aravind Polepeddi  

## Overview

This repository contains a Node.js-based RESTful web service application that provides health check endpoints and user management functionality. The application is designed to run on AWS EC2 instances with PostgreSQL database backend, deployed using custom AMIs built with Packer, and automated through GitHub Actions CI/CD pipelines.

## Architecture

The web service is part of a three-repository system:
- **[infrastructure](https://github.com/aravindpolepeddi/infrastructure)** - AWS CloudFormation templates for VPC, networking, and infrastructure
- **webservice** (this repo) - Node.js RESTful API application
- **[serverless](https://github.com/aravindpolepeddi/serverless)** - AWS Lambda functions for serverless processing

## Repository Structure

```
webservice/
├── .github/workflows/       # GitHub Actions CI/CD workflows
├── shell/                   # Shell scripts for provisioning
├── test/                    # Test files and test cases
├── api.js                   # API route definitions
├── server.js                # Express server entry point
├── database.js              # PostgreSQL database connection
├── ami.pkr.hcl             # Packer template for AMI creation
├── ami.json                 # Packer configuration (JSON format)
├── appspec.yml             # AWS CodeDeploy configuration
├── node.service            # systemd service configuration
├── config.json             # Application configuration
├── vars.json               # Packer build variables
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (pg driver)
- **Testing:** Jest, Supertest
- **CI/CD:** GitHub Actions
- **Infrastructure as Code:** Packer (HCL)
- **Deployment:** AWS CodeDeploy
- **Process Manager:** systemd

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- AWS CLI configured
- Packer installed (for AMI creation)
- GitHub account with Actions enabled

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/aravindpolepeddi/webservice.git
cd webservice
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `config.json`

4. Start the server:
```bash
node server.js
```

## API Endpoints

### Health Check
- **GET** `/healthz` - Returns server health status
  - **Success Response:** 
    - Status: 200 OK
    - Body: `{ "status": "healthy" }`

### User Management
(Additional endpoints defined in `api.js`)

## Database Setup

The application uses PostgreSQL with the following:
- Database connection configured in `database.js`
- Health check table: `healthz`
- User tables and schemas defined in migration scripts

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Cases

The test suite includes:
- Health check endpoint validation
- JSON response body verification
- HTTP status code assertions
- Database connection tests

Tests are written using:
- **Jest** - Testing framework
- **Supertest** - HTTP assertions

### CI/CD Testing

GitHub Actions automatically runs tests on every push and pull request, including:
- Unit tests with Jest
- Integration tests with curl commands
- Health check endpoint validation

## GitHub Workflow

This project follows a fork-based development workflow:

1. **Organization Setup:**
   - Organization: `CSYE-6225-ORGAN`
   - Repository: `webservice`
   - Forking enabled under Settings → Member Privileges

2. **Development Workflow:**

```bash
# Fork the organization repository to your personal account

# Clone your fork
git clone https://github.com/aravindpolepeddi/webservice.git
cd webservice

# Add upstream remote
git remote add upstream https://github.com/CSYE-6225-ORGAN/webservice.git

# Create development branch
git checkout -b dev

# Make changes and commit
git add .
git commit -m "Your changes"

# Push to your fork
git push origin dev
```

3. **Pull Request Process:**
   - Go to organization repository
   - Compare across forks
   - Create pull request from `your-fork/dev` to `org/main`
   - GitHub Actions run automatically
   - Review and merge after approval

4. **Syncing with Upstream:**

```bash
# Switch to main branch
git checkout main

# Pull changes from upstream
git pull upstream main

# Push to your fork
git push origin main
```

## AMI Creation with Packer

### Packer Configuration

The repository includes two Packer formats:
- `ami.json` - Legacy JSON format
- `ami.pkr.hcl` - Modern HCL format (recommended)

### Converting JSON to HCL

```bash
packer hcl2_upgrade -with-annotations ami.json
```

### Building AMI

```bash
packer build -var-file='vars.json' ami.pkr.hcl
```

### Key Packer Features

- **AWS Account Sharing:** Configured via `aws_acct_list` to share AMIs between dev/demo accounts
- **Automated Provisioning:** Shell scripts install Node.js, PostgreSQL, and dependencies
- **Service Configuration:** Sets up systemd service for automatic startup
- **GitHub Actions Integration:** Uses `github.run_number` for versioned AMI creation

### Shell Scripts

Located in `shell/` directory:
- `node.sh` - Installs Node.js and application dependencies
- `postgres.sh` - Configures PostgreSQL database
- Additional provisioning scripts

## Deployment

### systemd Service

The `node.service` file configures the application as a systemd service:

```bash
# Start service
sudo systemctl start node.service

# Enable on boot
sudo systemctl enable node.service

# Check status
sudo systemctl status node.service
```

### AWS CodeDeploy

The `appspec.yml` defines deployment hooks and lifecycle events for AWS CodeDeploy integration.

### CloudFormation Integration

After building AMI with Packer, deploy infrastructure:

```bash
# Create stack with new AMI
aws cloudformation create-stack \
  --profile=demo \
  --stack-name webservice-stack \
  --template-body file://../infrastructure/csye6225-infra.yml \
  --parameters file://../infrastructure/config.json
```

## Security Considerations

- Security groups configured for appropriate port access
- Database credentials managed via environment variables
- SSL/TLS certificates for HTTPS communication
- IAM roles for EC2 instances
- Secrets stored in AWS Secrets Manager (not in code)

## CI/CD Pipeline

### GitHub Actions Workflow

The `.github/workflows/` directory contains automated pipelines:

1. **On Push/PR:**
   - Checkout code
   - Install dependencies
   - Run tests with Jest
   - Health check validation with curl

2. **On Merge to Main:**
   - Build application artifact
   - Create AMI with Packer
   - Tag AMI with build number
   - Share AMI with target accounts
   - Trigger infrastructure update

3. **Variables Used:**
   - `github.run_number` - Incremental build number
   - AWS credentials from repository secrets
   - Packer variables from `vars.json`

## Configuration Files

### package.json
Defines Node.js dependencies and scripts:
- express
- pg (PostgreSQL client)
- jest
- supertest

### config.json
Application configuration including:
- Database connection strings
- Server port settings
- Environment-specific settings

### vars.json
Packer build variables:
- AWS region
- Instance type
- Source AMI
- Build metadata

## Environment Setup

### Required AWS Resources

Before deployment, ensure the following exist:
- VPC and subnets (from infrastructure repo)
- RDS PostgreSQL instance
- Security groups with proper ingress rules
- IAM roles for EC2 instances
- S3 bucket for deployment artifacts

### Environment Variables

Configure the following:
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `PORT` - Application port (default: 3000)

## Troubleshooting

### Common Issues

1. **Database Connection Fails:**
   - Verify PostgreSQL is running
   - Check security group rules
   - Validate database credentials
   - Ensure RDS instance is accessible

2. **AMI Build Fails:**
   - Check Packer logs
   - Verify AWS credentials
   - Ensure source AMI exists
   - Check shell script syntax

3. **Service Won't Start:**
   - Check systemd logs: `journalctl -u node.service`
   - Verify file permissions
   - Ensure all dependencies installed
   - Check port availability

4. **GitHub Actions Failing:**
   - Review workflow logs
   - Check repository secrets
   - Verify test assertions
   - Ensure proper AWS permissions

## Development Best Practices

1. **Branching Strategy:**
   - `main` - Production-ready code
   - `dev` - Development branch
   - Feature branches for specific changes

2. **Code Quality:**
   - Write tests for new features
   - Maintain test coverage above 80%
   - Follow ESLint rules
   - Document API endpoints

3. **Version Control:**
   - Meaningful commit messages
   - Small, focused commits
   - Regular pulls from upstream
   - Keep fork synchronized

4. **Security:**
   - Never commit credentials
   - Use environment variables
   - Rotate secrets regularly
   - Follow least privilege principle

## Related Repositories

- **Infrastructure:** [aravindpolepeddi/infrastructure](https://github.com/aravindpolepeddi/infrastructure)
- **Serverless:** [aravindpolepeddi/serverless](https://github.com/aravindpolepeddi/serverless)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit pull request to organization repository
6. Wait for CI/CD checks to pass
7. Request review from maintainers

## Support

For issues related to:
- **Application Code:** Open an issue in this repository
- **Infrastructure:** See the infrastructure repository
- **Serverless Functions:** See the serverless repository
- **Course Material:** Contact course instructors

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

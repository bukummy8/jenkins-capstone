# Jenkins DevOps Capstone

A containerized Node.js/Express API delivered through a Jenkins Continuous Integration (CI) pipeline. The project demonstrates automated dependency installation, automated tests, a Semgrep security scan, and Docker image building.

> **Current status:** The Jenkins pipeline has completed successfully, the Docker image has been built, and the containerized API has been tested locally. Docker Hub publishing, GitHub webhooks, and Kubernetes deployment are planned next steps—not yet part of the implemented workflow.

## Project highlights

- **Jenkins Pipeline as Code** using a `Jenkinsfile`
- **Automated dependency installation** with `npm ci`
- **Automated tests** using Jest and Supertest
- **Static application security testing** with Semgrep
- **Docker image build** from the pipeline
- **Express API** with health and application-information endpoints
- **Local container run** with a restart policy

## CI pipeline

The Jenkins pipeline runs these stages:

1. **Checkout** — obtains the source code from GitHub.
2. **Install Dependencies** — installs locked Node.js dependencies with `npm ci`.
3. **Run Tests** — runs the Jest test suite.
4. **Security Scan** — runs Semgrep at `ERROR` severity using its automatic ruleset.
5. **Docker Build** — builds an image tagged with the Jenkins build number, for example `jenkins-capstone:2`.

The repository is configured to use `main` and the root-level `Jenkinsfile`.

## Technology stack

- Node.js and Express
- Jest and Supertest
- Docker
- Jenkins
- Semgrep
- Git and GitHub

## Repository structure

```text
jenkins-capstone/
├── app/
│   ├── src/
│   │   └── server.js
│   ├── test/
│   │   └── server.test.js
│   ├── package.json
│   └── package-lock.json
├── Dockerfile
├── Jenkinsfile
├── .dockerignore
└── .gitignore
```

## Run locally

### Requirements

Install Node.js/npm and Docker. To run the CI pipeline, install Jenkins and ensure the Jenkins agent can access Docker and the Semgrep executable used in the `Jenkinsfile`.

### Run the tests

```bash
cd app
npm ci
npm test
```

### Build the Docker image

Run from the repository root:

```bash
docker build -t jenkins-capstone:local .
```

### Run the container

```bash
docker run -d \
  --name jenkins-capstone-app \
  -p 3000:3000 \
  --restart unless-stopped \
  jenkins-capstone:local
```

If the container name is already in use, inspect or remove the old container before creating another one.

## API endpoints

With the container running on the same machine, test the endpoints below:

| Method | Endpoint | Purpose | Expected response |
|---|---|---|---|
| `GET` | `/` | Basic application details | Application name, message, and version |
| `GET` | `/health` | Health check | `{"status":"ok"}` |
| `GET` | `/api/info` | Runtime information | Application, environment, and Node.js version |

Example checks:

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/health
curl -i http://localhost:3000/api/info
```

## Verified project results

In the demonstrated local environment:

- Jenkins version: `2.580.1`
- Java runtime: OpenJDK 21
- Jenkins build: successful
- Semgrep: 81 rules ran across 7 files, with 0 findings at the configured `ERROR` severity
- Docker image: `jenkins-capstone:2`
- Container: running on host port `3000`
- All three API endpoints returned HTTP `200`

These results describe the tested environment; they are not a guarantee that every machine will produce identical output.

## Next milestones

- [ ] Add secure Docker Hub credentials in Jenkins and publish versioned images
- [ ] Configure a GitHub webhook to trigger builds on push
- [ ] Deploy the application to a K3s Kubernetes cluster
- [ ] Add deployment verification and rollback considerations

## Security notes

- Store registry credentials in Jenkins Credentials; do not hard-code tokens or passwords in the repository or `Jenkinsfile`.
- Keep dependencies updated and review audit findings before applying potentially breaking dependency upgrades.
- The Semgrep stage currently fails on findings only according to its configured `ERROR` severity. A clean result at that severity does not prove the application is vulnerability-free.
- Do not expose Jenkins or the API publicly without appropriate authentication, network controls, and TLS.

## Author

**Amodu Ridwan Olakunmi**  
GitHub: [bukummy8](https://github.com/bukummy8)  
Repository: [jenkins-capstone](https://github.com/bukummy8/jenkins-capstone)

---

Built as a hands-on DevOps capstone to demonstrate CI automation, security scanning, and containerization.

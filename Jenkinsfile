pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                dir('app') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running application tests...'
                dir('app') {
                    sh 'npm test'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Semgrep security scan...'
                sh '''
                    /opt/semgrep-venv/bin/semgrep scan \
                        --config auto \
                        --severity ERROR \
                        .
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t jenkins-capstone:${BUILD_NUMBER} .'
            }
        }

    }

    post {
        success {
            echo 'Jenkins pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins pipeline failed. Check the stage logs.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
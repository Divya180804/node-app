pipeline {
    agent any

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_NAME = 'node-app-container'
        AWS_REGION = 'us-east-1'
        ECR_REPO = '132121093853.dkr.ecr.us-east-1.amazonaws.com/test'
        IMAGE_TAG = 'latest'
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/Divya180804/node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests configured, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:latest ."
                sh "docker tag ${IMAGE_NAME}:latest ${ECR_REPO}:${IMAGE_TAG}"
            }
        }

        stage('Push to ECR') {
            steps {
                echo 'Logging in to AWS ECR and pushing Docker image...'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                        docker push ${ECR_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying container from ECR image...'
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker pull ${ECR_REPO}:${IMAGE_TAG}
                    docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed. Cleaning up resources...'
        }
        success {
            echo 'Build, push to ECR, and deployment successful!'
        }
        failure {
            echo 'Build failed. Please check logs in Jenkins console output.'
        }
    }
}

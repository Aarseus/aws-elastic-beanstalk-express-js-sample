pipeline {
    agent {
        docker {
            image 'node:16'
            args '-u root:root'
        }
    }
    stages {
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
            }
        }
        stage ('Run Unit Test'){
            steps {
                sh 'npm test'
            }
        }
        stage ('Security Scan'){
            steps{
                sh 'npm audit --audit-level=high'
            }
        }

        stage ('Build Docker Image'){
            steps {
                script{
                    docker.build("aarseus/isec6000-assessment2:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image'){
            steps{
                script{
                   docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("aarseus/isec6000-assessment2:${env.BUILD_NUMBER}").push()
                }
            }
        }
    }
    }
}

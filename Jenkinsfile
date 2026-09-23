pipeline {
    agent none
    stages {
        stage('Install Dependencies'){
            agent { docker { image 'node:16'; args '-u root:root' } }
            steps {
                sh 'npm install'
            }
        }
        stage ('Run Unit Test'){
            agent { docker { image 'node:16'; args '-u root:root' } }
            steps {
                sh 'npm test'
            }
        }
        stage ('Security Scan'){
            agent { docker { image 'node:16'; args '-u root:root' } }
            steps{
                sh 'npm audit --audit-level=high'
            }
        }

        stage ('Build Docker Image'){
            agent any
            steps {
                script{
                    docker.build("aarseus/isec6000-assessment2:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image'){
            agent any
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

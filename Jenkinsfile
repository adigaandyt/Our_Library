/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    environment {
        ECR_LINK = '644435390668.dkr.ecr.il-central-1.amazonaws.com'
        OUTPUT_VERSION = ''
    }

    stages {
        stage('Setup environment') {
            steps {
                script {
                    if (BRANCH_NAME == 'main') { env.DEPLOY_PORT = '80' }
                    else if (BRANCH_NAME == 'staging') { env.DEPLOY_PORT = '3000' }
                    env.FULL_TAG="${BRANCH_NAME}-${BUILD_NUMBER}"
                }
            }
        }
        
        stage('Checkout Branch') {
            steps {
                script {
                    sh """
                        echo "Push from branch - ${BRANCH_NAME}"
                        echo "The full tag = ${env.FULL_TAG}"
                    """
                    checkout scm
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh """
                        docker build -t cowsay-img:${env.FULL_TAG} ${WORKSPACE}
                        if docker ps | grep -q "cowsay-cont"; then
                            echo "Stopping old cowsay- container..."
                            docker stop cowsay-cont
                        else
                            echo "cowsay container is not running."
                        fi
                        docker run --rm --detach --network=jenkins --name=cowsay-cont cowsay-img:${env.FULL_TAG}
                    """
                }
            }
        }

        //Simple curl to test it's working
        stage('Local Test') {
            steps {
                retry(2) {
                    sleep(time: 5, unit: 'SECONDS')
                    sh '''
                        curl -i cowsay-cont:8080
                    '''
                }
                sh 'docker stop cowsay-cont'
            }
        }

        //Test passed, push the image to ECR with the branch name as the version
        //TODO: add versioning along with the branch name
        //Using the amazon ECR plugin

        stage('Push To ECR') {
            steps {
                echo ">>>>>PUSH TO ECR<<<<<<<"
                withCredentials([usernamePassword(credentialsId:'ECR-REPO-LINK', usernameVariable:'ECR_SERVER')]) {
                    sh """
                        docker tag cowsay-img:${env.FULL_TAG} "${ECR_SERVER}:${env.FULL_TAG}"
                        aws ecr get-login-password --region il-central-1 | docker login --username AWS --password-stdin ${ECR_SERVER}
                        docker push ${ECR_SERVER}:$branch-$buildNum
                    """
                }
            }
        }

        // Pull on EC2 and deploy it
        stage('Deploy to EC2') {
            when { expression { return BRANCH_NAME == 'main' || BRANCH_NAME == 'staging' } }
            steps {
                echo "---------------TRYING TO DEPLOY---------------"
                withCredentials([
                        [usernamePassword(credentialsId: 'EC2_INSTANCE', usernameVariable:'EC2_SERVER')],
                        [usernamePassword(credentialsId: 'ECR-REPO-LINK', usernameVariable:'ECR_SERVER')] 
                    ]) {
                        echo "EC2 Server: $EC2_SERVER"
                        echo "ECR Server: $ECR_SERVER"
                        sshagent(['EC2-SSH-PrivateKey']) {
                            sh """
                                ssh $EC2_SERVER "docker pull $ECR_SERVER:$BRANCH_NAME-$BUILD_NUMBER"
                                ssh $EC2_SERVER "docker run -d -p $env.DEPLOY_PORT:8080 $ECR_SERVER:$BRANCH_NAME-$BUILD_NUMBER"
                            """
                        }
                    }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
            cleanWs()
        }
    }
}

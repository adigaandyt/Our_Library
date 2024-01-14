/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    environment {
        ECR_LINK = '644435390668.dkr.ecr.eu-north-1.amazonaws.com'
        OUTPUT_VERSION = ''
        IMAGE_NAME = 'ourlib-img'
        CONTAINER_NAME = 'ourlib-cont'
    }

    stages {
        stage('Setup environment') {
            steps {
                echo '++++++++++ENV SETUP++++++++++'
                script {
                    if (BRANCH_NAME == 'main') { env.DEPLOY_PORT = '80' }
                    else if (BRANCH_NAME == 'staging') { env.DEPLOY_PORT = '3000' }
                    env.FULL_TAG = "${BRANCH_NAME}-${BUILD_NUMBER}"
                }
            }
        }

        stage('Checkout Source') {
            steps {
                echo '++++++++++CHECKOUT SOURCE++++++++++'
                script {
                    sh """
                        echo "Push from branch - ${BRANCH_NAME}"
                        echo "The full tag = ${env.FULL_TAG}"
                    """
                    checkout scm
                }
            }
        }

        //Build the image and give it a pre-test tag until it passes the tests
        //Also make sure containers aren't running from previous runs
        //I could make image name and container names as variables in the compose file but there's no need
        //TODO: MAKE IT WORK WITH DOCKER COMPOSE THERES
        //TODO: FIX THE NETWORK ISSUE WITH DOCKER COMPOSE
        stage('Build') {
            steps {
                echo '++++++++++BUILD IMAGE++++++++++'
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:pre-test ${WORKSPACE}
                        if docker ps | grep -q "${IMAGE_NAME}"; then
                            echo "Stopping old test container..."
                            docker stop ${CONTAINER_NAME}
                        else
                            echo "Test container is not running."
                        fi
                        docker run --name ourlib-cont -d --rm -p 8000:8000 --network art-network ourlib-img:pre-test
                    """
                }
            }
        }

        //Simple curl to test it's working
        stage('Local Test') {
            steps {
                echo '++++++++++LOCAL UNIT TEST++++++++++'
                retry(2) {
                    sleep(time: 5, unit: 'SECONDS')
                    sh """
                        curl -i ${CONTAINER_NAME}:8000
                    """
                }
                sh "docker stop ${CONTAINER_NAME}"
            }
        }

        //Test passed, push the image to ECR with the branch name as the version
        //TODO: add versioning along with the branch name
        //Using the amazon ECR plugin

        stage('Push To ECR') {
            steps {
                echo '++++++++++PUSH ECR++++++++++'
                sh """
                    docker tag ${IMAGE_NAME}:pre-test "${ECR_LINK}/our_library:${env.FULL_TAG}"
                    aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin ${ECR_LINK}
                    docker push ${ECR_LINK}/our_library:${env.FULL_TAG}
                """
            }
        }

        // Pull on EC2 and deploy it
        // stage('Deploy to EC2') {
        //     when { expression { return BRANCH_NAME == 'main' || BRANCH_NAME == 'staging' } }
        //     steps {
        //         echo '---------------TRYING TO DEPLOY---------------'
        //         withCredentials([
        //                 [usernamePassword(credentialsId: 'EC2_INSTANCE', usernameVariable:'EC2_SERVER')],
        //                 [usernamePassword(credentialsId: 'ECR-REPO-LINK', usernameVariable:'ECR_SERVER')]
        //             ]) {
        //                 echo "EC2 Server: $EC2_SERVER"
        //                 echo "ECR Server: $ECR_SERVER"
        //                 sshagent(['EC2-SSH-PrivateKey']) {
        //                     sh """
        //                         ssh $EC2_SERVER "docker pull $ECR_SERVER:$BRANCH_NAME-$BUILD_NUMBER"
        //                         ssh $EC2_SERVER "docker run -d -p $env.DEPLOY_PORT:8080 $ECR_SERVER:$BRANCH_NAME-$BUILD_NUMBER"
        //                     """
        //                 }
        //             }
        //     }
        // }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            deleteDir()
            cleanWs()
            //sh "docker stop ${CONTAINER_NAME}"
        }
    }
}

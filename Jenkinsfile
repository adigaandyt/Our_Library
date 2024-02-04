/* groovylint-disable NestedBlockDepth */
//Top level def for the whole pipeline

pipeline {
    agent any

    environment {
        ECR_LINK = '644435390668.dkr.ecr.eu-west-1.amazonaws.com'
        REGION = 'eu-west-1'
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
                    aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ECR_LINK}
                    docker push ${ECR_LINK}/our_library:${env.FULL_TAG}
                """
            }
        }

        stage('Handle versioning') {
            steps {
                echo '++++++++++Handle new version++++++++++'
                script {
                    // Fetch tags and define initial variables
                    sh 'git fetch --tags'
                    String tagsOutput = sh(script: 'git tag', returnStdout: true).trim()
                    def tagsArray = tagsOutput.split('\n')
                    int maxPatch = 0
                    String latestTag = ''
                    String majorVersion = '' // Assuming you will set this based on the branch name or another method

                    // Find the highest patch version for the major version
                    tagsArray.each { tag ->
                        // Ensure the tag is relevant and follows semantic versioning
                        if (tag.startsWith(majorVersion)) {
                            def parts = tag.tokenize('.')
                            if (parts.size() == 3) {
                                int patchVersion = parts[2].toInteger()
                                if (patchVersion >= maxPatch) {
                                    maxPatch = patchVersion
                                    latestTag = tag
                                }
                            }
                        }
                    }

                    // Increment the patch version for the new tag
                    if (latestTag) {
                        def parts = latestTag.tokenize('.')
                        int newPatchVersion = parts[2].toInteger() + 1
                        String newTagVersion = parts[0] + '.' + parts[1] + '.' + newPatchVersion
                        println("New tag version: " + newTagVersion)
                        // Here, you can now use newTagVersion for further steps, like tagging the current commit
                    } else {
                        // Handle case where no existing tags match the majorVersion
                        println("No existing tags found for the major version: ${majorVersion}. Starting at ${majorVersion}.0.1")
                        String newTagVersion = majorVersion + ".0.1"
                        // Use this newTagVersion as needed
                    }
                }
            }
        }


        stage('Tag GIT') {
            steps {
                script {
                    echo '++++++++++Add Git Tag++++++++++'
                    sshagent(['jenkins-ssh']) {
                        sh """
                            git tag ${newTagVersion}
                            git push --tags
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
        //sh "docker stop ${CONTAINER_NAME}"
        }
    }
}

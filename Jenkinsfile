def remote = [
    name: 'test',
    host: '139.198.13.130',
    user: 'root',
    allowAnyHosts: true,
    port: 10002,
]

def remote_com = [
    name: 'prod',
    host: '139.198.14.12',
    user: 'root',
    allowAnyHosts: true,
    port: 10012,
]

pipeline {
  agent any
  options { disableConcurrentBuilds() }
  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }
  post {
    success {
      httpRequest contentType: 'APPLICATION_JSON',
        httpMode: 'POST',
        url: 'https://open-hl.feishu.cn/open-apis/bot/hook/7ddeaf8558374c58a7213cc288c4aa9a',
        requestBody: """{
          "title": "Jiker nemo ${JOB_NAME}(#${BUILD_NUMBER}) is Success",
          "text": "You can go to ${BUILD_URL} and verify the build"
        }
        """
    }
    failure {
      httpRequest contentType: 'APPLICATION_JSON',
        httpMode: 'POST',
        url: 'https://open-hl.feishu.cn/open-apis/bot/hook/7ddeaf8558374c58a7213cc288c4aa9a',
        requestBody: """{
          "title": "Jiker Nemo ${JOB_NAME} (${BUILD_NUMBER}) is Failure",
          "text": "Please go to ${BUILD_URL} and verify the build"
        }
        """
    }
  }
  stages {
    stage("Deploy Jiker Nemo VIP") {
      when { branch 'feature-dev' } 
      steps {
        withCredentials(bindings: [
          sshUserPrivateKey(credentialsId: '9c52ecc0-1295-40e8-99e5-68a3dd3fabf3',
            keyFileVariable: 'SSH_KEY_FILE')]) {
          script {
            remote.identityFile=SSH_KEY_FILE
          }

          sshCommand remote: remote, command: """
            cd /data/www/nemo
            git pull
            git checkout ${BRANCH_NAME}
            yarn
            yarn run build
            pm2 startOrRestart ecosystem.config.js
          """
        }
      }
    }
    stage("Deploy Jiker Nemo COM") {
      when { branch 'master' } 
      steps {
        withCredentials(bindings: [
          sshUserPrivateKey(credentialsId: '9c52ecc0-1295-40e8-99e5-68a3dd3fabf3',
            keyFileVariable: 'SSH_KEY_FILE')]) {
          script {
            remote_com.identityFile=SSH_KEY_FILE
          }

          sshCommand remote: remote_com, command: """
            cd /data/wwwroot/nemo
            git pull
            git checkout ${BRANCH_NAME}
            yarn
            yarn run build
            pm2 startOrRestart ecosystem.config.js
          """
        }
      }
    }
  }
}

1. 라이브러리 설치 및 환경 셋팅
   $ npm i express

2. 서버 구축 및 라우터 나누기

3. 시퀄라이즈 셋팅
   3-1. 라이브러리 설치
   $ npm i mysql mysql2 sequelize
   $ npm i -g sequelize-cli
   $ mkdir sequelize
   $ cd sequelize
   $ sequelize init

    3-2. config 설정
    3-3. 데이터 베이스 생성
    3-4. 모델 생성(sequelize_cli 사용)
    $ sequelize model:generate --name Product --attributes name:string,description:string,price:integer

    3-5. models 디렉토리와 migration 디렉토리에 파일 생성 확인
    3-6. 실행
    $ sequelize db:migrate

4. 테스트 환경 셋팅
   4-1. 라이브러리 설치 및 셋팅
   $ npm i -D jest node-mocks-http supertest

    4-2. pacakge.json 셋팅

    ```
    "scripts": {
    "test:inte": "jest --runInBand --detectOpenHandles --forceExit ./test/integration",
    "test:unit": "jest ./test/unit"
    },
    ```

    4-3. 디렉토리 설정
    $ mkdir test
    $ cd test
    $ mkdir integration
    $ mkdir unit

    4-4. jest config 파일 생성
    4-5. ./test/data 내에 임의의 Products 생성

5. 단위테스트

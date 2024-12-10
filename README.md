# PDMA (FIT2095 Assignment)

A web application (Package Delivery Management Application) developed during the completion of FIT2095 using to the MEAN stack which enables and manages assignment of packages to drivers for delivery.

#### Additional Files

* Add the following files to __*/backend*__:

    * __.env__
    ```
    GOOGLE_APPLICATION_CREDENTIALS="./google-service-account.json"
    GEMINI_API_KEY=
    ```
    * __google-service-account.json__ (for Google Cloud APIs)
    * __service-account.json__ (for Google Firebase)

#### Local Machine Hosting
* Run the following commands:
    ```shell
    cd frontend
    npm install --force
    npm run ng build
    
    cd ../backend
    npm install
    npm start
    ```

* Access the application at http://localhost:8080



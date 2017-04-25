# Free Code Camp's Build a Voting App Challenge

**tl;dr:** Voting App allows users to create polls that everyone can vote on. 

## User Stories:
1. As an authenticated user, I can keep my polls and come back later to access them.
2. As an authenticated user, I can share my polls with my friends.
3. As an authenticated user, I can see the aggregate results of my polls.
4. As an authenticated user, I can delete polls that I decide I don't want anymore.
5. As an authenticated user, I can create a poll with any number of possible items.
6. As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
7. As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
8. As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Architecture
1. The server is built on Express framework and is deployed to AWS Elastic Beanstalk to ensure scalability. It interfaces with MongoDB and exposes API that the client consumes. Additionally, we use Passport.js library to implement JWT-based authentication. 
2. The client on the other hand is developed with React+Redux using ```create-react-app``` boilerplate from Facebook. It is deployed statistically to AWS S3 and CloudFront. As static files has fewer moving parts, this method of deployment requires less maintenance and is thus cheaper.

## Run locally
Server: ```npm install && npm run dev```

Client: ```npm install && npm start```

## Deploy to AWS
### Server (Elastic Beanstalk)
Read: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html
1. Install EB CLI ```brew install awsebcli```
2. Create a repository on AWS: ```eb init --platform node.js --region us-west-2```
3. Create an environment on EB: ```eb create <APP_NAME>```
4. Create a file called ```.ebextensions/nodecommand.config``` to tell Elastic Beanstalk what command to run to deploy:
```
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
```
5. Deploy the code: ```eb deploy```
6. View your app: ```eb open```

### Client (S3 and CloudFront)
#### Build
1. Rename ```.env.example``` to ```.env``` and edit ```REACT_APP_SERVER_URL``` to your own server URL.
2. Run ```npm run build```
3. The static files are generated to ```build/``` 

#### Deploy
Using AWS Console
1. Create a S3 Bucket. In the Properties, click on Static Website Hosting tab, and choose Enable website hosting. Use index.html for the Index Document. Also, use index.html for Error Document to allow react-router library to handle routes outside root.
2. Next, on the Permissions tab, select Edit bucket policy. Generate a bucket policy. Fill your bucket name under "Resource." Your bucket name is given to you in the format: ```arn:aws:s3:::bucket_name/*```
3. Upload the content of your ```build/``` directory

Using Command Line
1. Install awscli 
2. Create your [security credentials](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html). You will be given AWS Access Key ID and AWS Secret Access Key. Download and store it somewhere safe.
3. Run ```aws configure``` and enter AWS Access Key ID and AWS Secret Access Key you received from previous step.
4. Create a bucket by running ```aws s3 mb s3://bucket-name```
5. Run ```npm run build``` if you haven't
6. Deploy by running ```aws s3 sync build/ s3://bucket-name``` 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Future Work

TODO:
1. Loading animation during fetch

## Credits

Author: [Kuriakin Zeng](http://kuriakinzeng.com)

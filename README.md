<h1><strong>Harlem Strong Screening Log Application</strong></h1>

<h2>Overview</h2>
This project's goal was to increase the efficiency and accuracy of physical data submission by Harlem Strong data collectors collecting data for the control group side of the Harlem Strong Research Study. This application was created in response to an overwrite issue that was occurring in the previous data pipeline, where data collectors would access dropbox to log their physical screening data on an excel sheet (forms completed in-person by a consumer and recorded manually by a data collector as opposed to RedCap submission). In order to solve this overwrite issue, I chose platforms that could act as effective event handlers whilst being able to handle multiple submissions at once from data collectors. This solution provided a safer way to store and submit data, along with a record of who submitted the form at the point of submission. 

In order to create an application for data submission, I used a combination of the technology below:

1. Amazon Lambda (AWS) - Used AWS Lambda for event handling and maintaining website uptime cost-effectively.
2. Amazon Cognito (AWS) - Implemented Amazon Cognito for user pool creation and password management.
3. Amazon Amplify (AWS) - Utilized AWS Amplify for hosting the front-end and deploying Git changes to the live site.
4. React (JavaScript) - Built the UI with React to match the screening form used by data collectors.
5. Python - Used Python on AWS Lambda to process data from React and submit it to RedCap via APIs
6. RedCap - Created and managed data dictionary for screening form categories to match AWS lambda fields and front-end fields

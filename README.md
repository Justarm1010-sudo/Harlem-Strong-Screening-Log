<h1><strong>Harlem Strong Screening Log Application</strong></h1>


<h2>Overview</h2>
This project’s goal was to increase the efficiency and accuracy of data submission by Harlem Strong data collectors for the control group side of the Harlem Strong Research Study. It was created to resolve an issue where data collectors were overwriting information in a shared Dropbox Excel sheet. Previously, data was manually recorded and submitted via Excel forms, leading to errors and inefficiency. To address this, I selected platforms that could handle multiple submissions from data collectors simultaneously while providing a safer and more reliable storage method. The solution also includes a record of each submission, identifying the user at the point of entry.


<h3>Stack Used:</h3>

1. Amazon Lambda (AWS) - Event handling and maintaining website uptime cost-effectively
2. Amazon Cognito (AWS) - User pool creation and password management for secure access
3. Amazon Amplify (AWS) - Hosting the front-end and automating deployment via Git
4. React (JavaScript) - Built the UI to replicate the screening form used by data collectors
5. Python - Used for processing data from React and submitting it to RedCap via APIs
6. RedCap - Created and managed the data dictionary to map screening form categories to AWS Lambda fields


<h4>Features:</h4>

1. User Interface - Collects and processes user data through a responsive screening form
2. Backend Logic: Matches and processes data based on the data dictionary before submission
3. RedCap Integration: Uploads processed data to RedCap for storage and analysis
4. Hosting: Hosts the front-end and automates deployment via Git and Amplify
5. User Pool: Manages user authentication through AWS for secure access

<h5>Project Outcomes:</h5>

1. This project was able to increase the speed of data submission by data collectors by 50% based on feedback from the data team. 
2. This project reduced data submission errors by adding dropdown options where appropriate.
3. Finally, this project was able to provide a cleaner structure for data pipeline and set foundation for data collection and submission for the active group of the study, which will be implemented in period 4.


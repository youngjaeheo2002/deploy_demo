[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/5PE5bPMX)

Our CI/CD using Github actions and Droplet for application deployment.
Implementation details and explanations are located in our report file in the main directory.
A short description of our workflow is as follow:

1. On a push to our repository, GitActions triggers our custom workflow.
2. Automated tested is ran to ensure functionality of our application to ensure that we only deploy when our application in functioning properly.
3. If the testing is succesful we rebuild our docker images which are seperated into frontend and backend and push to docker hub.
   The images are location here: https://hub.docker.com/r/youngjaeheo2002/frontend and https://hub.docker.com/r/youngjaeheo2002/backend
   We can also manually build our images if necessary by running the docker build command on the frontend and backend directories.
4. We then begin our deployment to Droplet. We SSH into the Droplet VM provided and then pull the newly built images from docker hub.
5. We then start up our backend and frontend services using docker-compose which starts up the application.
6. Done

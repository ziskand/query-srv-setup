# base image.
FROM mhart/alpine-node

#Set the working directory
WORKDIR /usr/app

# Copy everything in current directory to /server folder
ADD . /server

# Install dependencies
RUN cd /server; \
    npm install

EXPOSE 3000

# Run node 
CMD ["node", "/server/src/index.js"]
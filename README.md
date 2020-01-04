# MDX Viewer
Web client for executing MDX query against SSAS (SQL Server Analysis Service) and viewing results as pivoted grid with dimension hierarchies properly layed out. The project contains serverside WebAPI .Net 4.7.2 who's job it is to execute MDX and convert cellset to JSON suitable for web client consumption. 

# What is inside?
We have client and server side, named appropriately Client and Server-WebAPI.
* Client - is Angular CLI version 8.3.0
  * For best experience use VSCODE. There is pcv.code-workspace file to quickly get the workspace going in the commit already.
* Server-WebAPI - is .Net Framework 4.7.2 
  * .proj is developed in Visual Studio 2017, but in theory should run in 2015 and 2017+ 
  
# Get it going
## Client
* First you will need npm
* Open workspace file in Visual Studio Code and run **npm install** in the terminal. This will install all node modules you will need to run the project
* Then run **ng serve** and your client will now be running on  http://localhost:4200/ (or wherever you have it configured)

*note: node_modules are not committed in the repo, so you must run **npm install** first*

## Server
* Open the project and restore NuGet packages
* open Web.Config and specify appsettings **SSASServer** the name of your your SSAS server, and the **Database** against which the MDX queries will be executed
* Build and Run. By default we have it running on IISExpress on http://localhost:53023/ the same address is specified on the client side, if its different make sure you change the WebAPI URL on the client. You can specify a different WebAPI URL on the client app.module.ts where we instantiate MDXAPIService. Open file, Client\src\app\app.module.ts and change the ServerURL provider value to correct WebAPI URL
```
providers: [
      ApplicationService,       
      MDXApiService, 
      {provide:"ServerURL",useValue:"http://localhost:53023/"},
      {provide: ErrorHandler, useClass: GlobalErrorHandler}
    ],
```
# More details
Description of the project in more details published on 
https://www.codeproject.com/Articles/5255510/Analysis-Service-MDX-Query-Viewer-web-client

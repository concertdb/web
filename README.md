#ConcertDB - Web

I have a serious passion for live music, and as such, am a frequent visitor to archive.org to stream their vast library of free concert recordings. I thought it would be fun to build a web app that streams all of the concerts of my favorite bands on archive.org, and would also give me the ability to make playlists of my favorite concerts. 

I plan on keeping a journal of my work, and will write a short summary each day of what I accomplished, what went wrong, and what I want to accomplish the next day. Hopefully this will help me keep my work focused, and will hellp anyone who looks at the code in the future better understand why I did things the way I did.

I chose to go with Angular 1.5 for my front end for two reasons: Primarily because I knew it would be a challenge. But also because I had some familiarity with it.

## Brief Back-end Overview

Link to the backend app: (https://github.com/concertdb/api)

I recently learned about a framework called Sails JS, and was very intrigued by its flexible approach to building practical, production ready Node.js apps. It comes with a number of awesome features, like auto-generated rest apis, a very powerful ORM (Waterline), websocket support, and the fact that it is db and front-end agnostic. I built a few demo apps with it, and witnessed firsthand how relatively simple it was to set up RESTful APIs. So I thought it would be fun to use it for my final project. A few days ago I set up models and associations for Concerts, Concert Recordings, Songs, Users, and Playlists. Once I have my front-end fleshed out enough, I will connect it to the back-end to start getting data into the Postgres database.



#Day 1 - Setup

I went with (https://github.com/el-besto "el-besto's") advice on using the NG6 starter repo as a starting point. He made some slight modifications to the config, build, and testing files, as well as setting the default styling files to be LESS. He also walked me through installing Angular Material, Angular's UI framework that is an implemntation of Google's material design specifications. Below is some reference information on the NG6 starter repo that I used as a base.


### NG6 [![Join Slack](https://img.shields.io/badge/slack-join-brightgreen.svg)](https://angularclass.com/slack-join) [![Join the chat at https://gitter.im/angularclass/NG6-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angularclass/NG6-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> The de facto starter repo for building scalable apps with [Angular](https://angularjs.org), [ES6](https://git.io/es6features), and [Webpack](http://webpack.github.io/)

This repo serves as a minimal starter for those looking to get up-and-running with Angular and ES6, using [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) for the build process.
**This seed is not a Yeoman generator.** It's a minimal starter with tasks for building the boilerplate. **These are its features**:
* The best practice in directory/file organization for Angular (allowing for infinite horizontal app scaling)
* A ready-to-go build system for working with [ES6](https://git.io/es6features)
* Tasks for generating additional boilerplate Angular components
* A full testing system in place
* [Stylus](https://learnboost.github.io/stylus/) support


#### Build System
NG6 uses Gulp and Webpack together for its build system. Yes, you don't need Gulp if you're using Webpack. This is true if your build system is only responsible for file manipulation. However, ours is not.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the Angular app

**Check out the [JSPM version](https://github.com/angularclass/NG6-starter/tree/jspm)--an alternative to Webpack as an ES6 build system.**

#### File Structure
We use a componentized approach with NG6. This will be the eventual standard (and particularly helpful, if using Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe. Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it looks:
```
client
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅home/ * home component
⋅⋅⋅⋅⋅⋅⋅⋅home.js * home entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅home.component.js * home "directive"
⋅⋅⋅⋅⋅⋅⋅⋅home.controller.js * home controller
⋅⋅⋅⋅⋅⋅⋅⋅home.styl * home styles
⋅⋅⋅⋅⋅⋅⋅⋅home.html * home template
⋅⋅⋅⋅⋅⋅⋅⋅home.spec.js * home specs (for entry, component, and controller)
```

###Day 1 Challenges
No major roadblocks in the setup of the base app.

###Plan for Day 2
On day two I want to implement the Angular SoundMangaer2 module, the music player that had the most robust set of features of any Node module I found during my research.




#Day 2 - Music Player

###What I accomplished
Was able to get the music player component with a full set of buttons and functionality to successfully play music using the Angular SoundManager2 module. 

###Challenges
Setting up the SoundManager2 module was much more difficult than expected. There was very poor documentation on how to install it without using bower components. Ultimately I was able to install it by importing a specific version from github.

###Play for Day 3
Start pulling data from archive and parsing through it




#Day 3 - Handling Archive Data

###What I accompliished:
Set up the services I would need to complete the flow of data from archive.org into my db and onto the screen.
1. archiveOrgService - gets the concert from the page
2. concertService - parses the response from archive.org into a a concert object that can be saved to my db. Also iterates over all the songs and sends them to the songService for parsing.
3. songService - parses the song from the concertService and saves it to the db.
4. concertCacheService - stores the current concert and songs on the front-end.

I was able to get the archiveOrgService to pull a concert from archive.org (passing in a hardcoded concert for now), and using the concert and song services, parse that data response and display all of the information about a concert and its songs that I will need for the concert show page.

###Challenges
The biggest challenge was knowing where to start. Very early on I was able to hit the archive.org endpoint, but was very unsure about what to do with that data once I had it. 

What ended u being immensely helpful in overcoming this roadblock was drawing mockups of the data flow to determine what services to define, and what functions those services should have. Once I had that roadmap, implementing the services in the way that I wanted become much easier.

###Plan for Day 4
Continue implementing the Concert, Song, and Concert Cache services. Determine how to pull the list of concerts for a given band from archive.org.




#Day 4 - More Services



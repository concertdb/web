#ConcertDB - Web

I have a serious passion for live music, and as such, am a frequent visitor to archive.org to stream live recordings of thousands of concerts. I thought it would be fun to build a web app that streams all of the concerts of my favorite bands, and would also give me the ability to make playlists of my favorite concerts. 

I plan on keeping a journal of my work, and will write a short summary each day of what I accomplished, what went wrong, and what I want to accomplish the next day. Hopefully this will help me keep my work focused, and will hellp anyone who looks at the code in the future better understand why I did things the way I did.

I chose to go with Angular 1.5 for my front end for two reasons: Primarily because I knew it would be a challenge. But also because I had some familiarity with it (As opposed to React or Angular 2, which I haven't had the chance to learn yet... But plan on tackling in the very near future).

## Brief Back-end Overview

Link to the backend app: `https://github.com/concertdb/api`

I recently learned about a framework called Sails JS, and was very intrigued by its flexible approach to building practical, production ready Node.js apps. It comes with a number of awesome features, like auto-generated rest apis, a very powerful ORM (Waterline), websocket support, and the fact that it is db and front-end agnostic. I built a few demo apps with it, and witnessed firsthand how relatively simple it was to set up RESTful APIs. So I thought it would be fun to use it for my final project. A few days ago I set up models and associations for Concerts, Concert Recordings, Songs, Users, and Playlists. Once I have my front-end fleshed out enough, I will connect it to the back-end to start getting data into the Postgres database.

#Day 1 - Setup




<p align="center">
  <a href="https://angularclass.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/1016365/9864650/93a5660a-5b00-11e5-8716-a0d538d12913.png" alt="ng6-starter" width="100px;" >
  </a>
  <!-- old img url: http://res.cloudinary.com/angularclass/image/upload/v1431802814/ng6_vrmd60.png -->
</p>

# NG6 [![Join Slack](https://img.shields.io/badge/slack-join-brightgreen.svg)](https://angularclass.com/slack-join) [![Join the chat at https://gitter.im/angularclass/NG6-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angularclass/NG6-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> The de facto starter repo for building scalable apps with [Angular](https://angularjs.org), [ES6](https://git.io/es6features), and [Webpack](http://webpack.github.io/)

This repo serves as a minimal starter for those looking to get up-and-running with Angular and ES6, using [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) for the build process.
**This seed is not a Yeoman generator.** It's a minimal starter with tasks for building the boilerplate. **These are its features**:
* The best practice in directory/file organization for Angular (allowing for infinite horizontal app scaling)
* A ready-to-go build system for working with [ES6](https://git.io/es6features)
* Tasks for generating additional boilerplate Angular components
* A full testing system in place
* [Stylus](https://learnboost.github.io/stylus/) support


## Build System
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

## File Structure
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


# Casey

<!-- ![](https://media0.giphy.com/media/Vfbloa5iOdix2/200.gif)-->

Budgeting is a pain. I'm here to make things a little less miserable. Together, we can do anything.

### Getting started.

Midas is an app built on `node.js` and `express`, powered by `mongodb`. Node runs a server locally and remotely that allows us to do appy things like query data, edit it, submit it, sync it, etc. Mongo is our database solution. Until full integration with a fintech API is complete, we'll be serving mock data from `mongodb`.

We're also using `bower` to manage some front end libraries and `grunt` to compile `stylus` and concatonate Javascript.

To run this app locally, you'll need to install `node`, `npm`, and `mongodb` on your machine.

Once that's done, repeat these steps each time you begin working.

1. Open the command line.
2. Navigate to code/midas (or whever it's at) using `cd`.
3. Pull `master`
5. Run `npm install` (this will intall a bunch of dependencies or check if you need any new ones)
6. Run `bower install` (this will install some other dependencies)
7. Finally, run `npm run dev` which will spin up your local `node` server at http://localhost:9000/. 

Once it's running, much like `grunt`, you'll see a runtime log of what's going on.

Open a new tab in the command line to being working then run `grunt`.

To run `git` tasks, open another tab in the command line. Expect to have three tabs at all times.

### Branching

1. Look at the issue you're working on
2. Make and checkout a local branch for that issue. `git checkout -b branchname`. See naming guidelines below.
3. Code away! Commit often. 
4. Don't push until the issue is complete or code is ready for review
5. When it's complete, add files, commit, push your branch. 
6. Open github, make a Pull Request for that branch. Specify a merge to master, and a reviewer when PR is approved.

If you come back to the work later for any reason, do not reuse that same branch. Once the PR is submitted, consider it gone forever.

7. Once PR is approved. Checkout master and pull the latest `git pull origin master`

### Branch naming

nameofworkitem_yourinitials_issuenumber

Example: `globalnav_jb_5`

### Viewing on a device

1. Open System Preferences > Network. 
2. Select the active (green) network. Copy your IP address (000.00.000.00)
3. Make sure your computer and device are on the same network.
4. Navigate to http://000.00.000:9000/ on your device



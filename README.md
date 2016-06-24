# Midas

It's an app that keep you from being all like...

![](https://media0.giphy.com/media/Vfbloa5iOdix2/200.gif)

We're using `Bower` to manage libraries, `npm` to manage `Grunt`, and `Grunt` to compile `Stylus` and concatonate Javascript.

How can I use this?

1. Clone the repo.
2. Run `npm install` and `bower install`.
3. Run `grunt`.
4. Have fun. 

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

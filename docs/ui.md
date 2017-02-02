##Using UI functions

###Triggering a Snackbar

To use, you must have 3 things on your trigger element.

1. The class `Snackbar` (not it's not `SnackBar`)
2. A `data-msg` property containing the string you want to display. Keep it short and sweet. 
3. A `data-type` property of either `notif`, `error`, or `conf`

When using, be sure to use on the largest tappable element. In my included examples, I do the above two things to the `.ListItem` and not just the child text element. Usability yay! 

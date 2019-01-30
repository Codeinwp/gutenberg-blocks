workflow "Build on push" {
  resolves = ["npm build"]
  on = "push"
}

action "npm install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "npm"
  args = "install"
}

action "npm build" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["npm install"]
  runs = "npm"
  args = "run build"
}

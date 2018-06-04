let language = {

get(name) {

  let phrases = {}

  if(!!phrases[name]){
    return phrases[name]
  } else {
    return name
  }

}

}
module.exports = language;

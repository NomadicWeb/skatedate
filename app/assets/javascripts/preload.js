function preload(sources){
  var images = [];
  for(i = 0, length = sources.length; i < length; ++i){
    images[i] = new Image();
    images[i].src = sources[i];
  }
}

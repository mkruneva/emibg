var osmosis = require('osmosis');
var _ = require("lazy.js");
var moment = require("moment-timezone");
var ObjectId = require("bson-objectid");
var Rx = require("rx");
var db = require('mongoskin').db('mongodb://localhost:27017/test');

var itemStream = function(indexPage, follow, setter) {
  var stream = new Rx.Subject();
  osmosis
  .get(indexPage)
  .paginate('.cat_stranicirane > span:not(.tochki_div):first + a', '.cat_stranicirane > a:last')
  .follow(follow)
  .set(setter)
  .data(function(news) {
    stream.onNext(news);
  })
  .error(function(err) { stream.onError(err); });

  return stream;
};

var articleStream = function(indexPage, follow, titleSelector) {
  return itemStream(
    indexPage,
    follow,
    {
      "title": { "bg": titleSelector},
      "details": ".div_pod > .cat_autor",
      "html": {"bg": ".div_pod + div:html"}
    }
  );
};

var id = function(millis) {
  var timestamp = Math.floor(millis / 1000);
  var hex = ('00000000' + timestamp.toString(16)).substr(-8); // zero padding
  return new ObjectId(hex + new ObjectId().str.substring(8));
}

var handleArticle = function(article) {
  var details = article.details;
  delete article.details;

  _(details).split(",").each(function(element) {
    var element = element.trim();
    if (element.indexOf("от:") == 0) {
      article.author = {};
      article.author.bg = element.substring(3).trim();
    } else if (element.indexOf("дата:") == 0) {
      article.date = moment(element.substring(5).trim(), "DD.MM.YYYY").valueOf();
      article.publicationDate = article.date;
    }
  });
  article.id = id(article.date);
  article._id = article.id;
  article.itemId = article.id.toString(16);
  article.migrated = true;
  article.deleted = false;
  article.published = true;
  article.image = {
    "config" : {
      "fill" : true,
      "horizontalAlign" : "center",
      "verticalAlign" : "center"
    },
    "url" : "http://placehold.it/120x80"
  }
  return article;
};

var handle = function(tag) {
  return function(news) {
    var  news = handleArticle(news)
    news.category = [tag];
    return news;
  }
};

var newsStream = function() {
  return Rx.Observable.merge(
    articleStream('http://www.emi-bg.com/index.php?page=1&class=3' ,'.item_block > .cat_title > p.cat_name > a', '.news_header > p'),
    articleStream('http://www.emi-bg.com/index.php?class=6', ".initiatives_block > .cat_title > p.cat_name > a", '.initiatives_header > p')
  ).map(handle("news"))
}

var insert = function(item) {
  if (item.date > moment("10.03.2016", "DD.MM.YYYY").valueOf()) {
    console.log("I am not going to insert that because its after 10.03.2016");
    return;
  }
  db.collection('articles').insert(item, function(err, result) {
    if (err) console.log("ERROR: " + item.title.bg + JSON.stringify(err));
    if (result) console.log('SUCCESS: ' + item.title.bg);
  });
};

newsStream()
.forEach(insert, function(err) {console.log("err:" + err);});


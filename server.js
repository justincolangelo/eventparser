const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const path = require('path');
const assert = require('assert');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const xmlFeedUrl = 'https://www.himalayaninstitute.org/calendar/feed?action=tribe_photo&tribe_paged=1&tribe_event_display=photo&tribe_event_type%5B%5D=PureRejuv+Program&tribe_venues%5B%5D=32593&tribe_event_type%5B%5D=PureRejuv+Program&tribe_venues%5B%5D=32593';
let Parser = require('rss-parser');
let parser = new Parser();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/parsefeed', (req, res) => {
    // https://www.npmjs.com/package/rss-parser
    /*
        {
          "creator": "Rafe Colton",
          "title": "Finding Center: An Ayurvedic Retreat to Nourish and Balance",
          "link": "https:\/\/www.himalayaninstitute.org\/event\/finding-center-ayurvedic-retreat-nourish-balance-4\/",
          "pubDate": "Fri, 14 Sep 2018 23:00:00 +0000",
          "content:encoded": "some content about the thing",
          "dc:creator": "Rafe Colton",
          "comments": "https:\/\/www.himalayaninstitute.org\/event\/finding-center-ayurvedic-retreat-nourish-balance-4\/#respond",
          "content": "<p> [&#8230;]<\/p>\n<p>The post <a rel=\"nofollow\" href=\"https:\/\/www.himalayaninstitute.org\/event\/finding-center-ayurvedic-retreat-nourish-balance-4\/\">Finding Center: An Ayurvedic Retreat to Nourish and Balance<\/a> appeared first on <a rel=\"nofollow\" href=\"https:\/\/www.himalayaninstitute.org\">Himalayan Institute<\/a>.<\/p>\n",
          "contentSnippet": "[\u2026]\nThe post Finding Center: An Ayurvedic Retreat to Nourish and Balance appeared first on Himalayan Institute.",
          "guid": "https:\/\/www.himalayaninstitute.org\/?post_type=tribe_events&p=47940",
          "isoDate": "2018-09-14T23:00:00.000Z"
        },
    */

    (async () => {

        try {
            let feed = await parser.parseURL(xmlFeedUrl);

            feed.items.forEach(item => {
                //console.log(item.title + ':' + item.link)
            });

            return res.status(200).json(feed);
        }
        catch(error) {
            return res.status(500).json({
                success: false,
                message: 'Unable to parse RSS feed',
                error: error
            });
        }

    })();

});


let server = app.listen(3000, () => {
    console.log('started on port 3000');
});

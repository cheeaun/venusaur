const url = require('url');
const ical = require('ical-generator');

module.exports = (req, res) => {
  if (/^\/ical/.test(req.url)){
    const { query } = url.parse(req.url, true);

    try {
      const cal = ical({
        prodId: {
          company: 'cheeaun',
          product: 'venusaur',
        },
      });
      
      cal.createEvent({
        start: new Date(query.start),
        end: query.end && new Date(query.end),
        timezone: query.timezone || null,
        summary: query.summary || '',
        description: query.description || '',
        location: query.location || '',
        url: query.url || '',
      });

      if (typeof query.plain != 'undefined'){
        res.end(cal.toString());
      } else {
        cal.serve(res);
      }
    } catch (e) {
      console.error(e);
      res.end(e);
    }
  } else {
    const indexHTML = require('fs').readFileSync(__dirname + '/index.html');
    res.end(indexHTML);
  }
};
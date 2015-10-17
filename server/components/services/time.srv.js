
module.exports = function() {

  var moment = require('moment');

  function nowEpochMillis(){
    return parseInt(moment.utc().format('x'));
  }

  function formatDate(date){
    return moment.utc(date || '').format('D/D/GGGG HH:mm');
  }

  return {
    now : nowEpochMillis,
    formatDate : formatDate
  };

};

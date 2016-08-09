module.exports = (function () {
    var toOffsetedTimestring = function (date, offsetMinutes) {
        var time = new Date(date);
        time.setHours(date.getUTCHours() - offsetMinutes / 60);
        return ('0' + (time.getHours())).slice(-2) +
            ':' +
            ('0' + time.getMinutes()).slice(-2) +
            ':' +
            ('0' + time.getSeconds()).slice(-2);
    };

    return {
        toOffsetedTimestring: toOffsetedTimestring
    };
})();

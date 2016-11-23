/**
 * Created by LAPTECH on 10/22/2016.
 */
var response = {

    statusMessage: function(status) {
        switch( status ) {
            case 400:return "Bad Request";break;
            case 401:return "Incorrect username or password (or token).";break;
            case 403:return "Not Authorized";break;
            case 404:return "Not Found";break;
            case 409:return "Conflict";break;
        }
        // 200
        return "OK";
    },

    sendStandardized: function(res,status,data,message){
        status=status||200;
        message = message||response.statusMessage(status);
        data = data||{};
        data.status = status;
        data.message = message||"";
        res.status(status);
        res.json(data);
    }

};

module.exports = response;
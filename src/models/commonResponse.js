
const CommonResponse = {
    notFound: function (additional = {}) {
        return {
            error: true,
            message: 'Page not found',
            type: 404,
            data: [],
        }
    },

     internalError: function (additional = {})  {
        return {
            error: true,
            message: 'Internal server error',
            type: 500,
            info: additional,
            data: [],
        }
    },

    success: function (additional = {})  {
        return {
            error: false,
            message: 'Success',
            type: 200,
            data: additional,
        }
    },

    succededLogin: function (additional = {})  {
        return {
            error: false,
            message: 'Success',
            type: 200,
            data: additional
        }
    },


    failLogin: function(additional = {}){
        return {
            error: true,
            message: "This records doesn't match with our's records",
            type: 401,
            info: additional,
            data: [],
        }
    },

};


module.exports  = CommonResponse;
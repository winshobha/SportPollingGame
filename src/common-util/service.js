// import sportData from '../assets/data.js';

export const getAPICall =  (fetchURL, param) => {
    //console.log('fetchURL',fetchURL)
    let returnData = {}
    let responseJSON = {}
    let data =  fetch(fetchURL,
    {headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:3002/users'
        }}).then(function (response){
    //    console.log(response.json() )
        // return response.json();
    // })
    const responseStatus = response.status;
    //console.log('response---',response)
    if (responseStatus === 200) {
        try {
            console.log('response--inside 200-',response)
            responseJSON =  response.json();
            returnData.result = responseJSON;
            returnData.error = (responseStatus === 200 ? false : true);
            returnData.message = responseJSON.userMessage ? responseJSON.userMessage : 'Error Occured'
        }
        catch (exception) {
            returnData.result = responseJSON;
            returnData.error = (true);
            returnData.message = 'Error while fetching the data'
        }
    } else if (responseStatus === 500) {
        returnData.result = '';
        returnData.error = (true);
        returnData.message = 'No Results found'
    }
    return returnData;
})
}

export const createPostAPIData= (opertationtype, postURL,payload,params)=>{
    let responseData={};
    let responseJSON={}
    const requestHeaders={
        method:'POST',
        headers:{ 'Content-Type':'application/json',
        'Accept': 'application/json'},
        body:payload
    }
    let data= fetch(postURL,requestHeaders)
    const httpStatus=data.status;
    responseData.httpStatus=httpStatus;
    if(httpStatus ===204){
        responseData.result='';
        responseData.errorOccured=false;
    }else{
        responseJSON  =data.json();
        responseData.result=responseJSON;
        responseData.errorOccured=(httpStatus ===200 || httpStatus ===204 ? false:true)
        responseData.userMessage=responseJSON.userMessage ? responseJSON.userMessage:'';
        responseData.code = responseJSON.code? responseJSON :"";

    }
return responseData;
}
const request = async (
    endpoint,
    method,
    data,
) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = {
        mode: 'cors',
        method : method,
        headers: headers
    }
    
    if(method === "POST"){
        options = {
            ...options,
            body : JSON.stringify(data),
        }
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/${endpoint}`,options)
    .then(resp => resp.json())
    .catch(err => {
        console.log(err);
        return err.message;
    })

    return response;
}


export const httpClient = {
    post : async (endpoint,data = {}) => await request(endpoint,"POST",data),
    get : async (endpoint,data = {}) => await request(endpoint,"GET",data),
    delete : async (endpoint,data = {}) => await request(endpoint,"POST",data),
    put : async (endpoint,data = {}) => await request(endpoint,"PUT",data),
}
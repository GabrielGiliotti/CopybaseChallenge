export async function doRequest(url: string, method: string, headers: HeadersInit, queryValue: number, body: BodyInit | null) {
      
  if(method === "GET") 
    url = url + '?months=' + queryValue;
  
  const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });

  const result = await response.json();
  return result;
}

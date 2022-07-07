const fetchFn =  async(url, method, body)=> {
  const response = await  fetch(url, {
        method: method,
        body: JSON.stringify(
            body
        ),
        headers: {
          "Content-type": "application/json",
        },
    })
    const data = await response.json()
    return {data,response}
}

export default fetchFn 
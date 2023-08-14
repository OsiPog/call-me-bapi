const input_send = document.querySelector("input#send")
const input_base = document.querySelector("input#base")
const select_method = document.querySelector("select#method")
const input_route = document.querySelector("input#route")
const input_data = document.querySelector("input#data")
const p_result = document.querySelector("p#result")

input_base.value = localStorage.getItem("base")
const access_token =  localStorage.getItem("access_token")


input_base.addEventListener("change", () => {
    localStorage.setItem("base", input_base.value)
})

input_send.addEventListener("click", async() => {
    const request = {}
    request["method"] = select_method.value
    request["headers"] = {}
    request["headers"]["Content-type"] = "application/json"
    if (access_token) {
        request["headers"]["Authorization"] = `Bearer ${access_token}`
    }
    if (select_method.value !== "GET") {
        request["body"] = input_data.value
    }

    const response = await (await fetch(input_base.value + input_route.value, request)).json()

    p_result.innerText = JSON.stringify(response, null, 2);
    console.log(response, p_result)
})
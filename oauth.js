const input_base = document.querySelector("input#base")
const input_id = document.querySelector("input#id")
const input_secret = document.querySelector("input#secret")
const input_authorize = document.querySelector("input#authorize")

input_base.value = localStorage.getItem("base")
input_base.addEventListener("change", () => {
    localStorage.setItem("base", input_base.value)
})

input_id.value = localStorage.getItem("client_id")
input_id.addEventListener("change", () => {
    localStorage.setItem("client_id", input_id.value)
})

input_secret.value = localStorage.getItem("client_secret")
input_secret.addEventListener("change", () => {
    localStorage.setItem("client_secret", input_secret.value)
})

input_authorize.addEventListener("click", () => {
    window.location.href = input_base.value + "/oauth/authorize"
        + `?client_id=${input_id.value}`
        + `&response_type=code` // Access code
        + `&state=j1zcofU74Bv2eHFroqrwM9Tx8DsVdnmIOvNxzPZs`
})

// Check for code parameter in URL
const code = window.location.href.match(/(?<=\?code=).+?(?=&)/g)

if (code) {
    const response = await (await fetch(
        input_base.value + "/oauth/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code`
            + `&client_id=${input_id.value}`
            + `&client_secret=${input_secret.value}`
            + `&code=${code}`
    })).json()

    localStorage.setItem("access_token", response.access_token)

    window.location.replace("index.html")
}
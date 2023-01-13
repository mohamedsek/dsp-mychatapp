console.log("hello world")



let form = document.getElementById('form')
let email = document.getElementById('email')
let hashpassword = document.getElementById('hashpassword')





form.addEventListener('submit', function (e) {
    e.preventDefault()
    data = []
    var emailKey = encodeURIComponent(email);
    var emailValue = encodeURIComponent(email.value);
    data.push(emailKey + "=" + emailValue);
    var hashpasswordKey = encodeURIComponent(hashpassword);
    var hashpasswordValue = encodeURIComponent(hashpassword.value);
    data.push(hashpasswordKey + "=" + hashpasswordValue);
    //const formData = new FormData(document.querySelector('form'));
    console.log(data)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: data
    })

    /* console.log(">>>>>>>>>> we're past default behaviour")
    if (email.value && hashpassword.value) {
        console.log('>>>>>>>>>> ' + email.value + hashpassword.value)
        myHeaders = new Headers({
            "Content-Type": "text/plain"
        });
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: { email: email.value, hashpassword: hashpassword.value }
        };
        console.log(myInit.body)
        fetch('/login', myInit).then(function (response) {
            if (!response.error) {
                // sauvegarde
                console.log(response)
                window.localStorage.setItem('jwt', response.message)
            }
        })
    } */
}
)

function parseData(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);

    return {};
}

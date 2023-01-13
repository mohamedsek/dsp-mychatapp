console.log("hello world")



let form = document.getElementById('form')
let email = document.getElementById('email')
let hashpassword = document.getElementById('hashpassword')





form.addEventListener('submit', function (e) {
    e.preventDefault()
    let data = {
        email:email.value,
        hashpassword:hashpassword.value
    }
    /*
    var emailKey = encodeURIComponent(email);
    var emailValue = encodeURIComponent(email.value);
    data.push(emailKey + "=" + emailValue);
    var hashpasswordKey = encodeURIComponent(hashpassword);
    var hashpasswordValue = encodeURIComponent(hashpassword.value);
    data.push(hashpasswordKey + "=" + hashpasswordValue);

     */
    //const formData = new FormData(document.querySelector('form'));
    console.log(data)
    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        } )
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.error === false) {
            localStorage.setItem('jwt', data.message);
            window.location.href = "/"
        }
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

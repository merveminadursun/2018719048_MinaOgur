loginprogress = '0';

// $(document).ready(function () {
//     $('.header').height($(window).height());
// })


$('#newCommunity').on('click', function (e) {

    //your awesome code here
    alert("ne")
})

$('span.label-info').click(function () {
    alert("hayda")
});


function newlogin() {
    // topdialogs = '1';
    $("#newlogin_lightbox").fadeIn();
    document.getElementById('newlogin').style.display = 'block';
    $("#newlogin").animate({"top": "-30px"}, {duration: 300});
    document.getElementById('newlogin_email').focus();
}

function closenewlogin() {
    // topdialogs = '';
    document.getElementById('newlogin_error').style.display = 'none';
    $("#newlogin").animate({"top": "-1000px"}, {duration: 1000});
    $("#newlogin_lightbox").fadeOut();
}


function doNewLogin() {
    if (loginprogress == '0') {
        loginprogress = '1';
        var email = document.getElementById('newlogin_email').value;
        var password = document.getElementById('newlogin_password').value;
        if (email && password) {
            document.getElementById('newlogin_loggingin').style.display = 'block';
            document.getElementById('newlogin_form').style.display = 'none';
            jQuery.ajax({
                type: "POST", url: "/login",
                data: {"email": email, "password": password},
                success:
                    function (result) {
                        console.dir(result);
                        document.getElementById('newlogin').style.display = 'none';
                        document.getElementById('newlogin_loggingin').style.display = 'none';
                        document.getElementById('newlogin_lightbox').style.display = 'none';
                        li = document.createElement("li");
                        li.setAttribute("class", "nav-item");
                        a = document.createElement("a");
                        p = document.createTextNode( "Hello," +  result.first_name + " " + result.last_name + "!");
                        a.setAttribute("class", "nav-link");
                        a.appendChild(p)
                        li.appendChild(a);
                        ul = document.getElementById("mybar");
                        ul.appendChild(li)
                        // window.location.href = "/";
                    },
                error:
                    function (oreturn) {
                        loginprogress = '0';
                        console.dir(oreturn);
                        document.getElementById('newlogin_loggingin').style.display = 'none';
                        setTimeout('newloginerror(\'Login failed. Check your details!\');', 200);

                    }
            });

        } else {
            loginprogress = '0';
            setTimeout('newloginerror(\'Fill in e-mail and password!\');', 200);

        }
    }
}

function newloginerror(msg) {
    topdialogs = '2';
    document.getElementById('newlogin_error').style.display = 'block';
    document.getElementById('newlogin_error').innerHTML = '<div style="font-size: 23px; color:#cccccc; margin: 0px 0px 30px 0px;">' + msg + '</div><div style=""><span onclick="signuperrorclear();" class="buttonflat flatgrey">OK</span></div>';
}

function signuperrorclear() {
    document.getElementById('getaccount_error').style.display = 'none';
    document.getElementById('getaccount_error').innerHTML = '';
    document.getElementById('getaccount').style.opacity = '1';
}

function newloginerrorclear() {
    topdialogs = '1';
    document.getElementById('newlogin_loggingin').style.display = 'none';
    document.getElementById('newlogin_form').style.display = 'block';
    document.getElementById('newlogin_error').style.display = 'none';
    document.getElementById('newlogin_error').innerHTML = '';
    document.getElementById('newlogin_email').focus();
}
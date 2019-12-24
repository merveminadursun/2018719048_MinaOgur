loginprogress = '0';

loginReturn = "";
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
                        // document.getElementById('newlogin').style.display = 'none';
                        // document.getElementById('newlogin_loggingin').style.display = 'none';
                        // document.getElementById('newlogin_lightbox').style.display = 'none';
                        // li = document.createElement("li");
                        // li.setAttribute("class", "nav-item");
                        // a = document.createElement("a");
                        // p = document.createTextNode("Hello," + result.first_name + " " + result.last_name + "!");
                        // a.setAttribute("class", "nav-link");
                        // a.appendChild(p)
                        // li.appendChild(a);
                        // ul = document.getElementById("mybar");
                        // ul.appendChild(li)
                        // window.location.href = "/";
                        // node = ul.childNodes[1];
                        // ul.removeChild(node);
                        window.location.href = "/";
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

function getaccount(stage) {
    if (document.getElementById('getaccount_stage').value == '1') {
        $("#getaccount_lightbox").fadeIn();
        document.getElementById('getaccount').style.display = 'block';
        $("#getaccount").animate({"top": "-30px"}, {duration: 300});
        // getAccountDo('1');
    }
}

function closegetaccount() {
    if (parseInt(document.getElementById('getaccount_stage').value) < 2 || document.getElementById('finishsignupbutton') != null) {
        document.getElementById('getaccount_stage').value = '1';
        document.getElementById('getaccount_error').style.display = 'none';
        $("#getaccount").animate({"top": "-1000px"}, {duration: 1000});
        $("#getaccount_lightbox").fadeOut();
    }
    if (document.getElementById('finishsignupbutton') != null) {
        setTimeout('timedRefresh();', '1000');
    }
}

function getAccountDo(dostage, resume) {
    document.getElementById('getaccount').style.opacity = '0.2';
    var signup_username = '';
    var signup_email = '';
    var signup_cp = '';
    var signup_password = '';
    var signup_session = '';
    var signup_code = '';
    var signup_fullname = '';
    var signup_bio = '';
    var signup_phone = '';
    var signup_country = '';
    var create_error = 'Generic error';
    var stage = document.getElementById('getaccount_stage').value;
    var createcontinue = '';
    if (dostage == '1' || dostage == '2' || dostage == '3' || dostage == '4') {
        var logmsg = '';
        if (dostage == '1') {
            createcontinue = 'OK';
            create_error = '';
        }
        if (dostage == '2' && !resume) {
            if (document.getElementById('getaccount_email').value != '') {
                if (validateEmail(document.getElementById('getaccount_email').value)) {
                    if (document.getElementById('getaccount_password').value != '') {
                        signup_password = document.getElementById('getaccount_password').value;
                        if (signup_password.length > 7) {
                            createcontinue = 'OK';
                            create_error = '';
                            signup_username = document.getElementById('getaccount_username').value;
                            signup_email = document.getElementById('getaccount_email').value;
                            // signup_session = document.getElementById('create_session').value;
                            // signup_cp = document.getElementById('getaccount_cp').value;
                        } else {
                            create_error = 'Your password must be minimum 8 characters';
                        }
                    } else {
                        create_error = 'You haven\'t entered a password';
                    }
                } else {
                    create_error = 'You have entered an invalid e-mail address';
                }
            } else {
                create_error = 'You must enter your e-mail address';
            }
        }
        if (dostage == '2' && resume) {
            createcontinue = 'OK';
            create_error = '';
        }
        if (dostage == '3' && !resume) {
            if (document.getElementById('getaccount_code').value != '') {
                signup_code = document.getElementById('getaccount_code').value;
                createcontinue = 'OK';
                create_error = '';
            } else {
                create_error = 'Enter the code from the e-mail we sent you';
            }
        }
        if (dostage == '3' && resume) {
            createcontinue = 'OK';
            create_error = '';
        }
        if (dostage == '4') {
            if (document.getElementById('getaccount_username').value != '' && document.getElementById('getaccount_fullname').value != '' && document.getElementById('getaccount_country').value != '') {
                signup_username = document.getElementById('getaccount_username').value;
                signup_fullname = document.getElementById('getaccount_fullname').value;
                signup_country = document.getElementById('getaccount_country').value;
                signup_bio = document.getElementById('getaccount_bio').value;
                signup_phone = document.getElementById('getaccount_phone').value;
                createcontinue = 'OK';
                create_error = '';
            } else {
                create_error = 'You must select a username, enter your full name and select your country to continue';
            }
        }
    }
    if (create_error != '') {
        // ga('send', 'event', 'signup_error', create_error, 'Sign Up Error');
        signuperror(create_error);
    }
    if (createcontinue == 'OK' && create_error == '' && (signup_username !== "" && signup_email !== "")) {

        jQuery.ajax({
            type: "POST", url: "/checkuser",
            data: {"username": signup_username},
            success:
                function (result) {
                    console.dir(result);
                    jQuery.ajax({
                        type: "POST", url: "/signup",
                        data: {"email": signup_email, "password": signup_password, "username": signup_username},
                        success:
                            function (result) {
                                console.dir(result);
                                window.location.href = "/";
                            },
                        error:
                            function (oreturn) {
                                loginprogress = '0';
                                console.dir(oreturn);
                                // document.getElementById('newlogin_loggingin').style.display = 'none';
                                setTimeout('signuperror(\'Signing up failed. Check your details!\');', 200);

                            }
                    });
                },
            error:
                function (oreturn) {
                    console.dir(oreturn);
                    create_error = oreturn;
                    signuperror(oreturn.responseText);
                }
        });


        // $.ajax({
        //     type: "POST",
        //     url: "/backend/getaccount35.php",
        //     data: {
        //         stage: dostage,
        //         email: signup_email,
        //         password: signup_password,
        //         code: signup_code,
        //         session: signup_session,
        //         username: signup_username,
        //         fullname: signup_fullname,
        //         country: signup_country,
        //         cp: signup_cp,
        //         su_mode: "cZ",
        //         bio: signup_bio,
        //         phone: signup_phone
        //     },
        //     dataType: "xml",
        //     success: function (xml) {
        //         $(xml).find('root').each(function () {
        //             var status = $(this).find('status').text();
        //             var data = $(this).find('data').text();
        //             if (status == 'OK') {
        //                 document.getElementById('getaccount_stage').value = dostage;
        //                 document.getElementById('getaccount_inner').innerHTML = data;
        //                 document.getElementById('getaccount').style.opacity = '1';
        //                 if (dostage == '1') {
        //                     logmsg = 'Open Sign Up Window';
        //                     ga('send', 'event', 'signup2', logmsg, 'Signup');
        //                 }
        //                 if (dostage == '2') {
        //                     logmsg = 'Account created';
        //                     ga('send', 'event', 'signup2', logmsg, 'Signup');
        //                 }
        //                 if (dostage == '3') {
        //                     logmsg = 'Account activated';
        //                     ga('send', 'event', 'signup2', logmsg, 'Signup');
        //                 }
        //                 if (dostage == '4') {
        //                     logmsg = 'Account details saved';
        //                     ga('send', 'event', 'signup2', logmsg, 'Signup');
        //                 }
        //                 if (dostage == '1') {
        //                     document.getElementById('getaccount_email').focus();
        //                     grecaptcha.render('getaccount_c', {
        //                         'sitekey': '6LeeD8sSAAAAAKygv8XdPCWNR38NAQg3bTmtMNII',
        //                         'callback': verifyCallback,
        //                         'theme': 'dark'
        //                     });
        //                 }
        //             } else {
        //                 ga('send', 'event', 'signup_error', status, 'Sign Up Error');
        //                 signuperror(status);
        //             }
        //         });
        //     }
        // });
    } else {
        signuperror(create_error);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function signuperror(msg) {
    document.getElementById('getaccount_error').style.display = 'block';
    document.getElementById('getaccount_error').innerHTML = '<div style="font-size: 23px; color:#cccccc; margin: 0px 0px 30px 0px;">' + msg + '</div><div style=""><span onclick="signuperrorclear();" class="buttonflat flatgrey">OK</span></div>';
}

function signuperrorclear() {
    document.getElementById('getaccount_error').style.display = 'none';
    document.getElementById('getaccount_error').innerHTML = '';
    document.getElementById('getaccount').style.opacity = '1';
}

var protocol = document.location.protocol + "//";
onpopstate = function (event) {
    setupPage();
}

function setupLinks() {
    $('a.dynamiclink').unbind('click');
    $('a.dynamiclink').click(function () {
        linkcounter++;
        var loadurl = $(this).attr('href');
        setTimeout('loadP(\'' + loadurl + '\');', 50);
        if (playlistplaying) {
            startPlaylist();
        }
        return false;
    });
}

function loadP(url) {
    clearTimeout(frontpageslideshow);
    if (checkUnsavedUploads()) {
        if (url) {
            deactivateTopMenu();
            var title = 'Loading ' + url;
            history.pushState(currentPage, title, url);
            setTimeout('setupPage();', 50);
        }
    }
}

function setupPage() {
    if (linkcounter > 0) {
        hideSearch();
        var url = location.href;
        var urlsplit1 = url.split(protocol);
        var urlsplit2 = urlsplit1[1].split("/");
        var requested_uri = urlsplit2[0];
        var pathloop = 1;
        var requested_path = '';
        var requested_path_stripped = '';
        var application = '';
        while (pathloop != urlsplit2.length) {
            requested_path += '/' + urlsplit2[pathloop];
            if (pathloop == 1) {
                application = urlsplit2[pathloop];
            } else {
                if (requested_path_stripped != '') {
                    requested_path_stripped += '/';
                }
                requested_path_stripped += urlsplit2[pathloop];
            }
            pathloop++;
        }
        if (urlsplit2[3]) {
            var additionalsplit = urlsplit2[3];
            var urlsplit3 = additionalsplit.split(":");
            if (urlsplit3[2] != "front") {
                document.getElementById('welcome').style.display = 'none';
                document.getElementById('welcome2').style.display = 'none';
                document.getElementById('slideshow_name').style.display = 'none';
                upscale = defaultupscale;
            }
        } else {
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('welcome2').style.display = 'none';
            document.getElementById('slideshow_name').style.display = 'none';
            upscale = defaultupscale;
        }
        if (application == '') {
            application = 'front';
        }
        if (currentapplication == 'photo' && application != 'photo') {
            cleanup();
        }
        if (currentapplication != 'photo' && application == 'photo' && currentphoto) {
            document.getElementById('imgtarget_' + currentphoto).style.opacity = '0';
        }
        if (currentapplication != '' && currentapplication != application) {
            var bodyscrolltop = 0;
            bodyscrolltop = document.documentElement.scrollTop;
            if (bodyscrolltop == 0) {
                bodyscrolltop = document.body.scrollTop;
            }
            document.getElementById('app_x-' + currentapplication).value = bodyscrolltop;
            document.getElementById('app-' + currentapplication).style.display = 'none';
        }
        if (document.getElementById('app-' + application) == null) {
            var create_app = '<div id="app-' + application + '"><input type="hidden" id="app_title-' + application + '" value=""><input type="hidden" id="app_x-' + application + '" value="0"><input type="hidden" id="app_y-' + application + '" value="0"><input type="hidden" id="app_fullrequest-' + application + '" value=""><input type="hidden" id="app_refresh-' + application + '" value="0"><input type="hidden" id="app_toolbar-' + application + '" value="0"><div id="app_content-' + application + '"></div></div>';
            $("#main").append(create_app);
        }
        if (document.getElementById('app_fullrequest-' + application).value != requested_path || document.getElementById('app_refresh-' + application).value == '1' || application == 'upload') {
            if (sidepanel == '1') {
            }
            window.scrollTo(0, 0);
            pageloadtimer = setTimeout('startPageLoad();', 3000);
            document.getElementById('app_refresh-' + application).value = '0';
            loadData(application, requested_path, requested_path_stripped);
        } else {
            currentapplication = application;
            document.getElementById('app-' + currentapplication).style.display = 'block';
            if (parseInt(document.getElementById('app_x-' + currentapplication).value) > 0) {
                window.scrollTo(0, document.getElementById('app_x-' + currentapplication).value);
            }
            if (document.getElementById('app_title-' + currentapplication).value != '') {
                document.title = '1X - ' + document.getElementById('app_title-' + currentapplication).value;
            }
            if (document.getElementById('app_toolbar-' + currentapplication).value == 'yes') {
                setTimeout('showToolbar();', 100);
            } else {
                clearToolbar();
                hideToolbar();
            }
            if (sidepanel == '1') {
            }
            if (application == 'photo') {
                renderImage(currentphoto);
            }
        }
        ga('send', 'pageview');
    }
    linkcounter++;
}

function endPageLoad() {
    document.getElementById('pageload').style.display = 'none';
}

function loadData(application, requested_path, requested_path_stripped) {
    document.getElementById('app_content-' + application).innerHTML = '';
    $.ajax({
        type: "GET",
        url: "/backend/data.php?application=" + application + "&id=" + requested_path_stripped,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('root').each(function () {
                var data = $(this).find('data').text();
                var title = $(this).find('title').text();
                var atoolbar = $(this).find('toolbar').text();
                if (data) {
                    if (title) {
                        var settitle = ' - ' + title;
                    } else {
                        var settitle = '';
                    }
                    document.title = '1X' + settitle;
                    clearTimeout(pageloadtimer);
                    endPageLoad();
                    document.getElementById('app_content-' + application).innerHTML = data;
                    document.getElementById('app_title-' + application).value = title;
                    setupLinks();
                    if (atoolbar == 'yes') {
                        document.getElementById('app_toolbar-' + application).value = 'yes';
                        setTimeout('showToolbar();', 100);
                        updateToolbar();
                    } else {
                        clearToolbar();
                        hideToolbar();
                    }
                }
            });
        }
    });
    document.getElementById('app_fullrequest-' + application).value = requested_path;
    currentapplication = application;
    document.getElementById('app-' + currentapplication).style.display = 'block';
}
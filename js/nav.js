document.addEventListener("DOMContentLoaded", function () {

    const loadNav = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .bottomnav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                var elements = document.getElementsByClassName("menu");
                Array.from(elements).forEach(function(element) {
                    element.addEventListener('click', function(event) {
                        // Muat konten halaman yang dipanggil
                        page = element.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    const loadPage = page => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                let content = document.querySelector("#body-content");
                let hash = window.location.hash.substr(1).split("=");
                let id = parseInt(hash[1]);

                if (page === "standing") {
                    getAllStandings();
                } else if (page === "scorer") {
                    getAllScorers();
                } else if (page === "match") {
                    getMatchByDay(1);
                } else if (page === "favorite") {
                    getFavoritesTeamMatches();
                } else if (page === "team") {
                    getTeamById();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;

                    // matchday prev button
                    $("#matchday-btn-prev").on('click', function(event) {
                        event.preventDefault();
                        $('#scrollmenu').animate({
                            scrollLeft: "-=200px"
                        }, "slow");
                    });

                    // matchday next button
                    $("#matchday-btn-next").on('click', function(event) {
                        event.preventDefault();
                        $('#scrollmenu').animate({
                            scrollLeft: "+=200px"
                        }, "slow");
                    });
                    
                    // standings team click
                    $("#standings-table").on("click", "tr", function(e) {
                        if ($(e.target).is("a,input")) // anything else you don't want to trigger the click
                            return;
                        
                        $("#back").attr("data", "standing");
                        location.href = "#team=" + $(this).attr("team-id");
                        loadPage("team");
                        getTeamById();
                    });

                    // matchday next button
                    $("#back").on('click', function(event) {

                        let page = $(this).attr("data");
                        location.href = "#" + page;
                        loadPage(page);
                    });

                    // save favorite team
                    $("#save").on('click', function(event) {
                        
                        // get item
                        let item = getTeamById();

                        dbGetById(id).then(function(teams) {

                            if (teams == null) {
                                // jika tabel kosong, simpan
                                item.then(function(team) {
                                    dbInsert(team);
                                    // ubah icon star
                                    $("#save").html(`<i class="fa fa-star"></i>`);
                                    // tampilkan Toast
                                    M.toast({html: `Added successfully to favorites`})
                                });
                                
                            } else {

                                // jika tabel sudah isi

                                if (teams.id == id) {
                                    // jika tabel sudah ada data dengan id sama, hapus
                                    dbDelete(id);
                                    // ubah icon star
                                    $("#save").html(`<i class="fa fa-star-o"></i>`);
                                    // tampilkan Toast
                                    M.toast({html: `Successfully removed from favorites`})

                                } else {
                                    // jika data belum ada, simpan
                                    item.then(function(team) {
                                        dbInsert(team);
                                        // ubah icon star
                                        $("#save").html(`<i class="fa fa-star"></i>`);
                                        // tampilkan Toast
                                        M.toast({html: `Added successfully to favorites`})
                                    });
                                }
                            }
                        });

                    });

                    // check favorite icon
                    if (!isNaN(id)) {
                        dbGetById(id).then(function(teams) {
                            if (teams != null) {
                                if (teams.id == id) {
                                    $("#save").html(`<i class="fa fa-star"></i>`);
                                }
                            }
                        });
                    }

                } else if (this.status == 404) {
                    content.innerHTML = `<div id="notfound">
                                            <div class="notfound">
                                                <div class="notfound-404">
                                                    <h1>404</h1>
                                                </div>
                                                <h2 id="msg">Halaman tidak ditemukan</h2>
                                            </div>
                                        </div>`;
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
        
    }

    // load navigation
    loadNav();

    // Load page content
    var hash = window.location.hash.substr(1).split("=");
    var page = hash[0];
    if (page == "") page = "standing";
    loadPage(page);

    
});
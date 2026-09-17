// ===============================
// 南知多町観光マップ
// Google Maps API 現行読み込み方式対応版
// ===============================

let map;
let markers = [];
let infoWindows = [];

const spots = [
    {
        name: "日間賀島",
        position: {
            lat: 34.706458,
            lng: 137.005969
        },
        image: "images/himaka.jpg",
        description:
            "<div style='width:230px;'>" +
            "<h3>日間賀島</h3>" +
            "<img src='images/himaka.jpg' width='220' style='border-radius:8px;'>" +
            "<p><b>住所</b><br>愛知県知多郡南知多町日間賀島</p>" +
            "<p><b>おすすめ</b><br>タコ料理・フグ料理・海水浴</p>" +
            "</div>"
    },
    {
        name: "南知多ビーチランド",
        position: {
            lat: 34.787016,
            lng: 136.855107
        },
        image: "images/beachland.jpg",
        description:
            "<div style='width:230px;'>" +
            "<h3>南知多ビーチランド</h3>" +
            "<img src='images/beachland.jpg' width='220' style='border-radius:8px;'>" +
            "<p><b>住所</b><br>愛知県知多郡美浜町奥田428-1</p>" +
            "<p><b>おすすめ</b><br>イルカショー・アシカショー・ふれあい体験</p>" +
            "</div>"
    },
    {
        name: "観光農園 花ひろば",
        position: {
            lat: 34.7222455,
            lng: 136.9343918
        },
        image: "images/hanahiroba.jpg",
        description:
            "<div style='width:230px;'>" +
            "<h3>観光農園 花ひろば</h3>" +
            "<img src='images/hanahiroba.jpg' width='220' style='border-radius:8px;'>" +
            "<p><b>住所</b><br>愛知県知多郡南知多町豊丘高見台48</p>" +
            "<p><b>おすすめ</b><br>ひまわり・コスモス・四季の花</p>" +
            "</div>"
    }
];

// Google Maps APIからcallback=initMapで呼ばれる
function initMap() {

    const mapElement = document.getElementById("google_map");

    if (!mapElement) {
        console.error("google_map が見つかりません。");
        return;
    }

    map = new google.maps.Map(mapElement, {
        zoom: 11,
        center: {
            lat: 34.7158,
            lng: 136.9365
        },
        mapTypeId: "roadmap",
        streetViewControl: false,
        fullscreenControl: true,
        mapTypeControl: true
    });

    for (let i = 0; i < spots.length; i++) {

        const marker = new google.maps.Marker({
            position: spots[i].position,
            map: map,
            title: spots[i].name,
            animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
            content: spots[i].description
        });

        marker.addListener("click", function () {
            closeInfo();
            infoWindow.open({
                map: map,
                anchor: marker
            });
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
    }

    console.log("Google Maps 読み込み成功");
}

// 情報ウィンドウを全部閉じる
function closeInfo() {
    for (let i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
}

// jQuery処理
$(function () {

    $(".card").hide();

    $(".card").each(function (index) {
        $(this)
            .delay(index * 300)
            .fadeIn(800);
    });

    // カードをクリックすると対応するマーカーへ移動
    $(".card").click(function () {

        const index = Number($(this).attr("data-id"));

        if (!map || !markers[index]) {
            console.log("Google Mapsの読み込みを待っています。");
            return;
        }

        map.panTo(markers[index].getPosition());
        map.setZoom(14);

        closeInfo();

        infoWindows[index].open({
            map: map,
            anchor: markers[index]
        });

        $("html, body").animate({
            scrollTop: $("#map").offset().top
        }, 600);
    });

    // スライドショー
    const images = [
        "images/himaka.jpg",
        "images/beachland.jpg",
        "images/hanahiroba.jpg"
    ];

    let slide = 0;

    if ($("#slide").length > 0) {
        setInterval(function () {

            slide++;

            if (slide >= images.length) {
                slide = 0;
            }

            $("#slide").fadeOut(500, function () {
                $(this)
                    .attr("src", images[slide])
                    .fadeIn(500);
            });

        }, 3000);
    }

    // TOPボタン
    $("#topBtn").hide();

    $(window).scroll(function () {

        if ($(this).scrollTop() > 200) {
            $("#topBtn").fadeIn();
        } else {
            $("#topBtn").fadeOut();
        }
    });

    $("#topBtn").click(function () {

        $("html, body").animate({
            scrollTop: 0
        }, 600);

    });
});

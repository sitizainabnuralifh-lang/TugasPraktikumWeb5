$(document).ready(function() {

    let produk = [
        {id: 1, nama: "Sunscreen", harga: 185000, stok: 5},
        {id: 2, nama: "Toner", harga: 80000, stok: 5},
        {id: 3, nama: "Moisturaizer", harga: 125000, stok: 5},
        {id: 4, nama: "Serum", harga: 2500000, stok: 5},
        {id: 5, nama: "Whitening Cream", harga: 55000, stok: 5},
        {id: 6, nama: "Face Mist", harga: 85000, stok: 5}
    ];

    let keranjang = [];

    // Menampilkan produk
    produk.forEach(function(p) {
        let div = document.createElement("div");
        div.className = "produk";

        let nama = document.createElement("h3");
        nama.appendChild(document.createTextNode(p.nama));

        let harga = document.createElement("p");
        harga.appendChild(document.createTextNode("Rp" + p.harga));

        let stok = document.createElement("p");
        stok.appendChild(document.createTextNode("Stok: " + p.stok));

        let tombol = document.createElement("button");
        tombol.appendChild(document.createTextNode("Tambah ke Keranjang"));

        tombol.onclick = function() {
            if (p.stok > 0) {
                p.stok--;

                let item = keranjang.find(function(k) {
                    return k.id == p.id;
                });

                if (item) {
                    item.jumlah++;
                } else {
                    keranjang.push({
                        id: p.id,
                        nama: p.nama,
                        harga: p.harga,
                        jumlah: 1
                    });
                }

                tampilkanKeranjang();
                $(div).find("p").last().text("Stok: " + p.stok);
                $("#isiKeranjang").fadeIn();
            } else {
                alert("Stok produk habis!");
            }
        };

        div.appendChild(nama);
        div.appendChild(harga);
        div.appendChild(stok);
        div.appendChild(tombol);

        $("#produk").append(div);
    });

    // Menampilkan keranjang
    function tampilkanKeranjang() {
        $("#isiKeranjang").empty();

        let total = 0;
        let jumlah = 0;

        keranjang.forEach(function(item) {
            let subtotal = item.harga * item.jumlah;
            total += subtotal;
            jumlah += item.jumlah;

            let div = $("<div></div>");

            div.append(
                $("<p></p>").text(
                    item.nama + " x " + item.jumlah + " = Rp" + subtotal
                )
            );

            let tombol = $("<button>Hapus</button>");

            tombol.click(function() {
                if (confirm("Hapus produk ini?")) {
                    let p = produk.find(function(x) {
                        return x.id == item.id;
                    });

                    p.stok += item.jumlah;

                    keranjang = keranjang.filter(function(x) {
                        return x.id != item.id;
                    });

                    tampilkanKeranjang();
                    $("#isiKeranjang").fadeOut(300).fadeIn(300);

                    $("#produk .produk").each(function() {
                        let namaProduk = $(this).find("h3").text();

                        if (namaProduk == p.nama) {
                            $(this).find("p").last().text("Stok: " + p.stok);
                        }
                    });
                }
            });

            div.append(tombol);
            $("#isiKeranjang").append(div);
        });

        $("#jumlah").text("Jumlah item: " + jumlah);
        $("#total").text("Total: Rp" + total);
    }

    // Membuka dan menutup keranjang
    $("#bukaKeranjang").click(function() {
        $("#keranjang").animate({
            height: "toggle"
        });
    });

    // Mengosongkan keranjang
    $("#kosongkan").click(function() {
        if (confirm("Yakin ingin mengosongkan keranjang?")) {

            keranjang.forEach(function(item) {
                let p = produk.find(function(x) {
                    return x.id == item.id;
                });

                p.stok += item.jumlah;
            });

            keranjang = [];
            $("#isiKeranjang").empty();
            $("#jumlah").text("Jumlah item: 0");
            $("#total").text("Total: Rp0");

            $("#produk .produk").each(function() {
                let namaProduk = $(this).find("h3").text();

                let p = produk.find(function(x) {
                    return x.nama == namaProduk;
                });

                $(this).find("p").last().text("Stok: " + p.stok);
            });

            $("#isiKeranjang").fadeOut();
        }
    });

    // Checkout
    $("#checkout").click(function() {
        if (keranjang.length == 0) {
            alert("Keranjang masih kosong!");
        } else {
            let namaPembeli = prompt("Masukkan nama pembeli:");

            if (namaPembeli != null && namaPembeli != "") {
                let ringkasan = "Nama pembeli: " + namaPembeli + "\n";

                keranjang.forEach(function(item) {
                    ringkasan += item.nama + " x " + item.jumlah + "\n";
                });

                let total = 0;

                keranjang.forEach(function(item) {
                    total += item.harga * item.jumlah;
                });

                ringkasan += "Total: Rp" + total;

                $("#hasil").text(ringkasan);
            }
        }
    });

    // Pencarian produk
    $("#cari").on("keyup", function() {
        let kata = $(this).val().toLowerCase();

        $("#produk .produk").each(function() {
            let nama = $(this).find("h3").text().toLowerCase();

            $(this).toggle(nama.includes(kata));
        });
    });

});
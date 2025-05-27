  function lanjutPembayaran() {
    const metode = document.querySelector('input[name="payment"]:checked');
    if (!metode) {
      alert("Pilih salah satu metode pembayaran terlebih dahulu.");
      return;
    }

    const label = metode.nextElementSibling.nextSibling.textContent.trim().toLowerCase();

    if (label.includes("dana")) {
      window.location.href = "dana.html";
    } else if (label.includes("gopay")) {
      window.location.href = "gopay.html";
    } else if (label.includes("shopee")) {
      window.location.href = "shopee.html";
    } else if (label.includes("ovo")) {
      window.location.href = "ovo.html";
    } else if (label.includes("bri")) {
      window.location.href = "bri.html";
    } else if (label.includes("bni")) {
      window.location.href = "bni.html";
    } else if (label.includes("mandiri")) {
      window.location.href = "mandiri.html";
    }
}

    // Data tiket yang dipesan
    const tiket = {
      judul: "LILO & STITCH",
      lokasi: "BG JUNCTION CGV, REGULAR 2D, AUDI #7",
      waktu: "Senin, 26 Mei 2025, 13:40",
      kursi: "G19",
      total: "Rp39.000"
    };

    // Simpan tiket ke localStorage
    let riwayat = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
    riwayat.push(tiket);
    localStorage.setItem("riwayatPesanan", JSON.stringify(riwayat));
    localStorage.setItem("tiketUntukCetak", JSON.stringify([tiket]));

    alert("Pembayaran berhasil!");
  

  function lanjutPembayaran() {
    // Simulasi pembayaran berhasil
    const pembayaranBerhasil = true;

      // Simpan ke localStorage sebagai riwayat
      const riwayat = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
      riwayat.push(tiket);
      localStorage.setItem("riwayatPesanan", JSON.stringify(riwayat));

      // Arahkan ke halaman cetak
      window.location.href= "cetak_final.html";
      window.location.href = "cetak_gundik.html";
      window.location.href = "cetak_mission.html";
      window.location.href = "cetak_stitch.html";
      
  }


const status = localStorage.getItem("statusPembayaran");
const dataTiket = JSON.parse(localStorage.getItem("tiket"));

if (status === "berhasil" && dataTiket) {
  // tampilkan tiket
} else {
  // tampilkan peringatan: tiket tidak bisa dicetak
}

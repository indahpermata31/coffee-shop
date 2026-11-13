// ===== 1. Variabel: const (tetap) dan let (bisa berubah) =====
const header = document.querySelector('#header');
const menuBtn = document.querySelector('#menuBtn');
const menu = document.querySelector('#menu');
const daftarMenu = document.querySelector('#daftarMenu');
const jumlahEl = document.querySelector('#jumlahPesanan');
const notif = document.querySelector('#notif');
const form = document.querySelector('#form');
const formMsg = document.querySelector('#formMsg');
let jumlahPesanan = 0;                    // angka, akan bertambah

// ===== 2. Array berisi object: data menu =====
const dataMenu = [
  { nama: 'Kopi Susu Senja', kategori: 'Kopi', harga: 22000, deskripsi: 'Espresso, susu segar, gula aren.' },
  { nama: 'Americano', kategori: 'Kopi', harga: 18000, deskripsi: 'Espresso ringan yang bersih.' },
  { nama: 'V60 Manual', kategori: 'Kopi', harga: 26000, deskripsi: 'Seduh tangan, biji pilihan hari ini.' },
  { nama: 'Es Kopi Aren', kategori: 'Kopi', harga: 24000, deskripsi: 'Segar, manis alami, cocok siang hari.' },
  { nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 25000, deskripsi: 'Matcha dan susu, tanpa kafein kopi.' },
  { nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 22000, deskripsi: 'Cokelat pekat untuk sore hujan.' },
  { nama: 'Roti Bakar Keju', kategori: 'Camilan', harga: 20000, deskripsi: 'Renyah di luar, lumer di dalam.' },
  { nama: 'Croissant Almond', kategori: 'Camilan', harga: 28000, deskripsi: 'Dipanggang pagi, taburan almond.' }
];

// ===== 3. Function biasa dan arrow function =====
function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');    // 22000 menjadi Rp 22.000
}

const tambahPesanan = (nama) => {
  jumlahPesanan++;                                 // tambah 1
  jumlahEl.textContent = jumlahPesanan;            // ubah angka di badge
  notif.textContent = nama + ' ditambahkan ke pesanan.';
};

// ===== 4. Looping + kondisi + DOM manipulation: tampilkan kartu menu =====
function tampilkanMenu(kategori) {
  daftarMenu.innerHTML = '';                       // kosongkan dulu
  for (let i = 0; i < dataMenu.length; i++) {
    const item = dataMenu[i];
    if (kategori === 'Semua' || item.kategori === kategori) {   // tampilkan jika cocok
      const kartu = document.createElement('article');
      kartu.className = 'card';
      kartu.innerHTML =
        '<span class="tag ' + item.kategori.toLowerCase() + '">' + item.kategori + '</span>' +
        '<h3>' + item.nama + '</h3>' +
        '<p>' + item.deskripsi + '</p>' +
        '<div class="bawah"><span class="harga">' + formatRupiah(item.harga) + '</span>' +
        '<button class="btn">Pesan</button></div>';
      kartu.querySelector('button').addEventListener('click', () => tambahPesanan(item.nama));
      daftarMenu.appendChild(kartu);               // masukkan ke halaman
    }
  }
}
tampilkanMenu('Semua');                            // tampil pertama kali

// ===== 5. Event: tombol filter kategori =====
const tombolFilter = document.querySelectorAll('.filter-btn');
for (let i = 0; i < tombolFilter.length; i++) {
  tombolFilter[i].addEventListener('click', function () {
    for (let j = 0; j < tombolFilter.length; j++) {
      tombolFilter[j].classList.remove('aktif');   // lepas penanda aktif
    }
    tombolFilter[i].classList.add('aktif');        // pasang di tombol yang diklik
    tampilkanMenu(tombolFilter[i].dataset.kategori);
  });
}

// ===== 6. Navbar: menu HP dan bayangan saat scroll =====
menuBtn.addEventListener('click', function () {
  const terbuka = menu.classList.toggle('open');   // true = terbuka
  menuBtn.setAttribute('aria-expanded', terbuka);
});
menu.addEventListener('click', () => menu.classList.remove('open'));   // tutup setelah klik link
window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== 7. Form: kondisi if / else =====
form.addEventListener('submit', function (event) {
  event.preventDefault();                          // cegah halaman dimuat ulang
  const nama = document.querySelector('#nama').value.trim();
  const pesan = document.querySelector('#pesan').value.trim();

  if (pesan.length < 10) {
    formMsg.textContent = 'Pesan minimal 10 karakter.';
    formMsg.className = 'error';
  } else {
    formMsg.textContent = 'Terima kasih, ' + nama + '! Pesanmu sudah kami terima.';
    formMsg.className = 'ok';
    form.reset();
  }
});

// ===== 8. Tahun otomatis di footer =====
document.querySelector('#year').textContent = new Date().getFullYear();
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Cromboloni", img: "1.jpg", price: 20000 },
      { id: 2, name: "Banana Choco", img: "2.jpg", price: 14000 },
      { id: 3, name: "Japanese Roll", img: "3.jpg", price: 25000 },
      { id: 4, name: "Ice Caramel", img: "4.jpg", price: 25000 },
      { id: 5, name: "Hazelnut Choco", img: "5.jpg", price: 25000 },
      { id: 6, name: "Chocolate Cake", img: "6.jpg", price: 150000 },
      { id: 7, name: "Miror Glaze Cake", img: "7.jpg", price: 130000 },
      { id: 8, name: "Korean Cake", img: "8.jpg", price: 110000 },
      {
        id: 9,
        name: "Classic Mix Signature Cake",
        img: "9.jpg",
        price: 250000,
      },
      { id: 10, name: "Black Forest", img: "10.jpg", price: 150000 },
      { id: 11, name: "Kids Cake", img: "11.jpg", price: 200000 },
      { id: 12, name: "Frappe", img: "12.jpg", price: 25000 },
    ],
  }));

  //data shooping-card
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek barang dolo
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cari item
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
        // ini untuk menghitung quantity dari keseluruhan barang yang ada di cart
      } else {
        // jika barang su ada lia akang sama atau beda
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          }
          // jika barang sudah ada, maka tambah total
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          // selain ubah data yang sama, kita harus ubah juga keseluruhan
          return item;
          // ini untuk menghitung quantity dari sebuah item
        });
      }

      console.log(this.total);
    },
    remove(id) {
      // ambil item yang mau berdasarkan id-nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri satu2
        this.items = this.items.map((item) => {
          // kalau tidak ada datanya atau id nya skip
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout dikilik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData1 = new formData1(form);
  const data = new URLSearchParams(formData1);
  const objData = Object.fromEntries(data);
  console.log(objData);
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

document.addEventListener("DOMContentLoaded", function () {
  feather.replace(); // Ini yang mengubah <i data-feather="..."> jadi SVG
});

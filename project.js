let titles = [];
let durasi = [];
let contents = [];
let icon = [];
let images = [];

// Fungsi untuk menyimpan data ke localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("durasi", JSON.stringify(durasi));
    localStorage.setItem("contents", JSON.stringify(contents));
    localStorage.setItem("icon", JSON.stringify(icon));
    localStorage.setItem("images", JSON.stringify(images));
}

// Fungsi untuk memuat data dari localStorage
function loadDataFromLocalStorage() {
    if (localStorage.getItem("titles")) {
        titles = JSON.parse(localStorage.getItem("titles"));
        durasi = JSON.parse(localStorage.getItem("durasi"));
        contents = JSON.parse(localStorage.getItem("contents"));
        icon = JSON.parse(localStorage.getItem("icon"));
        images = JSON.parse(localStorage.getItem("images"));
    }
}

// Panggil fungsi loadDataFromLocalStorage di awal untuk mengisi data dari localStorage
loadDataFromLocalStorage();

// Fungsi untuk menambahkan proyek baru
function project(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let start = document.getElementById("startInput").value;
    let end = document.getElementById("endInput").value;
    let content = document.getElementById("content").value;
    let imageInput = document.getElementById("image").files;

    let image = imageInput.length > 0 ? URL.createObjectURL(imageInput[0]) : '';

    // Pilihan untuk mencentang option
    const checkboxes = [
        { id: "check-php", name: "./assets/php.svg" },
        { id: "check-javascript", name: "./assets/js.svg" },
        { id: "check-java", name: "./assets/java.svg" },
        { id: "check-python", name: "./assets/python.svg" }
    ];

    // Akan menampilkan centang apa yg kita pilih
    let ic = checkboxes
        .filter(checkbox => document.getElementById(checkbox.id).checked)
        .map(checkbox => checkbox.name);

    //Untuk menampilkan data array
    titles.push(title);
    durasi.push(start + end);
    contents.push(content);
    icon.push(ic);
    images.push(image);

    //Untuk menyimpan data ke local storage
    saveDataToLocalStorage();

    //Untuk menghapus form
    document.getElementById("form").reset();

    //Panggil show div untuk update list
    showdiv();
}

// Fungsi untuk menampilkan daftar proyek
function showdiv() {
    let newDiv = document.getElementById("new");
    if (!newDiv) {
        console.error('Element with id "new" not found.');
        return;
    }

    newDiv.innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
        let iconImages = icon[i].map(iconSrc => `<img src="${iconSrc}" alt="" style="width: 30px; margin: 2px;">`).join('');

        newDiv.innerHTML += `
            <div class="card" style="width: 270px; margin: 5px 10px; box-shadow: 0px 0px 5px; border-radius: 10px;">
                <a href="project.html?id=${i}" target="_blank"> 
                    <img src="${images[i]}" alt="" style="width: 230px; border-radius: 10px;">
                    <h1 style="margin: 10px 20px;"></h1>
                    <p style="margin: 10px 20px;"></p>
                    <p style="margin: 10px 20px;"></p>
                </a>
                <h1>${titles[i]}</h1>
                <p>Durasi</p>
                <p>${durasi[i]}</p>
                <p>${contents[i]}</p>
                <div class="image-card">
                    ${iconImages}
                </div>
                <div class="button-card">
                    <button class="edit-card" onclick="editProject(${i})">Edit</button>
                    <button class="delete-card" onclick="deleteProject(${i})">Delete</button>
                </div>
            </div>
        `;
    }
}

// Fungsi untuk mengedit proyek
function editProject(index) {
    window.location.href = `edit.html?id=${index}`;
}

// Fungsi untuk menghapus proyek
function deleteProject(index) {
    // Hapus item dari array berdasarkan index
    titles.splice(index, 1);
    durasi.splice(index, 1);
    contents.splice(index, 1);
    icon.splice(index, 1);
    images.splice(index, 1);

    // Simpan data yang diperbarui ke localStorage
    saveDataToLocalStorage();

    // Perbarui tampilan
    showdiv();
}

// Pastikan showdiv() dipanggil setelah DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function() {
    showdiv();
});

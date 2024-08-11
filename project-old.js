
let titles = [];
let durasi = [];
let contents = [];
let icon = [];
let images = [];

// function project(event){
//     event.preventDefault();

//     let title = document.getElementById("title").value;
//     let start = document.getElementById("startInput").value;
//     let end = document.getElementById("endInput").value;
//     let content = document.getElementById("content").value;
//     let php = document.getElementById("check-php").checked;
//     let javascript = document.getElementById("check-javascript").checked;
//     let java = document.getElementById("check-java").checked;
//     let python = document.getElementById("check-python").checked;
//     let image = document.getElementById("image").files;

//     image = URL.createObjectURL(image[0]);
//     console.log(image);

//     const grup = {
//         title, 
//         start,
//         end,
//         content,
//         php,
//         javascript,
//         java,
//         python,
//     };


//     // show.push(grup);

//     // addproject();

// }


function project(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let start = document.getElementById("startInput").value;
    let end = document.getElementById("endInput").value;
    let content = document.getElementById("content").value;
    let image = document.getElementById("image").files;

    image = URL.createObjectURL(image[0]);
    console.log(image);

    // Initialize an array of objects to check the checkboxes
    const checkboxes = [
        { id: "check-php", name: "./assets/php.svg" },
        { id: "check-javascript", name: "./assets/js.svg" },
        { id: "check-java", name: "./assets/java.svg" },
        { id: "check-python", name: "./assets/python.svg" }
    ];

    // Map through the checkboxes and add the name to icon array if checked
    let ic = checkboxes
        .filter(checkbox => document.getElementById(checkbox.id).checked)
        .map(checkbox => checkbox.name);

    // const group = {
    //     title, 
    //     start,
    //     end,
    //     content,
    //     icon,
    //     image
    // };

    // Push the group object to your arrays
    titles.push(title);
    durasi.push(start + end);
    contents.push(content);
    icon.push(ic);
    images.push(image);

    console.log(titles);
    console.log(durasi);
    console.log(contents);
    console.log(icon);
    console.log(images);

    // Call addProject or other functions as needed
    addproject();

    document.getElementById("form").reset()
}


// function addproject(){
//     document.getElementById("new").innerHTML = "";

//     for(let i = 0; i< titles.length; i++){
//         document.getElementById("new").innerHTML += `
// <div class="card" style="width: 270px; margin: 5px 10px; box-shadow: 0px 0px 5px; border-radius: 10px;">
//     <a href="project.html?id=${i}" target="_blank"> 
//         <!-- comment -->
//         <img src="${images[i]}" alt="" style="width: 230px; border-radius: 10px;">
//         <h1 style="margin: 10px 20px;"></h1>
//         <p style="margin: 10px 20px;"></p>
//         <p style="margin: 10px 20px;"></p>
//     </a>
//     <h1>${titles[i]}</h1>
//     <p>Durasi</p>
//     <p>${durasi[i]}</p>
//     <div class="image-card">
//         <img src="./assets/app-store-brands-solid.svg" alt="">
//         <img src="./assets/java-brands-solid.svg" alt="">
//         <img src="./assets/html5-brands-solid.svg" alt="">
//     </div>
//     <div class="button-card">
//         <button class="edit-card">Edit</button>
//         <button class="delete-card">Delete</button>
//     </div>
// </div>
// `
//     }
// }

function editProject(index) {
    window.location.href = `edit.html?id=${index}`;
}

function addproject() {
    document.getElementById("new").innerHTML = "";

    for (let i = 0; i < titles.length; i++) {
        let iconImages = icon[i].map(iconSrc => `<img src="${iconSrc}" alt="" style="width: 30px; margin: 2px;">`).join('');

        document.getElementById("new").innerHTML += `
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
                    <button class="delete-card">Delete</button>
                </div>
            </div>
        `;
    }
}



{/* <div class="card">
        <a href="project.html?id=${i}" target="_blank">
            <img src="${blog[i].image}" alt="">
        </a>
        <h1>${blog[i].project}</h1>
        <p class="text-secondary">Durasi : ${blog[i].duration}</p>
        <p>${blog[i].description}</p>
        <div class="image-card">
            <img src="image/ps.png" alt="">
            <img src="image/android.png" alt="">
            <img src="image/java.png" alt="">
        </div>
        <p class="text-end text-secondary">${getDistanceTime(blog[i].date)}</p>
        <div class="button-card">
            <a href="#" class="edit-card">Edit</a>
            <a href="#" class="delete-card">Delete</a>
        </div>
    </div> */}
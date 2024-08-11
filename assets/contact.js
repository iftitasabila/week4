function getData() {
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let number = document.getElementById("phoneNumberInput").value;
    let subject = document.getElementById("subject").value;
    let address = document.getElementById("address").value;


    console.log(name);
    console.log(email);
    console.log(number);
    console.log(subject);
    console.log(address);


    document.getElementById("nameInput").value = "";
  
}
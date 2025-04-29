function maskPassword(pass) {
    return "*".repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        const alertEl = document.getElementById("alert");
        alertEl.style.display = "inline-block";
        alertEl.style.animation = "pop 0.5s ease";
        setTimeout(() => {
            alertEl.style.display = "none";
        }, 2000);
    }).catch(() => {
        alert("Clipboard copying failed!");
    });
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data) || [];
    let updatedArr = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(updatedArr));
    alert(`Successfully deleted password for ${website}`);
    showPasswords();
}

const showPasswords = () => {
    const tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        tb.innerHTML = `
            <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;
        let arr = JSON.parse(data);
        let str = arr.map(element => `
            <tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`).join("");
        tb.innerHTML += str;
    }
}

document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));
    alert("Password Saved!");
    showPasswords();
    e.target.reset();
});

// Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

console.log("Password Manager Loaded Successfully!");
showPasswords();

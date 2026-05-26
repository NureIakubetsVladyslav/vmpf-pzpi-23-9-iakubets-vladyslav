const fs = require("fs");

const data = {

    student: {
        name: "Владислав",
        age: 19,
        city: "Dnipro"
    },

    hobbies: [
        "Програмування",
        "Ігри",
        "Музика"
    ],

    university: {
        name: "ХНУРЕ",
        group: "ПЗПІ-23-9",
        course: 3
    }
};

const jsonData = JSON.stringify(data, null, 4);

fs.writeFileSync(
    "student.json",
    jsonData,
    "utf8"
);

console.log("JSON-файл успішно створено.");
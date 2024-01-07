let addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

const months = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie",
    "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Adauga un Note";
    popupTitle.innerText = "Adauga un nou Note";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    })
}

async function deleteNote(noteId) {
    let confirmDel = confirm("Esti sigur ca vrei sa stergi acest Note ?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    await fetch('/api/', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'db_id': noteId,
        }),
    });

    showNotes();
}

async function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Actualizare Note";
    popupTitle.innerText = "Actualizeaza un Note";
    console.log(noteId, title, desc);
    console.log(updateId);
}

addBtn.addEventListener("click", async e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        console.log(noteInfo);

        if (!isUpdate) {
            notes.push(noteInfo);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/api/", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('Server response:', xhr.responseText);
                }
            };

            xhr.send(JSON.stringify({
                'db_id': notes.length - 1,
                'db_title': noteTitle,
                'db_description': noteDesc,
                'db_time': `${month} ${day}, ${year}`,
            }));
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
            var xhr = new XMLHttpRequest();
            xhr.open('PATCH', "/api/", true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('Server response:', xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({
                'db_id': updateId,
                'db_title': noteTitle,
                'db_description': noteDesc,
            }));
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();

        showNotes();
    }
});

async function refresh_notes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

            } else {
                console.error('Error:', xhr.status, xhr.statusText);
            }
        } else {
            document.getElementsByClassName("wrapper")[0].innerHTML = "";
            document.getElementsByClassName("wrapper")[0].insertAdjacentHTML("afterbegin", `
    <li class="add-box">
      <div class="icon">
        <i class="uil uil-plus"></i>
      </div>
      <p>Adauga o noua notita !</p>
    </li>`);
            addBox = document.querySelector(".add-box");
            addBox.addEventListener("click", () => {
                titleTag.focus();
                popupBox.classList.add("show");
            });
            const data = JSON.parse(xhr.responseText);
            data.message.forEach((note) => {
                let liTag = `<li class="note">
                        <div class="details">
                            <p>${note[1]}</p>
                            <span>${note[2]}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note[3]}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                <li onclick="updateNote(${note[0]}, '${note[1]}', '${note[2]}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteNote(${note[0]})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
                addBox.insertAdjacentHTML("afterend", liTag);
            });
        }
    };
    xhr.send();
}
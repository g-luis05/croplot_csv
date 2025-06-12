// TESTING 

const btnAddForm = document.getElementById('add-form-btn');
//pop-up1
const popUp1 = document.getElementById('pop-up1');
const ttBtnAdd = document.getElementById('tt-button-add');
const ttBtnDel = document.getElementById('tt-button-del');
let ttNameSection = document.getElementById('tt-names');
let structureForm = document.getElementById('structure-form');
const cancelBtn1 = document.getElementById('cancel-btn1');
//popup2
const popUp2 = document.getElementById('pop-up2');
const dataForm = document.getElementById('data-form');
const addData = document.getElementById('data-btn-add');
const quitData = document.getElementById('data-btn-del');
const dataNameSection = document.getElementById('data-names');
const cancelBtn2 = document.getElementById('cancel-btn2');
//popup 3
const popUp3 = document.getElementById('pop-up3');
const delFormatBtn = document.getElementById('del-format-btn');
const cancelDelBtn = document.getElementById('cancel-del-format');
//popup 4
const popUp4 = document.getElementById('pop-up4');
const cloneForm = document.getElementById('clone-name');
const newName = document.getElementById('clone-name-input');
const confirmNewClone = document.getElementById('confirm-new-clone');
const cancelNewClone = document.getElementById('cancel-new-clone');
// popup 5
const popUp5 = document.getElementById('pop-up5');
const confirmDownload = document.getElementById('confirm-download');
const cancelDownload = document.getElementById('cancel-download');

//formats
let formatSection = document.getElementById('forms');




// SAVED FORMATS

let savedFormatsStr = localStorage.getItem('savedFormats'); 
let savedFormats = JSON.parse(savedFormatsStr) 

let formats = savedFormats || []; //If there is not saved formats before, it will be an empty array

//BUILD THE SAVED FORMATS

formats.forEach(format => {
    buildFormat(format, false);
})


// START POP-UP 1 ACTIONS

btnAddForm.addEventListener('click', () => {
    popUp1.style.display = 'flex';
});

ttBtnAdd.addEventListener('click', () => {
    const label = document.createElement('label');
    label.className = "label";
    label.textContent = "Nombre del tratamiento";

    const input = document.createElement('input');
    input.type = "text";
    input.className = "input";
    input.placeholder = "Ingresar nombre de Tto.";
    input.required = true;

    label.appendChild(input);
    ttNameSection.appendChild(label);
});

ttBtnDel.addEventListener('click', ()  => {
    const labels = ttNameSection.querySelectorAll('label');
    const lastLabel = labels[labels.length - 1];

    if (lastLabel) {
        ttNameSection.removeChild(lastLabel);
    }

});

//SUBMIT POP-UP1

let temporalData = null;

structureForm.addEventListener('submit', event => {
    event.preventDefault();

    const formName = document.getElementById('form-name').value.trim();
    const blockNumber = parseInt(document.getElementById('block-number').value);
    const repsNumber = parseInt(document.getElementById('rep-number').value);

    const ttInputs = ttNameSection.querySelectorAll('input');
    const tt = [];


    ttInputs.forEach(input => {
        let value = input.value.trim();
        if (value !== '') {
            tt.push(value);
        }
    });

    if (tt.length === 0) {
        //popup advertise
        alert("Debe ingresar al menos un tratamiento");
        return;
    };


    const info = {
        id: idGenerator(),
        name: formName,
        blocks: blockNumber,
        treatments: tt,
        reps: repsNumber,
        var: null
    };

    temporalData = info;
    //Save temporary info. If user finishes the pop-up2, then push into the original data. If not, then, delete it and don't push it


    structureForm.reset();
    ttNameSection.innerHTML = "";
    popUp1.style.display = "none";
    popUp2.style.display = "flex";
});

cancelBtn1.addEventListener('click', () => {
    temporalData = null;
    structureForm.reset();
    ttNameSection.innerHTML = "";
    popUp1.style.display = "none";
});

// END OF POP-UP 1 ACTIONS


// POP-UP 2 ACTIONS

addData.addEventListener('click', () => {
    const label = document.createElement('label');
    label.className = "label";
    label.textContent = "Nombre de la variable";

    const input = document.createElement('input');
    input.type = "text";
    input.className = "input";
    input.placeholder = "Ej: Senescencia, biomasa/parcela (kg)";
    input.required = true;

    label.appendChild(input);
    dataNameSection.appendChild(label);
});

quitData.addEventListener('click', () => {
    let labels = dataNameSection.querySelectorAll('label');
    let lastLabel = labels[labels.length - 1];
    if (labels.length > 0) {
        dataNameSection.removeChild(lastLabel);
    }
});

// POP UP 2 SUBMIT

dataForm.addEventListener('submit', event => {
    event.preventDefault();

    const varInputs = dataNameSection.querySelectorAll('input');
    const variables = [];

    varInputs.forEach(variable => {
        let value = variable.value.trim();
        if (value !== "") {
            variables.push(value);
        }
    });

    if (variables.length === 0) {
        //POPUP ADVERTISE
        alert("Debe ingresar al menos una variable!");
        return;
    };

    if (temporalData) {
        temporalData.var = variables;
    };

    dataForm.reset();
    dataNameSection.innerHTML = "";
    popUp2.style.display = "none";
    console.log(temporalData);
    const localData = temporalData;

    // DATA TOOK UNTIL HERE

    //BUILD FORMAT
    buildFormat(localData, true);

    temporalData = null;
});


cancelBtn2.addEventListener('click', () => {
    temporalData = null;
    dataNameSection.innerHTML = "";
    dataForm.reset();
    popUp2.style.display = "none";
});


function buildFormat(data, saved = true) {

    //BUTTONS

    //TO DELETE THE FORMAT
    const delFormat = document.createElement('button')
    delFormat.type = "button";
    delFormat.className = "btn-delete";
    delFormat.textContent = "Eliminar formato";

    //TO CLONE THE FORMAT
    const cloneFormat = document.createElement('button')
    cloneFormat.type = "button";
    cloneFormat.className = "btn-clone";
    cloneFormat.textContent = "Clonar formato";

    //TO SUBMIT THE FORMAT
    const submitFormat = document.createElement('input');
    submitFormat.type = "submit";
    submitFormat.className = "btn-submit-format";
    submitFormat.value = "Descargar CSV";

    //BUTTONS ORGANIZE

    const formatBtnOrg = document.createElement('div');
    formatBtnOrg.className = "format-btn-group";
    formatBtnOrg.style.display = "none";
    formatBtnOrg.appendChild(cloneFormat);
    formatBtnOrg.appendChild(delFormat);
    formatBtnOrg.appendChild(submitFormat);
    
    //FORMAT
    const formatContainer = document.createElement('div');
    formatContainer.className = "format-container";
    
    const titleContainer = document.createElement('div');
    titleContainer.className = "title-container";

    const title = document.createElement('h3');
    title.textContent = `${data.name}`;
    titleContainer.appendChild(title)

    const cardContainer = document.createElement('div');
    cardContainer.className = "card-container";
    cardContainer.style.display = "none";

    formatContainer.appendChild(titleContainer);
    formatContainer.appendChild(cardContainer);

    data.treatments.forEach((tt, index) => {
        for (let block = 1; block <= data.blocks; block++) {
            for (let rep = 1; rep <= data.reps; rep++) {
                const formatCard = document.createElement('div');
                formatCard.className = "card";

                const cardHeader = document.createElement('div');
                cardHeader.className = "card-header";
                cardHeader.textContent = `${tt} - Bloque ${block} - Réplica ${rep}`;
                
                const cardBody = document.createElement('form');
                cardBody.className = "card-body";
                cardBody.style.display = "none";

                cardHeader.onclick = () => {
                    cardBody.style.display = cardBody.style.display === "none" ? "flex" : "none";
                };


                data.var.forEach((variable, position) => {
                    const input = document.createElement('input');
                    input.type = "number";
                    input.className = "input-format";
                    input.placeholder = variable;
    
                    //localStorage by input
                    const code = `${data.id}_tt${index + 1}_b${block}_var${position + 1}_rep${rep}`; //SAVE INPUTS EVEN WHEN RELOADING 
                    input.value = localStorage.getItem(code) || "";
                    input.addEventListener('input', () => {
                        localStorage.setItem(code, input.value);
                    }); 
                    
                    input.dataset.code = code; //Catch info to use it after - DATASET 
                    cardBody.appendChild(input);
                });
                

                formatCard.appendChild(cardHeader);
                formatCard.appendChild(cardBody);
                cardContainer.appendChild(formatCard);
                formatContainer.appendChild(cardContainer);
            }
        };
        
        //DOWNLOAD CSV, CLONE FORMAT AND DELETE FORMAT SECTION ------------- IMPORTANT ----------------------

        submitFormat.onclick = () => {
        
            popUp5.style.display = "flex";

            confirmDownload.onclick = () => {
                let csvTitles = "Tratamiento,Bloque,Réplica," + data.var.join(",") + "\n";

                data.treatments.forEach((treatment, ttIndex) => {
                    for (let block = 1; block <= data.blocks; block++) {
                        for (let rep = 1; rep <= data.reps; rep++) {

                            const row = [treatment, block, rep];

                            data.var.forEach((v, i) => {
                                const code = `${data.id}_tt${ttIndex + 1}_b${block}_var${i + 1}_rep${rep}`;
                                row.push(localStorage.getItem(code) || "");
                            });
                            csvTitles += row.join(",") + "\n"; //ROWS ARE THE INPUTED VALUES BY USER
                        };
                        
                    };
                });

                // blobs 
                console.log(csvTitles);
                const bom = '\uFEFF'
                const blob = new Blob([bom + csvTitles], {type: "text/csv" });
                const urlLink = document.createElement('a');
                urlLink.href = URL.createObjectURL(blob);
                urlLink.download = `${data.name}.csv`;
                urlLink.click();

                cleanInputs(cardContainer);
                popUp5.style.display = "none";
            };

            cancelDownload.onclick = () => {
                popUp5.style.display = "none";
            };
            
        
        };

        delFormat.onclick = () => {
            popUp3.style.display = "flex";

            delFormatBtn.onclick = () => {
                cleanInputs(cardContainer);

                formatContainer.remove();
                formats = formats.filter(format => format.id !== data.id);

                localStorage.setItem('savedFormats', JSON.stringify(formats));
                popUp3.style.display = "none";
            };

            cancelDelBtn.onclick = () => {
                popUp3.style.display = "none";
            };
        }
        
        cloneFormat.onclick = () => {
            popUp4.style.display = "flex";
        };

        confirmNewClone.onclick = () => {
            const newFormName = newName.value.trim();

            const cloneData = JSON.parse(JSON.stringify(data));
            cloneData.id = idGenerator();
            cloneData.name = newFormName;
            
            buildFormat(cloneData, true); 

            newName.value = "";
            popUp4.style.display = "none";
        };

            cancelNewClone.onclick = () => {
                popUp4.style.display = "none";
        };
    });
    
    titleContainer.onclick = () => {
        cardContainer.style.display = cardContainer.style.display === "none" ? "block" : "none";
        formatBtnOrg.style.display = formatBtnOrg.style.display === "none" ? "flex" : "none";
    };

    formatContainer.appendChild(formatBtnOrg);
    formatSection.appendChild(formatContainer);

    if (saved) {
        // TO NOT ADD AGAIN AND AGAIN THE SAME FORMAT
        formats.push(data);
        localStorage.setItem('savedFormats', JSON.stringify(formats)); 
    }
};

function cleanInputs(cardContainer) {
    const inputs = cardContainer.querySelectorAll('input');
    inputs.forEach(input => {
        const code = input.dataset.code; // THE DATASET CODE I MADE BEFORE TO USE IT NOW
        if (code) {
            localStorage.removeItem(code);
            input.value = "";
        };
    });
};

function idGenerator() {
        let lastId = parseInt(localStorage.getItem('lastId') || "0");
        lastId++;
        localStorage.setItem('lastId', lastId);
        let randomNumber = Math.floor(Math.random() * 900 + 100);
        return `id-${lastId}-${randomNumber}`;
    };


//SW

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log("Service Worker registrado"))
        .catch(err => console.error("Error registrando SW:", err));
    });
};   
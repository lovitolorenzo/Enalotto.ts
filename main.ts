function RNG(min: number, max: number) {
    const rng = Math.random();
    return Math.trunc(rng * (max - min) + min);
}


function RNGSequence(len: number, min: number, max: number) {
    if (len >= max - min) {
        throw new Error(`Cannot fin ${len} numbers between ${min} and ${max}`);
    }
    const res: number[] = [];
    while (res.length < len) {
        const rn = RNG(min, max);
        if (res.includes(rn)) {
            continue;
        }
        res.push(rn);
    }
    return res;
}

const ruote: string[] = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "Nazionale"];
const estrazioni: { [ruota: string]: number[] } = {};

for (const ruota of ruote) {
    const estrazione = RNGSequence(5, 1, 100);
    estrazioni[ruota] = estrazione;
}

function createRuotaCnt(ruotaName: string, estrazioni: number[]) {
    const ruotaDiv = document.createElement('div');
    ruotaDiv.className = `ruota ${ruotaName.toLowerCase()}`;
    const nameH2 = document.createElement('h2');
    nameH2.innerText = ruotaName;
    nameH2.className = 'ruota-title';
    ruotaDiv.appendChild(nameH2);

    for (const num of estrazioni) {
        const numP = document.createElement('p');
        numP.innerText = '' + num;
        const numDiv = document.createElement('div');
        numDiv.className = 'ruota-estrazione';
        numDiv.appendChild(numP);
        numP.className = 'ruota-estrazione';
        ruotaDiv.appendChild(numP);
        ruotaDiv.appendChild(numDiv);
    }

    return ruotaDiv;
}

var container = document.getElementById("cnt");

if (container) {
    const pre = document.createElement('pre');

    for (const ruota of ruote) {
        const ruotaEstrazioni = estrazioni[ruota];
        const ruotaDiv = createRuotaCnt(ruota, ruotaEstrazioni);
        container.appendChild(ruotaDiv);
    }
}

console.log(JSON.stringify(estrazioni, null, 2));
console.log(container);
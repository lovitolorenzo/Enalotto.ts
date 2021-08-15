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

console.log(JSON.stringify(estrazioni, null, 2));


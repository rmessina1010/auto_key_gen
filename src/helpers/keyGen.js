function* keyGen(ct = 1) {
    let nxt;
    while (true) {
        nxt = yield ct;
        ct = (isNaN(nxt)) ? ct + 1 : ct + Math.abs((nxt * 1));
    }
}

export default keyGen;

function* keyGen(root, ct = 1) {
    let nxt;
    while (true) {
        nxt = yield ct;
        ct++ //(isNaN(nxt)) ? ct + 1 : ct + (nxt * 1);
    }
}

export default keyGen;

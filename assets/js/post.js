let postMain = document.getElementById("postMain");
let toc = document.getElementById("postToc");

let srcCurrEle = postMain.querySelector("h1");

if (srcCurrEle !== null) {
    let ulEle = document.createElement("ul");
    toc.appendChild(ulEle);
    let liEle = document.createElement("li");
    ulEle.appendChild(liEle);
    liEle.innerText = srcCurrEle.innerText;
    traverse2(1, srcCurrEle, liEle);

}


function traverse2(prevNum, srcPrevEle, destPrevEle) {
    let srcCurrEle = srcPrevEle.nextElementSibling;
    if (srcCurrEle === null) {
        return;
    }
    let tagName = srcCurrEle.tagName;
    if (!(tagName.toLowerCase() === "h1" ||
        tagName.toLowerCase() === "h2" ||
        tagName.toLowerCase() === "h3"
    )) {
        traverse2(prevNum, srcCurrEle, destPrevEle);
        return;
    }

    let destParentEle = destPrevEle.parentElement;


    let currNum = srcCurrEle.tagName.charAt(1);
    let diff = currNum - prevNum;

    let desCurrEle;

    if (diff === 0) {
        desCurrEle = appendEle(destParentEle, srcCurrEle);
    } else if (diff === 1) {//h1->h2
        let ulEle = document.createElement('ul');
        destParentEle.appendChild(ulEle);

        desCurrEle = appendEle(ulEle, srcCurrEle);

    } else if (diff === -1) {//h2->h1
        let destP2Ele = destParentEle.parentElement;

        desCurrEle = appendEle(destP2Ele, srcCurrEle);

    } else if (diff === -2) {//h3->h1
        let destP2Ele = destParentEle.parentElement.parentElement;

        desCurrEle = appendEle(destP2Ele, srcCurrEle);

    }
    traverse2(currNum, srcCurrEle, desCurrEle)


}

function appendEle(destParentEle, srcEle) {
    let liEle = document.createElement('li');
    destParentEle.appendChild(liEle);
    liEle.innerText = srcEle.innerText;
    return liEle;
}



const cursor = document.querySelector(".cursor");

const {
    width: c_width,
    height: c_height
} = cursor.getBoundingClientRect();

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: (rect.left + window.scrollX + (rect.width / 2) + c_width / 2),
        top: (rect.top + window.scrollY + (rect.height / 2) + c_height / 2)
    };
}

function goTo(elName) {
    const el = document.querySelector(elName);
    console.log(el);
    const {
        top,
        left
    } = getOffset(el);

    cursor.style.setProperty("top", `${top}px`);
    cursor.style.setProperty("left", `${left}px`);
    setTimeout(() => {
        cursor.classList.add("click");
        setTimeout(() => {
            cursor.classList.remove("click");
        }, 200);
    }, 3250);
}

function go(...els) {
    const delay = 4000;
    let sleepOffset = 0;
    let sleepCount = 0;
    els.forEach((el, i) => {
        const name = (typeof el == "string") ? el : el.name;
        const [prefix, value] = name.split("-");
        if (prefix == "sleep") {
            sleepOffset += parseInt(value)
            sleepCount++;
        };
        const sleep = (i - sleepCount) * delay + sleepOffset;
        setTimeout(() => {
            console.log("step");
            if (prefix !== "sleep") goTo(name);
            setTimeout(() => {
                if (typeof el !== "string") el.callback(i)
            }, delay - 500);
        }, sleep);
    });
}
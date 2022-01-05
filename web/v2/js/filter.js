const filters = document.querySelectorAll(".filters .tag");
        let active = document.querySelector(".filters .tag ul.active");
        filters.forEach((el) => {
            el.addEventListener("click", (e) => {
                if (active) active.classList.remove("active");
                const ul = el.querySelector("ul");
                ul.classList.toggle("active");
                active = el;
            });
        });
document.addEventListener("DOMContentLoaded", () => {
    const jsonFile = GenerateJSON();

    const allHeroes = JSON.parse(jsonFile);
    for (let hero of allHeroes) {
        document.querySelector("#idGallary").appendChild(Hero.GenerateCard(hero));

    }


    document.querySelectorAll(".collapsed").forEach((elem) => {
        elem.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.querySelector(".card-footer1").classList.toggle("collapse");
        })
    })


})
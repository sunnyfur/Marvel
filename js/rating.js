const initRatings = (ratings) => {

    const setActiveRatingWidth = (value = ratingValue.innerHTML) => {
        const ratingActiveWidth = value / 0.1;
        ratingActive.style.width = `${ratingActiveWidth}%`;

    }
    const initActiveRatingVars = (rating) => {
        ratingActive = rating.querySelector(".rating__active");
        ratingValue = rating.querySelector(".rating__value");

    }
    const setRating = (rating) => {
        //взять первоночальные значения из LocalStorage
        let rate = ratingCollection.filter(e => e.id == rating.dataset.heroId);
        if (rate.length > 0) {
            ratingValue.innerHTML = +rate[0].rate;
        }
        setActiveRatingWidth();

        const ratingItems = rating.querySelectorAll(".rating__item");
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", (e) => {
                initActiveRatingVars(rating);
                setActiveRatingWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", (e) => {

                setActiveRatingWidth();
            });
            ratingItem.addEventListener("click", (e) => {
                initActiveRatingVars(rating);
                // ratingValue.innerHTML = Math.floor((+e.clientX - 303) / 158 * 5 * 10) / 10;

                let rate = ratingCollection.filter(e => e.id == rating.dataset.heroId);
                if (rate.length > 0) {
                    rate[0].rate = +ratingItem.value;
                } else {
                    ratingCollection.push(new HeroLocalRate(rating.dataset.heroId, +ratingItem.value));
                }
                localStorage.setItem("ratingCollection", JSON.stringify(ratingCollection));
                
                ratingValue.innerHTML = +ratingItem.value;
                setActiveRatingWidth();
            });
        }
    }

    const initRating = (rating) => {
        initActiveRatingVars(rating);
        setActiveRatingWidth();

        if (rating.classList.contains("rating_set")) {

            setRating(rating);
        }

    }
    let ratingCollection = [];
    const collection = localStorage.getItem("ratingCollection");
    if (collection) {
        ratingCollection = JSON.parse(localStorage.getItem("ratingCollection"));
    } else {
        localStorage.setItem("ratingCollection", JSON.stringify([]));
    }
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const ratings = document.querySelectorAll(".rating");
    if (ratings.length > 0) {
        initRatings(ratings);
    }
});
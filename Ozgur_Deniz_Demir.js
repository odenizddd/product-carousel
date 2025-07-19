(async () => {

    // ## HOME PAGE GUARD ## start

    const location = window.location.pathname;

    if (location !== "/") {
        console.log("wrong page");
        return;
    }

    // ## DATA ## start

    const productData = await fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json")
    .then(response => response.json())
    .catch(error => {
        console.error("Error fetching product data:", error);
    });

    // ## DATA ## end

    // ## STATE ## start

    const productCount = productData.length;
    let productIndex = 0;
    let reachedEnd = false;

    // ## STATE ## end

    // ## CONSTANTS ## start

    const UNIQUE_POSTFIX = "-qwerty";
    const PRODUCT_CAROUSEL_CLASSNAME = "product-carousel" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_HEADER_CLASSNAME = "product-carousel-header" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_HEADING_CLASSNAME = "product-carousel-heading" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_HEADING_TEXT = "Beğenebileceğinizi düşündüklerimiz";
    const PRODUCT_CAROUSEL_VIEWPORT_CLASSNAME = "product-carousel-viewport" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_CONTENT_CLASSNAME = "product-carousel-content" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_CARD_CLASSNAME = "product-carousel-card" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_IMAGE_CLASSNAME = "product-carousel-image" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_BRAND_CLASSNAME = "product-carousel-brand" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_NAME_CLASSNAME = "product-carousel-name" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_BRAND_AND_NAME_CLASSNAME = "product-carousel-brand-and-name" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_PRODUCT_INFO_CLASSNAME = "product-carousel-product-info" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_PRICE_CLASSNAME = "product-carousel-price" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_BUTTON_CONTAINER_CLASSNAME = "product-carousel-button-container" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_BUTTON_CLASSNAME = "product-carousel-button" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_PREV_BUTTON_CLASSNAME = "product-carousel-prev-button" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_NEXT_BUTTON_CLASSNAME = "product-carousel-next-button" + UNIQUE_POSTFIX;
    const PRODUCT_CAROUSEL_VIEWPORT_WRAPPER_CLASSNAME = "product-carousel-viewport-wrapper" + UNIQUE_POSTFIX;
    // ## CONSTANTS ## end

    // ## STYLES ## start

    function applyStyles() {
        const style = document.createElement("style");

        style.textContent = `

            :root {
                --primary-color-light: rgb(254, 246, 235);
                --primary-color-dark: rgb(242, 142, 0);
            }

            .${PRODUCT_CAROUSEL_CLASSNAME} {
                padding-inline: 15px;
                max-width: 1150px;
            }

            .${PRODUCT_CAROUSEL_HEADER_CLASSNAME} {
                background-color: var(--primary-color-light);
                padding: 25px 67px;
                border-radius: 35px 35px 0px 0px;
            }

            .${PRODUCT_CAROUSEL_HEADING_CLASSNAME} {
                color: var(--primary-color-dark);
            }

            .${PRODUCT_CAROUSEL_HEADING_CLASSNAME} {
                font-family: "Quicksand-Bold";
                font-size: 28.8px;
                font-weight: 700;
                line-height: 32px;
                margin: 0;
            }

            .${PRODUCT_CAROUSEL_VIEWPORT_CLASSNAME} {
                width: 100%;
                overflow-x: hidden;
            }

            .${PRODUCT_CAROUSEL_CONTENT_CLASSNAME} {
                display: flex;
                gap: 20px;
                transition: all 0.3s ease;
            }

            .${PRODUCT_CAROUSEL_IMAGE_CLASSNAME} {
                width: 260.5px;
                height: 203px;
                object-fit: cover;
                margin-bottom: 35px;
            }

            .${PRODUCT_CAROUSEL_CARD_CLASSNAME} {
                border: 1px solid rgb(237, 237, 237);
                margin: 20px 0px 20px 3px;
                padding: 5px;
                border-radius: 10px;
            }

            .${PRODUCT_CAROUSEL_CARD_CLASSNAME}:hover {
                outline: 3px solid var(--primary-color-dark);
            }

            .${PRODUCT_CAROUSEL_PRODUCT_INFO_CLASSNAME} {
                padding: 0px 17px 13px 17px;
            }

            .${PRODUCT_CAROUSEL_BRAND_AND_NAME_CLASSNAME} {
                font-family: Poppins, "cursive";
                font-size: 11.5px;
                line-height: 14px;
                color: rgb(125, 125, 125);
                height: 42px;
                margin-bottom: 50px;
            }

            .${PRODUCT_CAROUSEL_BRAND_CLASSNAME} {
                font-weight: 700;
            }

            .${PRODUCT_CAROUSEL_NAME_CLASSNAME} {
                font-weight: 500;
                
            }

            .${PRODUCT_CAROUSEL_PRICE_CLASSNAME} {
                font-family: Poppins, "cursive";
                font-size: 21px;
                font-weight: 600;
                line-height: 34px;
                color: rgb(125, 125, 125);
            }

            .${PRODUCT_CAROUSEL_BUTTON_CONTAINER_CLASSNAME} {
                padding: 0px 17px 13px 17px;
                margin-top: 70px;
            }

            .${PRODUCT_CAROUSEL_BUTTON_CLASSNAME} {
                width: 100%;
                background-color: var(--primary-color-light);
                color: var(--primary-color-dark);
                border-radius: 24px;
                height: 48px;
                font-family: Poppins, "cursive";
                font-size: 14px;
                font-weight: 700;
                line-height: 18px;
                transition: all 0.3s ease;
            }

            .${PRODUCT_CAROUSEL_BUTTON_CLASSNAME}:hover {
                background-color: var(--primary-color-dark);
                color: white;
            }

            .${PRODUCT_CAROUSEL_PREV_BUTTON_CLASSNAME} {
                position: absolute;
                left: -65px;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background-color: var(--primary-color-light);
                color: var(--primary-color-dark);
                border: none;
                z-index: 10;
            }

            .${PRODUCT_CAROUSEL_PREV_BUTTON_CLASSNAME}:hover {
                background-color: white;
                outline: 1px solid var(--primary-color-dark);
            }

            .${PRODUCT_CAROUSEL_NEXT_BUTTON_CLASSNAME} {
                position: absolute;
                right: -65px;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background-color: var(--primary-color-light);
                color: var(--primary-color-dark);
                border: none;
                z-index: 10;
            }

            .${PRODUCT_CAROUSEL_NEXT_BUTTON_CLASSNAME}:hover {
                background-color: white;
                outline: 1px solid var(--primary-color-dark);
            }

            .${PRODUCT_CAROUSEL_VIEWPORT_WRAPPER_CLASSNAME} {
                position: relative;
            }
        
        `;
        
        document.head.appendChild(style);
    }

    // ## STYLES ## end

    // ## COMPONENTS ## start

    function getProductCarouselHeader() {
        return `
            <div class="${PRODUCT_CAROUSEL_HEADER_CLASSNAME}">
                <h2 class="${PRODUCT_CAROUSEL_HEADING_CLASSNAME}">${PRODUCT_CAROUSEL_HEADING_TEXT}</h2>
            </div>
        `;
    }

    function getPrevButton() {
        return `
            <button class="${PRODUCT_CAROUSEL_PREV_BUTTON_CLASSNAME}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </button>
        `;
    }

    function getNextButton() {
        return `
            <button class="${PRODUCT_CAROUSEL_NEXT_BUTTON_CLASSNAME}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </button>
        `;
    }

    function getProductCarouselCard({
        id, brand, name, url, img, price, original_price
    }) {
        return `
            <a href="${url}" target="_blank">
                <div class="${PRODUCT_CAROUSEL_CARD_CLASSNAME}">
                    <img src="${img}" alt="${name}" class="${PRODUCT_CAROUSEL_IMAGE_CLASSNAME}">
                    <div class="${PRODUCT_CAROUSEL_PRODUCT_INFO_CLASSNAME}">
                        <div class="${PRODUCT_CAROUSEL_BRAND_AND_NAME_CLASSNAME}">
                            <span class="${PRODUCT_CAROUSEL_BRAND_CLASSNAME}">${brand} - </span>
                            <span class="${PRODUCT_CAROUSEL_NAME_CLASSNAME}">${name}</span>
                        </div>
                        <span class="${PRODUCT_CAROUSEL_PRICE_CLASSNAME}">${price} TL</span>
                    </div>
                    <div class="${PRODUCT_CAROUSEL_BUTTON_CONTAINER_CLASSNAME}">
                        <button class="${PRODUCT_CAROUSEL_BUTTON_CLASSNAME}">Sepete Ekle</button>
                    </div>
                </div>
            </a>
        `;
    }

    function getProductCarouselContent() {
        return `
            <div class=${PRODUCT_CAROUSEL_VIEWPORT_WRAPPER_CLASSNAME}>
                ${getPrevButton()}
                <div class=${PRODUCT_CAROUSEL_VIEWPORT_CLASSNAME}>
                    <div class=${PRODUCT_CAROUSEL_CONTENT_CLASSNAME}>
                        ${productData.map(product => getProductCarouselCard(product)).join("")}
                    </div>
                </div>
                ${getNextButton()}
            </div>
        `;
    }

    function getProductCarousel() {
        return `
            <div class=${PRODUCT_CAROUSEL_CLASSNAME}>
                ${getProductCarouselHeader()}
                ${getProductCarouselContent()}
            </div>
        `;
    }

    // ## COMPONENTS ## end

    // ## UTILITY FUNCTIONS ## start

    /**
     * This function removes all existing product carousels
     */
    function removeExistingProductCarousels() {
        const productCarousels = document.querySelectorAll(`.${PRODUCT_CAROUSEL_CLASSNAME}`);

        productCarousels.forEach(carousel => {
            carousel.remove();
        });
    }

    /**
     * This function returns the HTML element after which we are going to inject the new element
     */
    function getAnchorElement() {
        const storiesContainer = document.getElementsByClassName("ins-preview-wrapper");

        if (storiesContainer.length === 0) {
            throw new Error("Stories container not found");
        }

        if (storiesContainer.length > 1) {
            throw new Error("Multiple stories containers found");
        }

        return storiesContainer[0];
    }

    /**
     * This function inserts the new element as the immediate next sibling of the anchor element
     */
    function insertNewElement(anchorElement, newElement) {
        const parentElement = anchorElement.parentElement;

        parentElement.insertBefore(newElement, anchorElement.nextSibling);
    }

    function updateProductCarousel() {
        const productCarouselContent = document.querySelector(`.${PRODUCT_CAROUSEL_CONTENT_CLASSNAME}`);

        const oneItemWidth = 295;
        const viewPortWidth = 1150;
        const totalScrollWidth = productCarouselContent.scrollWidth;

        if (totalScrollWidth - oneItemWidth * productIndex < viewPortWidth) {
            productCarouselContent.style.transform = `translateX(-${totalScrollWidth - viewPortWidth + 30}px)`;
            reachedEnd = true;
        } else {
            productCarouselContent.style.transform = `translateX(-${productIndex * oneItemWidth}px)`;
        }
    }

    function htmlToString(html) {
        return html.outerHTML;
    }

    function htmlFromString(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        const node = template.content.firstChild;
        
        return node;
    }

    const setEventListeners = () => {
        const prevButton = document.querySelector(`.${PRODUCT_CAROUSEL_PREV_BUTTON_CLASSNAME}`);        
        prevButton.addEventListener("click", () => {
            if (productIndex > 0) {
                productIndex--;
                reachedEnd = false;
                updateProductCarousel();
            }
        });

        const nextButton = document.querySelector(`.${PRODUCT_CAROUSEL_NEXT_BUTTON_CLASSNAME}`);
        nextButton.addEventListener("click", () => {
            if (productIndex < productCount - 1 && !reachedEnd) {
                productIndex++;
                updateProductCarousel();
            }
        });
        
    }

    // ## UTILITY FUNCTIONS ## end

    function main() {

        removeExistingProductCarousels();
        
        applyStyles();

        const anchorElement = getAnchorElement();
        const productCarousel = htmlFromString(getProductCarousel());
        insertNewElement(anchorElement, productCarousel);

        setEventListeners();
    }

    main();

})();
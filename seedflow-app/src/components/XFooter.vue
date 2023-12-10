<template>
    <footer>
        <div class="footer">
            <div class="footer__logo">
                <router-link to="/">
                    <span>Seedflow</span>
                    <i class="ri-seedling-fill"></i>
                </router-link>
                <div class="copyright">© 2023 Офіційний  інтернет-магазин</div>
            </div>
            <div class="flex-row footer_text_block">
                <div class="footer__text_block">
                    Телефонуйте обовʼязково підберемо щось для вас!)
                </div>
                <img src="@/assets/images/arrow.svg" alt="Arrow">
                <div class="footer__phones">
                    <a href="tel: 096-564-45-37">096-564-45-37</a>
                    <a href="tel: 068-564-95-01">068-564-95-01</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'XFooter',
};
</script>

<style>
/* Footer Logo */
footer {
    background-color: #D9D9D9;
}
.footer {
    padding: 25px 16px;
    margin: 0 auto;
    max-width: 1360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.footer .footer__logo a {
    text-decoration: none;
    display: flex;
    align-items: flex-end;
}
.footer .footer__logo span {
    color: black;
    font-weight: 400;
    line-height: auto;
    font-size: 24px;
}
.footer .footer__logo i {
    font-size: 35px;
    color: black;
}
/* Footer Logo */
footer .copyright {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    margin-top: 12px;
}
footer .footer__text_block {
    font-weight: 400;
    font-size: 14px;
    max-width: 217px;
}
footer .footer__phones {
    display: flex;
    flex-direction: column;
    margin-left: 28px;
}
footer .footer__phones a {
    text-decoration: none;
    color: black;
    font-size: 22px;
}
@media(max-width: 960px) {
    footer .footer__phones a {
        font-size: 14px;
    }
    footer img {
        display: none;
    }
    footer .footer__text_block {
        font-size: 12px;
    }
    footer .footer__phones {
        margin-left: 0;
        margin-top: 20px;
    }
    .footer_text_block {
        flex-direction: column;
    }
}
@media(max-width: 514px) {
    .footer .footer__logo a {
        justify-content: center;
    }
    .copyright {
        text-align: center;
    }
    .footer {
        flex-direction: column;
    }
    footer .footer__text_block {
        display: none;
    }
}
</style>
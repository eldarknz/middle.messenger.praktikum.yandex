import Handlebars from "handlebars";
import template from "./main.tmpl";
import List from "../../components/ui/List";
import Link from "../../components/ui/Link";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        list: List({
            list: [
                { content: Link({
                        href: "/login",
                        content: "Логин"
                    })
                },
                { content: Link({
                        href: "/register",
                        content: "Регистрация"
                    })
                },
                { content: Link({
                        href: "/chat",
                        content: "Чат"
                    })
                },
                { content: Link({
                        href: "/profile",
                        content: "Профиль"
                    })
                },
                { content: Link({
                        href: "/404",
                        content: "404"
                    })
                },
                { content: Link({
                        href: "/500",
                        content: "500"
                    })
                }
            ]
        })
    });

    return html;
};

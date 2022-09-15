// language=hbs

export default `
    <div class="container">
        <div class="sign-container">
            <h3 class="sign-container__title">{{title}}</h3>
            <form method="post" class="sign-container__form">
                <div class="sign-container__form__input-group">
                    {{> input type="email" placeholder="Почта" name="email" id="email" value="" }}
                    {{> input type="text" placeholder="Логин" name="login" id="login" value="" }}
                    {{> input type="text" placeholder="Имя" name="first_name" id="first_name" value="" }}
                    {{> input type="text" placeholder="Фамилия" name="second_name" id="second_name" value="" }}
                    {{> input type="text" placeholder="Телефон" name="phone" id="phone" value="" }}
                    {{> input type="password" placeholder="Пароль" name="password" id="password" value="" }}
                    {{> input type="password" placeholder="Пароль (еще раз)" name="password_2" id="password_2" value="" }}
                </div>

                {{> button className="btn btn-primary btn-block" }}
            </form>
            <div class="sign-container__text-block">
                <span class="text-gray">Уже есть учетная запись? </span>
                <a href="/login">Войдите в аккаунт</a>
            </div>
        </div>
    </div>
`;
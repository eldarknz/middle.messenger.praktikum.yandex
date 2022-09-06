// language=hbs

export default `
    <div class="wrapper">
        <div class="login-block">
            <h3 class="title">{{title}}</h3>
            <form method="post" class="login-form">
                <div class="input-fields">
                    {{> input type="text" placeholder="Логин" name="fname" id="fname" value="" }}
                    {{> input type="password" placeholder="Пароль" name="fpassword" id="fpassword" value="" }}
                </div>

                {{> button className="btn btn-primary btn-block" }}
            </form>
            <div class="text-block">
                <span class="text-gray">Нет учётной записи? </span>
                <a href="/">Создайте её сейчас</a>
            </div>
        </div>
    </div>
`;
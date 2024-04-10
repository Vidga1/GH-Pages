# Публикация на GH-Pages

<p>
<img alt="Badge" src="https://github.com/Vidga1/GH-Pages/actions/workflows/sanity-check.yml/badge.svg" />
</p>

## Начать пользоваться

```shell
npm install gh-web-deploy --save-dev
```

### Команды для deploy

```
Опции:
-d, --dir <dir> Базовая директория для всех исходных файлов (по умолчанию: "dist")
-s, --src <src> Шаблон, используемый для выбора файлов для публикации (по умолчанию: "**/*")
-b, --branch <branch> Название ветки, в которую вы делаете push (по умолчанию: "gh-pages")
-e, --dest <dest> Целевая директория внутри ветки назначения (относительно корня) (по умолчанию: ".")
-a, --add Добавлять файлы, не удаляя существующие (по умолчанию: false)
-x, --silent Не выводить URL репозитория (по умолчанию: false)
-m, --message <message> Сообщение коммита (по умолчанию: "Updates")
-g, --tag <tag> Добавить тег к коммиту (по умолчанию: "")
-t, --dotfiles Включить точечные файлы (по умолчанию: false)
-r, --repo <repo> URL репозитория, в который вы делаете push
-o, --remote <name> Название удаленного репозитория (по умолчанию: "origin")
-u, --user <address> Имя и email пользователя (по умолчанию берется из git конфига). Формат: "имя email".
-v, --remove <pattern> Удалить файлы, соответствующие шаблону (игнорируется, если используется вместе с --add). (по умолчанию: ".")
-n, --no-push Только коммит (без push)
-f, --no-history Принудительный push нового коммита без истории родителей
-h, --help Показать справку по команде
```

#### Deploy без параметров

Пользователь Git должен быть авторизован, удаленный репозиторий должен быть связан с локальным репозиторием. Проект должен находиться в папке dist.

```properties
npx gh-web-deploy deploy
```

#### Deploy с параметрами

Deploy с параметрами, которые можно изменить в конфигурации.

```properties
npx gh-web-deploy --dir docs --repo https://github.com/Vidga1/GH-Pages.git -m Test-deploy
```

### Команды

#### config

Команда для настройки развертывания с помощью CLI.

```properties
npx gh-web-deploy config
```

#### build

Команда для предварительной сборки с помощью Webpack.

```properties
npx gh-web-deploy build
```

##### Необходимо для корректной работы:

- Webpack & Webpack CLI are installed in project's dependencies;
- webpack.config.(j|t)s file are configured;
- Script "build" exists in package.json;

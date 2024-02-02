#!/usr/bin/env node

export const defaultSettings = {
  dir: 'dist',
  destination: '.',
  addFiles: false,
  gitExecutable: 'git',
  cloneDepth: '1',
  includeDotfiles: false,
  branchName: 'gh-pages',
  remoteName: 'origin',
  sourcePattern: '**/*',
  removePattern: '.',
  enablePush: true,
  preserveHistory: true,
  commitMessage: 'Updates',
  silentMode: false,
  tagName: '',
};

export const userQueries = [
  {
    option: 'dir',
    title: 'Изменить базовый каталог для всех исходных файлов.',
    default: defaultSettings.dir,
    query: 'Введите базовый каталог для всех исходных файлов:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'user',
    title: 'Изменить информацию о пользователе.',
    default: 'user.name & user.email из .gitconfig',
    query: 'Введите информацию о пользователе (формат: "имя email"):',
    pattern: /^[\w-]+\s(.+@.+\..+)$/i,
  },
  {
    option: 'src',
    title:
      'Изменить шаблон мини-ссылок, используемых для выбора файлов для публикации.',
    default: defaultSettings.sourcePattern,
    query:
      'Введите шаблон(ы), используемые для выбора файлов для публикации (формат: "шаблон шаблон шаблон ..."):',
    pattern:
      /^[\w*\/-]+\.[\w*]+$|^([\w*\/-]+\.[\w*]+\s){1,}[\w*\/-]+\.[\w*]+$/i,
  },
  {
    option: 'repo',
    title: 'Изменить URL репозитория.',
    default: 'текущая рабочая директория является git репозиторием',
    query: 'Введите URL репозитория:',
    pattern:
      /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/,
  },
  {
    option: 'branch',
    title: 'Изменить имя ветки, на которую будут отправлены файлы.',
    default: defaultSettings.branchName,
    query: 'Введите имя ветки, на которую будут отправлены файлы:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'dest',
    title: 'Изменить папку назначения в ветке назначения.',
    default: defaultSettings.destination,
    query: 'Укажите папку назначения в ветке назначения:',
    pattern: /^[\w-]+$|^([\w-]+\/){1,}[\w-]+$/i,
  },
  {
    option: 'dotfiles',
    title: 'Включить точечные файлы.',
    default: 'не включены',
    query: 'Включить включение точечных файлов? (y/n)',
    pattern: /^y|n$/,
  },
  {
    option: 'add',
    title:
      'Включить опцию добавления, а не замены существующих файлов в репозитории.',
    default: 'не включено',
    query:
      'Включить опцию добавления, а не замены существующих файлов в репозитории? (y/n)',
    pattern: /^y|n$/,
  },
  {
    option: 'remote',
    title:
      'Изменить имя удаленного репозитория, к которому будет выполнено подключение.',
    default: defaultSettings.remoteName,
    query:
      'Введите имя удаленного управления, к которому будет выполнено подключение:',
    pattern: /^[\w-]+$/i,
  },
  {
    option: 'tag',
    title: 'Создать тег после коммита изменений в целевую ветку.',
    default: ' ',
    query: 'Создать тег после коммита изменений в целевую ветку:',
    pattern: /.*/,
  },
  {
    option: 'message',
    title: 'Создать сообщение коммита для всех коммитов.',
    default: defaultSettings.commitMessage,
    query: 'Создайте сообщение коммита для всех коммитов:',
    pattern: /.*/,
  },
  {
    option: 'remove',
    title:
      'Указать шаблон, по которому будут удалены файлы в итоговом репозитории (игнорируется при использовании вместе с --add).',
    default: defaultSettings.removePattern,
    query:
      'Укажите шаблон, по которому будут удалены файлы в итоговом репозитории (игнорируется при использовании вместе с --add):',
    pattern: /^[\w*-]+\.[\w*]+$/i,
  },
  {
    option: 'push',
    title: 'Изменить опцию отправки в репозиторий.',
    default: 'включено',
    query: 'Отправить в хранилище? (y/n)',
    pattern: /^y|n$/,
  },
];

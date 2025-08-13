#!/bin/sh

# Функция для вывода справки
show_help() {
  echo "Использование: $0 [ОПЦИИ] имя_архива.tar.gz файл1 [файл2 ...]"
  echo
  echo "Опции:"
  echo "  -h, --help    Показать эту справку и выйти."
  echo
  echo "Пример:"
  echo "  $0 my_archive.tar.gz /path/to/file /path/to/directory"
}

# Проверка наличия аргументов
if [ $# -eq 0 ]; then
  show_help
  exit 1
fi

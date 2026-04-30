#!/usr/bin/env bash
set -euo pipefail

# Скрипт сборки Docker-образа с автоматической подстановкой IP MySQL
# Все переменные для --build-arg читаются из файла .env

# ------------------------------------------------------------
# Конфигурация
# ------------------------------------------------------------
ENV_FILE=".env"
IMAGE_NAME="watcharc-app:latest"
MYSQL_CONTAINER="mysql-server"        # имя контейнера, из которого берём IP
BUILD_CONTEXT="."

# Список переменных, которые будут переданы в --build-arg
REQUIRED_VARS=(
    DB_HOST
    DB_PORT
    DB_NAME
    DB_USER
    DB_PASSWORD
    S3_ACCESS_KEY
    S3_SECRET_KEY
    S3_ENDPOINT
    S3_REGION
    S3_BUCKET
    IMGPROXY_KEY
    IMGPROXY_SALT
    NEXT_PUBLIC_IMAGES_HOST
    NEXT_PUBLIC_DEFAULT_MODEL_COVER
)

# ------------------------------------------------------------
# 1. Проверка наличия .env
# ------------------------------------------------------------
if [ ! -f "$ENV_FILE" ]; then
    echo "ОШИБКА: файл '$ENV_FILE' не найден." >&2
    echo "Создайте .env с необходимыми переменными." >&2
    exit 1
fi

# ------------------------------------------------------------
# 2. Загрузка переменных из .env
# ------------------------------------------------------------
set -a
# shellcheck source=/dev/null
source "$ENV_FILE"
set +a

# ------------------------------------------------------------
# 3. Проверка, что все обязательные переменные заданы
# ------------------------------------------------------------
missing=()
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var:-}" ]; then
        missing+=("$var")
    fi
done

if [ ${#missing[@]} -gt 0 ]; then
    echo "ОШИБКА: следующие переменные не заданы в '$ENV_FILE':" >&2
    printf ' - %s\n' "${missing[@]}" >&2
    exit 1
fi

# ------------------------------------------------------------
# 4. Автоподстановка IP контейнера mysql-server
# ------------------------------------------------------------
# Если DB_HOST равен имени контейнера или пуст – заменяем на реальный IP
if [ "${DB_HOST,,}" = "mysql-server" ] || [ -z "${DB_HOST:-}" ]; then
    echo "Определяю IP-адрес контейнера '$MYSQL_CONTAINER'..."
    MYSQL_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$MYSQL_CONTAINER" 2>/dev/null || true)
    if [ -z "$MYSQL_IP" ]; then
        echo "ОШИБКА: контейнер '$MYSQL_CONTAINER' не запущен или не имеет IP." >&2
        echo "Запустите контейнер MySQL или укажите IP в DB_HOST в .env явно." >&2
        exit 1
    fi
    echo "Найден IP: $MYSQL_IP"
    DB_HOST="$MYSQL_IP"
fi

# ------------------------------------------------------------
# 5. Формирование аргументов --build-arg
# ------------------------------------------------------------
BUILD_ARGS=()
for var in "${REQUIRED_VARS[@]}"; do
    BUILD_ARGS+=(--build-arg "${var}=${!var}")
done

# ------------------------------------------------------------
# 6. Информация о запуске
# ------------------------------------------------------------
echo ""
echo "Запуск сборки образа '$IMAGE_NAME'..."
echo "Параметры сборки:"
for arg in "${BUILD_ARGS[@]}"; do
    # Скрываем секреты в выводе
    if [[ "$arg" =~ (PASSWORD|SECRET|KEY|TOKEN|SALT) ]]; then
        echo "  ${arg%%=*}=***"
    else
        echo "  $arg"
    fi
done
echo ""

# ------------------------------------------------------------
# 7. Сборка образа
# ------------------------------------------------------------
docker buildx build --load \
    -t "$IMAGE_NAME" \
    "${BUILD_ARGS[@]}" \
    "$BUILD_CONTEXT"

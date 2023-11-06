SF_DIRS =
SF_DIRS += var
SF_DIRS += var/log var/cache var/sessions var/cache/test var/log/phpunit

LOCAL_DIRS = $(SF_DIRS)

DOCKER_COMPOSE_DEPS = $(LOCAL_DIRS)
DOCKER_COMPOSE_BIN = docker compose
DOCKER_COMPOSE_OPTIONS =
DOCKER_COMPOSE_CMD = $(DOCKER_COMPOSE_BIN) $(DOCKER_COMPOSE_OPTIONS)

DOCKER_COMPOSE_EXEC_APP_OPTIONS =
DOCKER_COMPOSE_EXEC_APP_CMD = $(DOCKER_COMPOSE_CMD) exec $(DOCKER_COMPOSE_EXEC_APP_OPTIONS) php

DOCKER_COMPOSE_RUN_APP_OPTIONS =
DOCKER_COMPOSE_RUN_APP_CMD = $(DOCKER_COMPOSE_CMD) run --rm --no-deps $(DOCKER_COMPOSE_RUN_APP_OPTIONS) php

DOCKER_COMPOSE_EXEC_OR_RUN_APP_OPTIONS =
ifeq ($(shell $(DOCKER_COMPOSE_CMD) ps -q --status running php 2>/dev/null),)
DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD = $(DOCKER_COMPOSE_CMD) run --rm --no-deps $(DOCKER_COMPOSE_RUN_APP_OPTIONS) $(DOCKER_COMPOSE_EXEC_OR_RUN_APP_OPTIONS) php
else
DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD = $(DOCKER_COMPOSE_CMD) exec $(DOCKER_COMPOSE_EXEC_APP_OPTIONS) $(DOCKER_COMPOSE_EXEC_OR_RUN_APP_OPTIONS) php
endif

SF_BIN = $(DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD) symfony

SF_SERVER_PORT = 8888
SF_SERVER_OPTIONS = -d
SF_SERVER_START_CMD =
SF_SERVER_STOP_CMD =

SF_CONSOLE_DEPS = $(DOCKER_COMPOSE_DEPS) $(COMPOSER_AUTOLOAD_FILE)
SF_CONSOLE_BIN = $(DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD) bin/console
SF_CONSOLE_OPTIONS =
SF_CONSOLE_CMD = $(SF_CONSOLE_BIN) $(SF_CONSOLE_OPTIONS)

COMPOSER_DEPS = $(DOCKER_COMPOSE_DEPS)
COMPOSER_BIN = $(DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD) composer
COMPOSER_OPTIONS =
COMPOSER_CMD = $(COMPOSER_BIN) $(COMPOSER_OPTIONS)

SENTINEL_NO_DOCKER = .no-docker
COMPOSER_AUTOLOAD_FILE = vendor/autoload.php

DOCKER_MANAGED_IMAGES =


###############################################################################
## logs
###############################################################################

LOG_START = $(COLOR_LOG)-------------------- [$@]
LOG_END = --------------------$(COLOR_RESET)\n

###############################################################################
## colors
###############################################################################

PRINT_COLOR = printf
COLOR_SUCCESS = \033[1;32m
COLOR_DEBUG = \033[36m
COLOR_HINT = \033[33m
COLOR_WARNING = \033[31m
COLOR_RESET = \033[0m
COLOR_LOG = \033[1;93m

########################################################################################################################
## alternatives without docker
########################################################################################################################

ifneq ($(wildcard $(SENTINEL_NO_DOCKER)),)

SF_CONSOLE_BIN = bin/console
COMPOSER_BIN = composer
SF_BIN = symfony
SF_SERVER_START_CMD = $(SF_BIN) server:start --port=$(SF_SERVER_PORT) $(SF_SERVER_OPTIONS)
SF_SERVER_STOP_CMD = $(SF_BIN) server:stop || :

DOCKER_MANAGED_IMAGES = database mailer

endif

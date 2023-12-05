SHELL = sh
.SHELLFLAGS := -eu -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:
.PRECIOUS:
.DEFAULT_GOAL := help

include Makefile.defaults.mk
-include Makefile.local.mk
ifndef env
env=dev
endif

########################################################################################################################
##@ Docker/Env
########################################################################################################################

.PHONY: start
start: | $(DOCKER_COMPOSE_DEPS) ## Start development env
	@$(PRINT_COLOR) "$(LOG_START) Start required services $(LOG_END)"
	$(DOCKER_COMPOSE_CMD) up -d --remove-orphans $(DOCKER_MANAGED_IMAGES)
	$(SF_SERVER_START_CMD)
.PHONY: stop
stop: | $(DOCKER_COMPOSE_DEPS) ## Stop development env
	@$(PRINT_COLOR) "$(LOG_START) Stop services $(LOG_END)"
	$(DOCKER_COMPOSE_CMD) down
	$(SF_SERVER_STOP_CMD)

.PHONY: build
build: | $(DOCKER_COMPOSE_DEPS) ## Build docker image
	$(DOCKER_COMPOSE_CMD) build --no-cache

.PHONY: log
log: | $(DOCKER_COMPOSE_DEPS) ## Show docker container logs
	$(DOCKER_COMPOSE_CMD) logs -f --tail 100 $(service)

.PHONY: sh
sh: | $(DOCKER_COMPOSE_DEPS) ## Open bash in app container
	$(DOCKER_COMPOSE_EXEC_OR_RUN_APP_CMD) sh

.PHONY: start-with-logs
start-with-logs: start logs ## Start project with logs

.PHONY: restart
restart: stop start ## Restart project

.PHONY: install
install: ## init development environment
	@$(PRINT_COLOR) "$(LOG_START) Initialize project $(LOG_END)"
	make build composer generate-keys run bddSet migrate

########################################################################################################################
##@ Dependancies
########################################################################################################################

.PHONY: composer
composer: $(COMPOSER_AUTOLOAD_FILE) ## Install composer dependancies

$(COMPOSER_AUTOLOAD_FILE): composer.json composer.lock | $(COMPOSER_DEPS)
	@$(PRINT_COLOR) "$(LOG_START) Install PHP Dependencies $(LOG_END)"
	$(COMPOSER_CMD) install -o $(COMPOSER_OPTIONS)
	touch "$@"

.PHONY: generate-keys
generate-keys: ## Generate JWT Secrets
	$(SF_CONSOLE_CMD) lexik:jwt:generate-keypair --overwrite --no-interaction

########################################################################################################################
##@ Database
########################################################################################################################

.PHONY: bddClean
bddClean: | $(SF_CONSOLE_DEPS) ## Drop database
	@$(PRINT_COLOR) "$(LOG_START) Drop database $(LOG_END)"
	$(DOCKER_COMPOSE_CMD) down database --volumes
	$(DOCKER_COMPOSE_CMD) up -d database
	sleep 2 # Wait to container to be up

.PHONY: bddSet
bddSet: | $(SF_CONSOLE_DEPS) ## Create database
	@$(PRINT_COLOR) "$(LOG_START) Initialize database $(LOG_END)"
	$(SF_CONSOLE_CMD) doctrine:database:create --if-not-exists --env=$(env)

.PHONY: migrate
migrate: | $(SF_CONSOLE_DEPS) ## Play all symfony migration
	@$(PRINT_COLOR) "$(LOG_START) Execute Symfony migrations $(LOG_END)"
	$(SF_CONSOLE_CMD) doctrine:migrations:migrate -n --env=$(env)

.PHONY: bddReset
bddReset: ## Purge all data, recreate tables and execute migrations
	@$(PRINT_COLOR) "$(LOG_START) Reset DB $(LOG_END)"
	make bddClean bddSet migrate

.PHONY: migration.diff
migration.diff: | $(SF_CONSOLE_DEPS) ## Show diff between database and migrations
	@$(PRINT_COLOR) "$(LOG_START) Show diff between migrations and database $(LOG_END)"
	$(SF_CONSOLE_CMD) doctrine:migrations:diff --env=$(env)

.PHONY: migration
migration: | $(SF_CONSOLE_DEPS)  ## Create new migration
	@$(PRINT_COLOR) "$(LOG_START) Creation migration $(LOG_END)"
	$(SF_CONSOLE_CMD) make:migration -n --env=$(env)

.PHONY: fixtures
fixtures: | $(SF_CONSOLE_DEPS) ## Load Alice fixtures and post process some data
	@$(PRINT_COLOR) "$(LOG_START) Add fixtures $(LOG_END)"
	$(SF_CONSOLE_CMD) hautelook:fixture:load --no-interaction --env=$(env)

########################################################################################################################
##@ Local env
########################################################################################################################

.PHONY: docker-disable
docker-disable: ## Disable docker (php local env & git hooks without docker run)
	@$(PRINT_COLOR) "$(LOG_START) Docker disabled for MQ code $(LOG_END)"
	touch $(SENTINEL_NO_DOCKER)

.PHONY: docker-enable
docker-enable: ## Enable docker (php container & git hooks with docker run)
	@$(PRINT_COLOR) "$(LOG_START) Docker enabled for MQ code $(LOG_END)"
	rm -f $(SENTINEL_NO_DOCKER)


########################################################################################################################
##@ Utils
########################################################################################################################

.PHONY: cache
cache: | $(SF_CONSOLE_DEPS) ## Clear cache (Symfony method)
	@$(PRINT_COLOR) "$(LOG_START) Clear cache $(LOG_END)"
	$(SF_CONSOLE_CMD) cache:clear -n --env=$(env)

.PHONY: cc
cc: ## Clear cache (force method)
	@$(PRINT_COLOR) "$(LOG_START) Force destroy cache $(LOG_END)"
	rm -rf var/cache

clear-log clear-logs cl: ## Clear cache (truncate method)
	@$(PRINT_COLOR) "$(COLOR_HINT)[I][$@] Truncate logs$(COLOR_RESET)\n"
	truncate --size=0 var/log/*.log

########################################################################################################################
##@ Chore
########################################################################################################################

$(LOCAL_DIRS):
	mkdir -p "$@"

.PHONY: LOCAL_DIRS
LOCAL_DIRS: $(LOCAL_DIRS);

########################################################################################################################
##@ Utils
########################################################################################################################

.PHONY: help
help: ## Prints this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

# Check that given variables are set and all have non-empty values,
# die with an error otherwise.
#
# Params:
#   1. Variable name(s) to test.
#   2. (optional) Error message to print.
check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))

__check_defined = \
    $(if $(value $1),, \
        $(error Undefined $1$(if $2, ($2))$(if $(value @), required by target [$@])))

check_binary = \
    $(if $(shell type $1 2>/dev/null),, \
        $(error please install $1 binary$(if $(value @), (required by target [$@]))))


## Shortcuts

.PHONY: run
run: start
.PHONY: quit exit
quit exit: stop
.PHONY: logs
logs: log
.PHONY: bash shell
bash shell: sh
.PHONY: run-with-logs
run-with-logs: start-with-logs
.PHONY: all
all: install
.PHONY: migr
migr: migrate
.PHONY: migr.diff
migr.diff: migration.diff
.PHONY: migrations
migrations: migration
.PHONY: fixture data hautelook
fixture data hautelook: fixtures

#!/bin/sh
set -e

mkdir -p $HOME/.ssh

if [ -f /var/tmp/id ]; then
    echo " >> Copying host ssh key from /var/tmp/id to $HOME/.ssh/id_rsa"
    cp /var/tmp/id $HOME/.ssh/id_rsa
    chmod 0600 $HOME/.ssh/id_rsa
fi

if [ -f /var/tmp/sshconf ]; then
    echo " >> Copying host ssh config from /var/tmp/sshconf to $HOME/.ssh/config"
    cp /var/tmp/sshconf $HOME/.ssh/config
    chmod 0600 $HOME/.ssh/config
fi

if [ -f /var/tmp/ssh_hosts ]; then
    echo " >> Copying host ssh known_hosts from /var/tmp/ssh_hosts to $HOME/.ssh/known_hosts"
    cp /var/tmp/ssh_hosts $HOME/.ssh/known_hosts
    chmod 0600 $HOME/.ssh/known_hosts
fi

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
    set -- php "$@"
fi

FORCED_USER_ID=${LOCAL_USER_ID:-9001}

echo "Starting with UID: $FORCED_USER_ID"

useradd --shell /bin/bash --no-create-home --home $HOME -u $FORCED_USER_ID -o -c "" novaway

chown -R $FORCED_USER_ID $HOME

exec gosu novaway "$@"

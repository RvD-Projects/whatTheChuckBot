## Guide:
> https://discordjs.guide/#before-you-begin
## DevPortal:
> https://discord.com/developers/docs/intro
## DiscordJS:
> https://discord.js.org/#/docs/main/stable/class/Client
## DocekrDocs:
>https://docs.docker.com/get-started/02_our_app/
#

## Docker-notes:

### Accès au volumes sur la machine hôte:
> Sous Windows-10 avec conteneur wsl:
  > - "There are two ways to access your Linux files. First, the easy one. From within the Windows Subsystem for Linux environment you want to browse, run the following command:"
  >`explorer.exe .` ou `\\wsl$` dans la barre de recherche explotrateur.

> Sous Linux avec conteneur natif:
  > - Les volumes sont sous: `/var/lib/docker/volumes`

### Travailler avec les conteneurs:
- Accès log: `docker logs [--follow] [OPTIONS] CONTAINER`
- Accès SSH: `docker exec -it <container name> /bin/bash`
- Redémmarer tout les conteneur: `docker restart $(docker ps -q)` || `docker start $(docker ps -a -q -f status=exited)`
- Stopper tout les conteneurs: `docker kill $(docker ps -q)`
- Stop/Start un conteneur: `docker stop/start [opt] conteneurID`
- Retirer un ou des conteneur: `docker rm $(docker ps -a -q)`
- Retirer une ou des images: `docker rmi $(docker images -q)`

**PS:** Pour la mise en ligne il est plus simple de simplment composer/build/run le conteneur en y déposant vos fichiers docker et d'application déjà sous la version de production. Il ne restera donc qu'à importer votre base de données. Si ce n'est pas déjà automatisé.
#

## Wireshark

> US resident Disccord status.discord and gateway.discord wireshark filter like: 
> - (((ip.host matches "162\.159\.12*\.2*") or (ip.host matches "162\.159\.13*\.2*") or (tcp.port == 27017)) and !(ip.host == 162.159.136.234))
#


docker run -d --expose 80 --expose 443 --name schoolhub_conainer_staff  -e "VIRTUAL_HOST=console.schoolhubb.com,www.console.schoolhubb.com" -e "LETSENCRYPT_HOST=console.schoolhubb.com,www.console.schoolhubb.com" -e "LETSENCRYPT_EMAIL=console@schoolhubb.com" cyberadvance/schoolhub-web


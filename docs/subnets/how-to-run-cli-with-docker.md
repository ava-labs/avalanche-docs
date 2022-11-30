# How to run Avalanche-CLI with Docker

To run Avalanche-CLI in a docker container, you need to enable ipv6.

Edit `/etc/docker/daemon.json`. Add this snippet then restart the docker service.

```json
{
  "ipv6": true,
  "fixed-cidr-v6": "fd00::/80"
}
```

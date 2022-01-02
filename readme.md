### Guide: https://discordjs.guide/#before-you-begin
### DevPortal: https://discord.com/developers/docs/intro
### DiscordJS: https://discord.js.org/#/docs/main/stable/class/Client
### YT-Tutorial: https://www.youtube.com/watch?v=4IxLBKPVyXE



- ## US resident Disccord status.discord and gateway.discord wireshark filter like :(((ip.host matches "162\.159\.12*\.2*") or (ip.host matches "162\.159\.13*\.2*") or (tcp.port == 27017)) and !(ip.host == 162.159.136.234))
- 27017 is you DB used port here mongoDB


## List mondo connections:
- db.currentOp(true).inprog.reduce((accumulator, connection) => { ipaddress = connection.client ? connection.client.split(":")[0] : "Internal"; accumulator[ipaddress] = (accumulator[ipaddress] || 0) + 1; accumulator["TOTAL_CONNECTION_COUNT"]++; return accumulator; }, { TOTAL_CONNECTION_COUNT: 0 });
- db.currentOp(true).inprog.forEach(function(x) { print(x.client) });
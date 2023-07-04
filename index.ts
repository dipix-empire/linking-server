import bedrock, { Player } from "bedrock-protocol"
import axios from "axios"
const server = bedrock.createServer({
	host: '0.0.0.0',
	port: 19132,
	version: '1.19.50',
	motd: {
		motd: 'DiPix linking server',
		levelName: 'Get code and use /link in Discord'
	}
})

server.on('connect', (client: Player) => {
	client.on('join', () => {
		const XUID = client.profile?.xuid
		if (!XUID) {
			client.disconnect(`Get XUID failed. Try again or report to admins.`)
			console.log(`Can't get player XUID`)
			return
		}
		const code = 0
		axios.get(`http://localhost:5000/external/xuid?code=${code}&xuid=${XUID}`).then((res) => {
			if (res.status == 200)
				return client.disconnect(`Code: ${code}. Use it in Discord with /link command.`)
			else return client.disconnect(`XUID routing failed. Try again or report to admins.`)
		}).catch(() => {
			client.disconnect(`XUID routing failed. Try again or report to admins.`)
		})
	})
})

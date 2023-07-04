import bedrock, { Player } from "bedrock-protocol"
import axios from "axios"
import conf from "./main.conf"

const server = bedrock.createServer({
	host: conf.bedrock.ip,
	port: conf.bedrock.port,
	version: conf.bedrock.version,
	motd: {
		motd: conf.strings.motd,
		levelName: conf.strings.levelname
	}
})

server.on('connect', (client: Player) => {
	client.on('join', () => {
		const XUID = client.profile?.xuid
		if (!XUID) {
			client.disconnect(conf.strings.getFailed)
			console.log(`Can't get player XUID`)
			return
		}
		const code = '0'
		axios.get(conf.url(code, XUID)).then((res) => {
			if (res.status == 200)
				return client.disconnect(conf.strings.success(code))
			else return client.disconnect(conf.strings.routeFailed + conf.strings.report)
		}).catch(() => {
			client.disconnect(conf.strings.routeFailed + conf.strings.report)
		})
	})
})

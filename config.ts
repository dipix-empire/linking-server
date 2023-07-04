import { Version } from "bedrock-protocol"

export default interface Config {
	bedrock: {
		ip: string,
		port: number,
		version: Version
	},
	strings: {
		levelname: string,
		motd: string,
		success: (code: string) => string,
		report: string,
		getFailed: string,
		routeFailed: string
	},
	url: (code: string, xuid: string) => string
}

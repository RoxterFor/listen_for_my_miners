import { 
  BlockEvent, 
  Finding, 
  HandleBlock, 
  FindingSeverity, 
  FindingType,
} from 'forta-agent'

interface IMiners {
  [key:string]:string
}
const miners:IMiners = require("./my_miners.json")

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const findings: Finding[] = [];
  if (miners[blockEvent.block.miner]){
    findings.push(
      Finding.fromObject({
        name: "MY_MINER_VALIDATED_BLOCK",
        description: `Miner from my miner lost validated block`,
        alertId: "MY_MINER_VALIDATED_BLOCK",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata:{
          minerId: blockEvent.block.miner,
          size: `${blockEvent.block.size}`,
          blockNum: `${blockEvent.block.number}`,
          minerName:miners[blockEvent.block.miner]
        }
  
      })
      )

  }
  

  
  
  return findings;
}

export default {
  handleBlock
}
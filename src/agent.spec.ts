import {
    createBlockEvent,
    HandleBlock
  } from "forta-agent"
  import agent from "./agent"
  
  describe("my block agent", () => {
    let handleBlock: HandleBlock
  
    const createBlock= (miner: string) => createBlockEvent({
      type:0,
      block:{
          difficulty: "",
          gasLimit :"",
          extraData:{} as any,
          gasUsed:"",
          hash:"",
          miner:miner,
          logsBloom:"",
          mixHash:"",
          nonce:"",
          number:12345,
          parentHash:"",
          receiptsRoot:"",
          sha3Uncles:"",
          size:"123",
          stateRoot:"",
          timestamp: Date.now(),
          totalDifficulty:"",
          transactions: {} as any,
          transactionsRoot:'',
          uncles:[]
      }
    })
  
    beforeAll(() => {
      handleBlock = agent.handleBlock
    })
  
    describe("agent", () => {
      it("Not my Block", async () => {
        const txEvent = createBlock("123")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings.length).toEqual(0)
      })
  
      it("MyBlock", async () => {
        const txEvent = createBlock("0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings.length).toEqual(1)
      })
    })
  })